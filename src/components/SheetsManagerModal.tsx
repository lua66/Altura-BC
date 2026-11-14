import { useState } from 'react';
import { ExternalLink, FileSpreadsheet, LogOut, RefreshCw, X } from 'lucide-react';
import type { User } from 'firebase/auth';
import {
  SPREADSHEET_TITLE,
  TAB_BOLETIN,
  TAB_REGISTROS,
  type BoletinRow,
  type ConnectedSheetInfo,
  type RegistroRow,
} from '../services/googleSheets';
import { GoogleSignInButton } from './GoogleSignInButton';
import { ConfirmActionModal } from './ConfirmActionModal';

interface SheetsManagerModalProps {
  open: boolean;
  onClose: () => void;
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
}

export function SheetsManagerModal({
  open,
  onClose,
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
}: SheetsManagerModalProps) {
  const [activeTab, setActiveTab] = useState<'registros' | 'boletin'>('boletin');
  const [confirmType, setConfirmType] = useState<'create' | 'sync' | null>(null);

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
              Integración Google Sheets
            </p>
            <h2
              id="sheets-manager-title"
              className="mt-1 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl"
            >
              Hoja «{SPREADSHEET_TITLE}»
            </h2>
            <p className="mt-1 text-sm text-[#A1A1AA]">
              Administra la hoja de Google Sheets donde se guardan las
              suscripciones al boletín y los registros de clase de prueba.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar panel de Google Sheets"
            className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-white/15 text-[#A1A1AA] transition-colors hover:border-white/30 hover:text-[#F4F1EA]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Auth section */}
        <div className="mt-6 rounded-sm border border-white/10 bg-[#18181D] p-5">
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
                label={isLoggingIn ? 'Conectando...' : 'Iniciar sesión con Google'}
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

        {/* Sheet connection & pending queue */}
        {user && !needsAuth && (
          <div className="mt-6 space-y-6">
            <div className="flex flex-col justify-between gap-4 rounded-sm border border-white/10 bg-[#141417] p-5 sm:flex-row sm:items-center">
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
                        Pestañas activas: {sheetInfo.tabs.join(' · ')}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-semibold text-[#F4F1EA]">
                        La hoja «{SPREADSHEET_TITLE}» aún no existe en tu Drive
                      </p>
                      <p className="mt-0.5 text-xs text-[#A1A1AA]">
                        Créala con un clic para habilitar las pestañas{' '}
                        {TAB_BOLETIN} y {TAB_REGISTROS}.
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
                      <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Actualizar</span>
                    </button>
                    <a
                      href={sheetInfo.spreadsheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-sm bg-[#F4F1EA] px-3.5 py-2 text-xs font-bold text-[#0D0D0F] hover:bg-white"
                    >
                      <span>Abrir hoja</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
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

            {/* Pending local queue */}
            {totalPending > 0 && (
              <div className="flex flex-col justify-between gap-4 rounded-sm border border-[#FF1E6E]/40 bg-[#18181D] p-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-semibold text-[#F4F1EA]">
                    Suscripciones pendientes por guardar:{' '}
                    <span className="tabular-nums text-[#FF1E6E]">
                      {totalPending}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-[#A1A1AA]">
                    {pendingBoletin.length} de boletín ·{' '}
                    {pendingRegistros.length} de clase de prueba.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={isBusy || !sheetInfo}
                  onClick={() => setConfirmType('sync')}
                  className="shrink-0 cursor-pointer rounded-sm bg-[#FF1E6E] px-4 py-2.5 text-xs font-bold text-[#0D0D0F] hover:bg-[#ff3b81] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Guardar pendientes en Google Sheets
                </button>
              </div>
            )}

            {/* Preview table from Google Sheets */}
            {sheetInfo && (
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div role="tablist" className="flex gap-2">
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
                      Pestaña {TAB_BOLETIN}
                    </button>
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
                      Pestaña {TAB_REGISTROS}
                    </button>
                  </div>
                </div>

                <div className="mt-3 overflow-x-auto rounded-sm border border-white/10 bg-[#0D0D0F]">
                  {activeRows.length === 0 ? (
                    <p className="p-5 text-xs text-[#A1A1AA]">
                      Aún no hay filas registradas en esta pestaña.
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
