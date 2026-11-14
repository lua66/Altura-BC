import { useEffect, useState, type FormEvent } from 'react';
import {
  ExternalLink,
  Eye,
  EyeOff,
  FileSpreadsheet,
  KeyRound,
  Link2,
  Lock,
  LogOut,
  RefreshCw,
  X,
} from 'lucide-react';
import type { User } from 'firebase/auth';
import {
  SPREADSHEET_TITLE,
  TAB_BOLETIN,
  TAB_REGISTROS,
  type BoletinRow,
  type ConnectedSheetInfo,
  type RegistroRow,
} from '../services/googleSheets';
import { updateAdminPasscode, verifyAdminPasscode } from '../utils/passcode';
import { GoogleSignInButton } from './GoogleSignInButton';
import { ConfirmActionModal } from './ConfirmActionModal';

interface SheetsManagerModalProps {
  open: boolean;
  onClose: () => void;
  isUnlocked: boolean;
  onUnlock: () => void;
  onLock: () => void;
  user: User | null;
  needsAuth: boolean;
  isLoggingIn: boolean;
  sheetInfo: ConnectedSheetInfo | null;
  pendingRegistros: RegistroRow[];
  pendingBoletin: BoletinRow[];
  previewRegistros: string[][];
  previewBoletin: string[][];
  isBusy: boolean;
  statusMsg: string | null;
  errorMsg: string | null;
  onLogin: () => void;
  onLogout: () => void;
  onCreateSheetConfirmed: () => Promise<void>;
  onRefreshSheet: () => Promise<void>;
  onSyncPendingConfirmed: () => Promise<void>;
  onLinkSheet: (urlOrId: string) => Promise<void>;
  onUnlinkSheet: () => void;
}

export function SheetsManagerModal({
  open,
  onClose,
  isUnlocked,
  onUnlock,
  onLock,
  user,
  needsAuth,
  isLoggingIn,
  sheetInfo,
  pendingRegistros,
  pendingBoletin,
  previewRegistros,
  previewBoletin,
  isBusy,
  statusMsg,
  errorMsg,
  onLogin,
  onLogout,
  onCreateSheetConfirmed,
  onRefreshSheet,
  onSyncPendingConfirmed,
  onLinkSheet,
  onUnlinkSheet,
}: SheetsManagerModalProps) {
  const [activeTab, setActiveTab] = useState<'registros' | 'boletin'>(
    'registros'
  );
  const [confirmType, setConfirmType] = useState<'create' | 'sync' | null>(null);
  const [sheetUrlInput, setSheetUrlInput] = useState('');

  // Password gate state
  const [passInput, setPassInput] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [passError, setPassError] = useState<string | null>(null);
  const [checkingPass, setCheckingPass] = useState(false);

  // Change password panel state
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [changePassFeedback, setChangePassFeedback] = useState<{
    type: 'ok' | 'err';
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!open) return;
    if (pendingRegistros.length > 0 || previewRegistros.length > 1) {
      setActiveTab('registros');
    } else if (pendingBoletin.length > 0 || previewBoletin.length > 1) {
      setActiveTab('boletin');
    }
  }, [
    open,
    pendingRegistros.length,
    pendingBoletin.length,
    previewRegistros.length,
    previewBoletin.length,
  ]);

  if (!open) return null;

  const totalPending = pendingRegistros.length + pendingBoletin.length;
  const activeRows =
    activeTab === 'registros' ? previewRegistros : previewBoletin;

  const handleConfirm = async () => {
    const mode = confirmType;
    setConfirmType(null);
    if (mode === 'create') {
      await onCreateSheetConfirmed();
    } else if (mode === 'sync') {
      await onSyncPendingConfirmed();
    }
  };

  const handleLinkSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sheetUrlInput.trim()) return;
    await onLinkSheet(sheetUrlInput);
    setSheetUrlInput('');
  };

  const handleUnlockSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPassError(null);
    if (!passInput.trim()) {
      setPassError('Ingresa la contraseña de acceso.');
      return;
    }
    setCheckingPass(true);
    try {
      const ok = await verifyAdminPasscode(passInput);
      if (ok) {
        setPassInput('');
        setShowPass(false);
        onUnlock();
      } else {
        setPassError('Contraseña incorrecta. Intenta de nuevo.');
      }
    } catch {
      setPassError(
        'No se pudo validar la contraseña en este momento. Intenta de nuevo.'
      );
    } finally {
      setCheckingPass(false);
    }
  };

  const handleChangePassSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChangePassFeedback(null);
    try {
      const res = await updateAdminPasscode(currentPass, newPass);
      if (res.ok) {
        setCurrentPass('');
        setNewPass('');
        setChangePassFeedback({
          type: 'ok',
          text: 'Contraseña actualizada correctamente.',
        });
      } else {
        setChangePassFeedback({
          type: 'err',
          text: res.error ?? 'No se pudo actualizar la contraseña.',
        });
      }
    } catch {
      setChangePassFeedback({
        type: 'err',
        text: 'Error al guardar la nueva contraseña.',
      });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sheets-manager-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-sm border border-white/15 bg-[#121215] p-6 text-[#F4F1EA] sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-[#FF1E6E] uppercase">
              Propiedades de la web en Google
            </p>
            <h2
              id="sheets-manager-title"
              className="mt-1 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl"
            >
              {isUnlocked
                ? `Hoja «${SPREADSHEET_TITLE}»`
                : 'Acceso restringido'}
            </h2>
            <p className="mt-1 text-sm text-[#A1A1AA]">
              {isUnlocked
                ? 'Administra tu conexión de Google, la hoja de cálculo de suscripciones y los registros pendientes.'
                : 'Ingresa la contraseña del club para entrar a la configuración de Google Sheets y Google Drive.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar propiedades de Google"
            className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-white/15 text-[#A1A1AA] transition-colors hover:border-white/30 hover:text-[#F4F1EA]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!isUnlocked ? (
          <form onSubmit={handleUnlockSubmit} className="mt-6 max-w-md space-y-4">
            <div>
              <label
                htmlFor="admin-passcode-input"
                className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#D4D4D8]"
              >
                <Lock className="h-3.5 w-3.5 text-[#FF1E6E]" aria-hidden="true" />
                <span>Contraseña de acceso</span>
              </label>
              <div className="relative mt-2">
                <input
                  id="admin-passcode-input"
                  type={showPass ? 'text' : 'password'}
                  autoFocus
                  value={passInput}
                  onChange={(e) => {
                    setPassInput(e.target.value);
                    if (passError) setPassError(null);
                  }}
                  placeholder="Ingresa tu contraseña"
                  className="w-full rounded-sm border border-white/15 bg-[#18181B] py-3 pr-11 pl-4 text-base text-[#F4F1EA] placeholder:text-[#71717A] focus:border-[#FF1E6E] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((prev) => !prev)}
                  aria-label={
                    showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'
                  }
                  className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center text-[#A1A1AA] hover:text-[#F4F1EA]"
                >
                  {showPass ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {passError && (
              <p role="alert" className="text-xs text-[#FDA4AF]">
                {passError}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={checkingPass}
                className="cursor-pointer rounded-sm bg-[#FF1E6E] px-5 py-2.5 text-sm font-bold text-[#0D0D0F] transition-colors hover:bg-[#ff3b81] disabled:opacity-60"
              >
                {checkingPass ? 'Verificando...' : 'Entrar a propiedades'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-sm border border-white/15 px-4 py-2.5 text-sm font-semibold text-[#D4D4D8] hover:border-white/30"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <>
            {/* Top security bar */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowChangePassword((prev) => !prev);
                  setChangePassFeedback(null);
                }}
                className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#A1A1AA] underline underline-offset-4 hover:text-[#F4F1EA]"
              >
                <KeyRound className="h-3.5 w-3.5" aria-hidden="true" />
                <span>
                  {showChangePassword
                    ? 'Ocultar cambio de contraseña'
                    : 'Cambiar contraseña de acceso'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onLock();
                  setShowChangePassword(false);
                }}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-sm border border-white/15 px-3 py-1.5 text-xs font-semibold text-[#D4D4D8] hover:border-[#FF1E6E] hover:text-[#F4F1EA]"
              >
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Bloquear panel</span>
              </button>
            </div>

            {showChangePassword && (
              <form
                onSubmit={handleChangePassSubmit}
                className="mt-4 rounded-sm border border-white/10 bg-[#18181D] p-5"
              >
                <p className="text-xs font-bold tracking-[0.12em] text-[#FF1E6E] uppercase">
                  Actualizar contraseña de acceso
                </p>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="current-pass"
                      className="block text-xs text-[#D4D4D8]"
                    >
                      Contraseña actual
                    </label>
                    <input
                      id="current-pass"
                      type="password"
                      required
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      className="mt-1.5 w-full rounded-sm border border-white/15 bg-[#121215] px-3 py-2 text-sm text-[#F4F1EA] focus:border-[#FF1E6E] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="new-pass"
                      className="block text-xs text-[#D4D4D8]"
                    >
                      Nueva contraseña (mín. 6 caracteres)
                    </label>
                    <input
                      id="new-pass"
                      type="password"
                      required
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      className="mt-1.5 w-full rounded-sm border border-white/15 bg-[#121215] px-3 py-2 text-sm text-[#F4F1EA] focus:border-[#FF1E6E] focus:outline-none"
                    />
                  </div>
                </div>
                {changePassFeedback && (
                  <p
                    role={changePassFeedback.type === 'err' ? 'alert' : 'status'}
                    className={`mt-3 text-xs ${
                      changePassFeedback.type === 'ok'
                        ? 'text-emerald-300'
                        : 'text-[#FDA4AF]'
                    }`}
                  >
                    {changePassFeedback.text}
                  </p>
                )}
                <button
                  type="submit"
                  className="mt-3 cursor-pointer rounded-sm bg-[#F4F1EA] px-4 py-2 text-xs font-bold text-[#0D0D0F] hover:bg-white"
                >
                  Guardar nueva contraseña
                </button>
              </form>
            )}

            {/* Auth section */}
            <div className="mt-5 rounded-sm border border-white/10 bg-[#18181D] p-5">
              {needsAuth || !user ? (
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm font-semibold text-[#F4F1EA]">
                      Conecta tu cuenta de Google
                    </p>
                    <p className="mt-1 text-xs text-[#A1A1AA]">
                      Necesitas iniciar sesión para crear o sincronizar la hoja «
                      {SPREADSHEET_TITLE}» en tu Google Drive.
                    </p>
                  </div>
                  <GoogleSignInButton
                    onClick={onLogin}
                    disabled={isLoggingIn}
                    label={
                      isLoggingIn
                        ? 'Conectando...'
                        : 'Iniciar sesión con Google'
                    }
                  />
                </div>
              ) : (
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs text-[#A1A1AA]">Sesión activa</p>
                    <p className="mt-0.5 text-sm font-semibold text-[#F4F1EA]">
                      {user.displayName || user.email}
                    </p>
                    {user.email && (
                      <p className="text-xs text-[#A1A1AA]">{user.email}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={onLogout}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-white/15 px-3.5 py-2 text-xs font-semibold text-[#D4D4D8] transition-colors hover:border-white/30 hover:text-[#F4F1EA]"
                  >
                    <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              )}
            </div>

            {/* Status / Error alerts */}
            {statusMsg && (
              <p
                role="status"
                className="mt-4 rounded-sm border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-200"
              >
                {statusMsg}
              </p>
            )}
            {errorMsg && (
              <p
                role="alert"
                className="mt-4 rounded-sm border border-[#FF1E6E]/40 bg-[#FF1E6E]/10 px-4 py-3 text-xs text-[#FDA4AF]"
              >
                {errorMsg}
              </p>
            )}

            {/* Pending local queue — always visible when unlocked */}
            {totalPending > 0 && (
              <div className="mt-5 rounded-sm border border-[#FF1E6E]/40 bg-[#18181D] p-5">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm font-semibold text-[#F4F1EA]">
                      Envíos del formulario en espera:{' '}
                      <span className="tabular-nums text-[#FF1E6E]">
                        {totalPending}
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-[#A1A1AA]">
                      {pendingRegistros.length} de clase de prueba (pestaña{' '}
                      {TAB_REGISTROS}) · {pendingBoletin.length} de boletín
                      (pestaña {TAB_BOLETIN}).
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={isBusy || !sheetInfo || needsAuth}
                    onClick={() => setConfirmType('sync')}
                    className="shrink-0 cursor-pointer rounded-sm bg-[#FF1E6E] px-4 py-2.5 text-xs font-bold text-[#0D0D0F] hover:bg-[#ff3b81] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Guardar pendientes en Google Sheets
                  </button>
                </div>

                {(!user || needsAuth || !sheetInfo) && (
                  <p className="mt-3 text-xs text-[#D4D4D8]">
                    Estos envíos están guardados en este navegador y aún no se
                    han enviado a Google Sheets. Conecta tu cuenta de Google y
                    vincula tu hoja para subirlos.
                  </p>
                )}

                <ul className="mt-3 space-y-1.5 border-t border-white/10 pt-3 text-xs text-[#D4D4D8]">
                  {pendingRegistros.map((r, idx) => (
                    <li key={`reg-${idx}`}>
                      <span className="font-semibold text-[#F4F1EA]">
                        [Registro] {r.nombre}
                      </span>{' '}
                      · {r.contacto} · {r.categoria} ({r.fecha})
                    </li>
                  ))}
                  {pendingBoletin.map((b, idx) => (
                    <li key={`bol-${idx}`}>
                      <span className="font-semibold text-[#F4F1EA]">
                        [Boletín] {b.correo}
                      </span>{' '}
                      · {b.fecha}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sheet connection & pending queue */}
            {user && !needsAuth && (
              <div className="mt-6 space-y-6">
                <div className="rounded-sm border border-white/10 bg-[#141417] p-5">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-start gap-3">
                      <FileSpreadsheet
                        className="mt-0.5 h-5 w-5 shrink-0 text-[#FF1E6E]"
                        aria-hidden="true"
                      />
                      <div>
                        {sheetInfo ? (
                          <>
                            <p className="text-sm font-semibold text-[#F4F1EA]">
                              Conectada: {sheetInfo.title}
                            </p>
                            <p className="mt-0.5 text-xs text-[#A1A1AA]">
                              Pestañas actuales:{' '}
                              {sheetInfo.tabs.length > 0
                                ? sheetInfo.tabs.join(' · ')
                                : 'Sin pestañas'}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-semibold text-[#F4F1EA]">
                              No se detectó la hoja «{SPREADSHEET_TITLE}»
                              creada por esta web
                            </p>
                            <p className="mt-0.5 text-xs text-[#A1A1AA]">
                              Si la creaste manualmente en Google Drive, pega su
                              enlace abajo para conectarla. Si aún no existe,
                              créala con un clic.
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      {sheetInfo ? (
                        <>
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={onRefreshSheet}
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-sm border border-white/15 px-3.5 py-2 text-xs font-semibold text-[#F4F1EA] hover:border-white/35 disabled:opacity-50"
                          >
                            <RefreshCw
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                            <span>Actualizar</span>
                          </button>
                          <a
                            href={sheetInfo.spreadsheetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-sm bg-[#F4F1EA] px-3.5 py-2 text-xs font-bold text-[#0D0D0F] hover:bg-white"
                          >
                            <span>Abrir hoja</span>
                            <ExternalLink
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                          </a>
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={onUnlinkSheet}
                            className="cursor-pointer rounded-sm border border-white/15 px-3 py-2 text-xs font-semibold text-[#A1A1AA] hover:border-white/30 hover:text-[#F4F1EA]"
                          >
                            Cambiar hoja
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => setConfirmType('create')}
                          className="cursor-pointer rounded-sm bg-[#FF1E6E] px-4 py-2.5 text-xs font-bold text-[#0D0D0F] hover:bg-[#ff3b81] disabled:opacity-50"
                        >
                          Crear hoja «{SPREADSHEET_TITLE}»
                        </button>
                      )}
                    </div>
                  </div>

                  {!sheetInfo && (
                    <form
                      onSubmit={handleLinkSubmit}
                      className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 sm:flex-row"
                    >
                      <label htmlFor="existing-sheet-url" className="sr-only">
                        Enlace o ID de hoja existente de Google Sheets
                      </label>
                      <div className="relative flex-1">
                        <Link2
                          className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#71717A]"
                          aria-hidden="true"
                        />
                        <input
                          id="existing-sheet-url"
                          type="text"
                          value={sheetUrlInput}
                          onChange={(e) => setSheetUrlInput(e.target.value)}
                          placeholder="Pega aquí el enlace de tu Google Sheet «web basket mexico»"
                          className="w-full rounded-sm border border-white/15 bg-[#121215] py-2 pr-3 pl-9 text-xs text-[#F4F1EA] placeholder:text-[#71717A] focus:border-[#FF1E6E] focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isBusy || !sheetUrlInput.trim()}
                        className="shrink-0 cursor-pointer rounded-sm border border-white/20 px-4 py-2 text-xs font-bold text-[#F4F1EA] hover:border-[#FF1E6E] disabled:opacity-50"
                      >
                        Conectar hoja existente
                      </button>
                    </form>
                  )}
                </div>

                {/* Preview table from Google Sheets */}
                {sheetInfo && (
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div role="tablist" className="flex gap-2">
                        <button
                          type="button"
                          role="tab"
                          aria-selected={activeTab === 'registros'}
                          onClick={() => setActiveTab('registros')}
                          className={`cursor-pointer rounded-sm border px-3.5 py-2 text-xs font-bold ${
                            activeTab === 'registros'
                              ? 'border-[#FF1E6E] bg-[#FF1E6E] text-[#0D0D0F]'
                              : 'border-white/15 bg-[#141417] text-[#D4D4D8]'
                          }`}
                        >
                          Pestaña {TAB_REGISTROS} (
                          {Math.max(0, previewRegistros.length - 1)})
                        </button>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={activeTab === 'boletin'}
                          onClick={() => setActiveTab('boletin')}
                          className={`cursor-pointer rounded-sm border px-3.5 py-2 text-xs font-bold ${
                            activeTab === 'boletin'
                              ? 'border-[#FF1E6E] bg-[#FF1E6E] text-[#0D0D0F]'
                              : 'border-white/15 bg-[#141417] text-[#D4D4D8]'
                          }`}
                        >
                          Pestaña {TAB_BOLETIN} (
                          {Math.max(0, previewBoletin.length - 1)})
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 overflow-x-auto rounded-sm border border-white/10 bg-[#0D0D0F]">
                      {activeRows.length === 0 ? (
                        <p className="p-5 text-xs text-[#A1A1AA]">
                          {sheetInfo.tabs.includes(
                            activeTab === 'registros'
                              ? TAB_REGISTROS
                              : TAB_BOLETIN
                          )
                            ? 'Aún no hay filas registradas en esta pestaña.'
                            : `Esta hoja aún no tiene la pestaña «${
                                activeTab === 'registros'
                                  ? TAB_REGISTROS
                                  : TAB_BOLETIN
                              }». Se creará automáticamente en cuanto guardes tu primer registro.`}
                        </p>
                      ) : (
                        <table className="w-full border-collapse text-left text-xs">
                          <thead>
                            <tr className="border-b border-white/10 text-[#71717A] uppercase">
                              {activeRows[0].map((header, idx) => (
                                <th key={idx} className="px-4 py-3 font-bold">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/10">
                            {activeRows.slice(1).map((row, rIdx) => (
                              <tr key={rIdx}>
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className="px-4 py-2.5 text-[#D4D4D8]"
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <ConfirmActionModal
        open={confirmType !== null}
        title={
          confirmType === 'create'
            ? `¿Crear «${SPREADSHEET_TITLE}»?`
            : `¿Guardar ${totalPending} suscripción(es)?`
        }
        description={
          confirmType === 'create'
            ? `Se creará una nueva hoja de cálculo llamada «${SPREADSHEET_TITLE}» en tu Google Drive con las pestañas ${TAB_REGISTROS} y ${TAB_BOLETIN}.`
            : `Se agregarán ${totalPending} registros pendientes al final de tu hoja de Google Sheets «${SPREADSHEET_TITLE}».`
        }
        details={
          confirmType === 'create'
            ? [
                `Archivo nuevo: ${SPREADSHEET_TITLE}`,
                `Pestaña 1: ${TAB_BOLETIN} (Fecha, Correo electrónico, Origen)`,
                `Pestaña 2: ${TAB_REGISTROS} (Fecha, Nombre, WhatsApp o correo, Categoría, Nivel, Plan)`,
              ]
            : [
                `Suscripciones al boletín: ${pendingBoletin.length}`,
                `Registros de clase de prueba: ${pendingRegistros.length}`,
              ]
        }
        confirmLabel={
          confirmType === 'create' ? 'Sí, crear hoja' : 'Sí, guardar en Sheets'
        }
        isBusy={isBusy}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmType(null)}
      />
    </div>
  );
}
