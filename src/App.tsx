import { useCallback, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { CATEGORY_OPTIONS } from './data/clubData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ClubPage } from './pages/ClubPage';
import { TecnificacionPage } from './pages/TecnificacionPage';
import { UniversitariaPage } from './pages/UniversitariaPage';
import { MetodologiaPage } from './pages/MetodologiaPage';
import { SheetsManagerModal } from './components/SheetsManagerModal';
import { ConfirmActionModal } from './components/ConfirmActionModal';
import {
  getAccessToken,
  googleSignIn,
  initAuth,
  logout,
} from './services/googleAuth';
import {
  appendBoletinRows,
  appendRegistrosRows,
  createWebBasketMexicoSheet,
  ensureRequiredTabs,
  findWebBasketMexicoSheet,
  readSheetPreview,
  SPREADSHEET_TITLE,
  TAB_BOLETIN,
  TAB_REGISTROS,
  type BoletinRow,
  type ConnectedSheetInfo,
  type RegistroRow,
} from './services/googleSheets';
import { isSessionUnlocked, setSessionUnlocked } from './utils/passcode';

const KNOWN_PATHS = new Set([
  '/',
  '/club',
  '/tecnificacion',
  '/academia-universitaria',
  '/metodologia',
]);

const STORAGE_KEY_REGISTROS = 'altura_bc_pending_registros';
const STORAGE_KEY_BOLETIN = 'altura_bc_pending_boletin';

function loadPending<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const cleaned = pathname.replace(/\/+$/, '');
  return cleaned || '/';
}

const PAGE_TITLES: Record<string, string> = {
  '/': 'Altura BC — Club de Básquet · Ciudad de México',
  '/club': 'El Club y Etapas de Formación — Altura BC',
  '/tecnificacion': 'Academia de Tecnificación — Altura BC',
  '/academia-universitaria': 'Academia Universitaria EE. UU. — Altura BC',
  '/metodologia': 'Metodología, Seguimiento y Temporada — Altura BC',
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    normalizePath(window.location.pathname)
  );
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_OPTIONS[0]);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Google Sheets & Auth state
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(() =>
    isSessionUnlocked()
  );
  const [needsAuth, setNeedsAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [sheetInfo, setSheetInfo] = useState<ConnectedSheetInfo | null>(null);
  const [sheetsModalOpen, setSheetsModalOpen] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [sheetStatusMsg, setSheetStatusMsg] = useState<string | null>(null);
  const [sheetErrorMsg, setSheetErrorMsg] = useState<string | null>(null);

  const [pendingRegistros, setPendingRegistros] = useState<RegistroRow[]>(() =>
    loadPending<RegistroRow>(STORAGE_KEY_REGISTROS)
  );
  const [pendingBoletin, setPendingBoletin] = useState<BoletinRow[]>(() =>
    loadPending<BoletinRow>(STORAGE_KEY_BOLETIN)
  );

  const [previewRegistros, setPreviewRegistros] = useState<string[][]>([]);
  const [previewBoletin, setPreviewBoletin] = useState<string[][]>([]);

  // Immediate confirmation state when already signed in & sheet connected
  const [confirmLiveRegistro, setConfirmLiveRegistro] =
    useState<RegistroRow | null>(null);
  const [confirmLiveBoletin, setConfirmLiveBoletin] =
    useState<BoletinRow | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY_REGISTROS,
        JSON.stringify(pendingRegistros)
      );
    } catch {
      // ignore storage errors
    }
  }, [pendingRegistros]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY_BOLETIN,
        JSON.stringify(pendingBoletin)
      );
    } catch {
      // ignore storage errors
    }
  }, [pendingBoletin]);

  const loadSheetPreviews = useCallback(
    async (accessToken: string, info: ConnectedSheetInfo) => {
      const [regRows, bolRows] = await Promise.all([
        info.tabs.includes(TAB_REGISTROS)
          ? readSheetPreview(accessToken, info.spreadsheetId, TAB_REGISTROS)
          : Promise.resolve([]),
        info.tabs.includes(TAB_BOLETIN)
          ? readSheetPreview(accessToken, info.spreadsheetId, TAB_BOLETIN)
          : Promise.resolve([]),
      ]);
      setPreviewRegistros(regRows);
      setPreviewBoletin(bolRows);
    },
    []
  );

  const discoverSheet = useCallback(
    async (accessToken: string) => {
      setIsBusy(true);
      setSheetErrorMsg(null);
      try {
        const found = await findWebBasketMexicoSheet(accessToken);
        if (found) {
          const updated = await ensureRequiredTabs(accessToken, found);
          setSheetInfo(updated);
          await loadSheetPreviews(accessToken, updated);
        } else {
          setSheetInfo(null);
          setPreviewRegistros([]);
          setPreviewBoletin([]);
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : 'No se pudo consultar Google Sheets.';
        setSheetErrorMsg(message);
      } finally {
        setIsBusy(false);
      }
    },
    [loadSheetPreviews]
  );

  useEffect(() => {
    const unsubscribe = initAuth(
      (authedUser, token) => {
        setUser(authedUser);
        setNeedsAuth(false);
        void discoverSheet(token);
      },
      () => {
        setUser(null);
        setNeedsAuth(true);
        setSheetInfo(null);
      }
    );
    return () => unsubscribe();
  }, [discoverSheet]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.title =
      PAGE_TITLES[currentPath] ??
      'Altura BC — Club de Básquet · Ciudad de México';
  }, [currentPath]);

  useEffect(() => {
    if (isAdminUnlocked) return;

    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        return;
      }
      e.preventDefault();
      setSheetsModalOpen(true);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      const isInspectShortcut =
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && ['I', 'J', 'C'].includes(key)) ||
        ((e.ctrlKey || e.metaKey) && key === 'U');

      if (isInspectShortcut) {
        e.preventDefault();
        setSheetsModalOpen(true);
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAdminUnlocked]);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setSheetErrorMsg(null);
    setSheetStatusMsg(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setNeedsAuth(false);
        await discoverSheet(result.accessToken);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Error al iniciar sesión con Google.';
      setSheetErrorMsg(message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setNeedsAuth(true);
    setSheetInfo(null);
    setPreviewRegistros([]);
    setPreviewBoletin([]);
    setSheetStatusMsg(null);
    setSheetErrorMsg(null);
  };

  const handleCreateSheetConfirmed = async () => {
    const token = await getAccessToken();
    if (!token) {
      setNeedsAuth(true);
      return;
    }
    setIsBusy(true);
    setSheetErrorMsg(null);
    setSheetStatusMsg(null);
    try {
      const created = await createWebBasketMexicoSheet(token);
      setSheetInfo(created);
      await loadSheetPreviews(token, created);
      setSheetStatusMsg(
        `Hoja «${SPREADSHEET_TITLE}» creada correctamente con las pestañas ${TAB_BOLETIN} y ${TAB_REGISTROS}.`
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'No se pudo crear la hoja en Google Sheets.';
      setSheetErrorMsg(message);
    } finally {
      setIsBusy(false);
    }
  };

  const handleRefreshSheet = async () => {
    const token = await getAccessToken();
    if (!token || !sheetInfo) return;
    setIsBusy(true);
    setSheetErrorMsg(null);
    try {
      const refreshed = await ensureRequiredTabs(token, sheetInfo);
      setSheetInfo(refreshed);
      await loadSheetPreviews(token, refreshed);
      setSheetStatusMsg('Datos actualizados desde Google Sheets.');
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'No se pudo actualizar la vista de Google Sheets.';
      setSheetErrorMsg(message);
    } finally {
      setIsBusy(false);
    }
  };

  const handleSyncPendingConfirmed = async () => {
    const token = await getAccessToken();
    if (!token || !sheetInfo) return;
    setIsBusy(true);
    setSheetErrorMsg(null);
    setSheetStatusMsg(null);
    try {
      const updatedInfo = await ensureRequiredTabs(token, sheetInfo);
      await Promise.all([
        appendRegistrosRows(token, updatedInfo.spreadsheetId, pendingRegistros),
        appendBoletinRows(token, updatedInfo.spreadsheetId, pendingBoletin),
      ]);
      const syncedTotal = pendingRegistros.length + pendingBoletin.length;
      setPendingRegistros([]);
      setPendingBoletin([]);
      await loadSheetPreviews(token, updatedInfo);
      setSheetStatusMsg(
        `Se guardaron ${syncedTotal} registro(s) en «${SPREADSHEET_TITLE}».`
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Error al guardar suscripciones en Google Sheets.';
      setSheetErrorMsg(message);
    } finally {
      setIsBusy(false);
    }
  };

  const handleRegistrationSubmit = async (row: RegistroRow) => {
    setPendingRegistros((prev) => [...prev, row]);
    const token = await getAccessToken();
    if (isAdminUnlocked && token && sheetInfo && !needsAuth) {
      setConfirmLiveRegistro(row);
    }
  };

  const handleNewsletterSubmit = async (row: BoletinRow) => {
    setPendingBoletin((prev) => [...prev, row]);
    const token = await getAccessToken();
    if (isAdminUnlocked && token && sheetInfo && !needsAuth) {
      setConfirmLiveBoletin(row);
    }
  };

  const handleConfirmLiveRegistro = async () => {
    if (!confirmLiveRegistro || !sheetInfo) return;
    const token = await getAccessToken();
    if (!token) return;
    setIsBusy(true);
    try {
      await appendRegistrosRows(token, sheetInfo.spreadsheetId, [
        confirmLiveRegistro,
      ]);
      setPendingRegistros((prev) =>
        prev.filter((r) => r !== confirmLiveRegistro)
      );
      await loadSheetPreviews(token, sheetInfo);
    } finally {
      setIsBusy(false);
      setConfirmLiveRegistro(null);
    }
  };

  const handleConfirmLiveBoletin = async () => {
    if (!confirmLiveBoletin || !sheetInfo) return;
    const token = await getAccessToken();
    if (!token) return;
    setIsBusy(true);
    try {
      await appendBoletinRows(token, sheetInfo.spreadsheetId, [
        confirmLiveBoletin,
      ]);
      setPendingBoletin((prev) => prev.filter((b) => b !== confirmLiveBoletin));
      await loadSheetPreviews(token, sheetInfo);
    } finally {
      setIsBusy(false);
      setConfirmLiveBoletin(null);
    }
  };

  const navigate = (to: string) => {
    const [rawPath, hash] = to.split('#');
    const targetPath = normalizePath(rawPath || '/');

    if (targetPath !== currentPath) {
      window.history.pushState({}, '', to);
      setCurrentPath(targetPath);
    } else if (hash) {
      window.history.pushState({}, '', to);
    }

    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToRegistration = () => {
    navigate('/#registro');
  };

  const handleSelectCategory = (formValue: string) => {
    setSelectedCategory(formValue);
    goToRegistration();
  };

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    goToRegistration();
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return (
          <HomePage
            selectedCategory={selectedCategory}
            selectedPlan={selectedPlan}
            onSelectCategory={handleSelectCategory}
            onSelectPlan={handleSelectPlan}
            onClearPlan={() => setSelectedPlan(null)}
            onNavigate={navigate}
            onGoToRegister={goToRegistration}
            onSubmitRegistration={handleRegistrationSubmit}
          />
        );
      case '/club':
        return (
          <ClubPage
            onSelectCategoryAndRegister={handleSelectCategory}
            onNavigate={navigate}
          />
        );
      case '/tecnificacion':
        return (
          <TecnificacionPage
            onSelectCategoryAndRegister={handleSelectCategory}
            onNavigate={navigate}
          />
        );
      case '/academia-universitaria':
        return (
          <UniversitariaPage
            onSelectCategoryAndRegister={handleSelectCategory}
            onNavigate={navigate}
          />
        );
      case '/metodologia':
        return <MetodologiaPage onGoToRegister={goToRegistration} />;
      default:
        return (
          <section className="mx-auto max-w-6xl px-6 py-24 text-left">
            <p className="text-xs font-bold tracking-[0.16em] text-[#FF1E6E] uppercase">
              Página no encontrada
            </p>
            <h1 className="mt-3 font-display text-5xl font-extrabold uppercase sm:text-6xl">
              Esta ruta no existe en el club
            </h1>
            <p className="mt-4 max-w-md text-base text-[#A1A1AA]">
              Puedes volver al inicio o entrar directo a conocer nuestros
              programas de formación, tecnificación y ruta universitaria.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="cursor-pointer rounded-sm bg-[#FF1E6E] px-6 py-3 text-sm font-bold text-[#0D0D0F] hover:bg-[#ff3b81]"
              >
                Volver al inicio
              </button>
              <button
                type="button"
                onClick={() => navigate('/club')}
                className="cursor-pointer rounded-sm border border-white/20 px-6 py-3 text-sm font-semibold text-[#F4F1EA] hover:border-white/40"
              >
                Ver El Club
              </button>
            </div>
          </section>
        );
    }
  };

  return (
    <div id="inicio" className="flex min-h-screen flex-col bg-[#0D0D0F] text-[#F4F1EA]">
      <Navbar
        currentPath={KNOWN_PATHS.has(currentPath) ? currentPath : '/'}
        onNavigate={navigate}
        onCtaClick={goToRegistration}
      />

      <main className="flex-1">{renderPage()}</main>

      <Footer
        onNavigate={navigate}
        onSubscribeNewsletter={handleNewsletterSubmit}
        onOpenSheetsManager={() => setSheetsModalOpen(true)}
        pendingCount={pendingRegistros.length + pendingBoletin.length}
        isSheetConnected={Boolean(sheetInfo)}
        isAdminUnlocked={isAdminUnlocked}
      />

      <SheetsManagerModal
        open={sheetsModalOpen}
        onClose={() => setSheetsModalOpen(false)}
        isUnlocked={isAdminUnlocked}
        onUnlock={() => {
          setSessionUnlocked(true);
          setIsAdminUnlocked(true);
        }}
        onLock={() => {
          setSessionUnlocked(false);
          setIsAdminUnlocked(false);
        }}
        user={user}
        needsAuth={needsAuth}
        isLoggingIn={isLoggingIn}
        sheetInfo={sheetInfo}
        pendingRegistros={pendingRegistros}
        pendingBoletin={pendingBoletin}
        previewRegistros={previewRegistros}
        previewBoletin={previewBoletin}
        isBusy={isBusy}
        statusMsg={sheetStatusMsg}
        errorMsg={sheetErrorMsg}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onCreateSheetConfirmed={handleCreateSheetConfirmed}
        onRefreshSheet={handleRefreshSheet}
        onSyncPendingConfirmed={handleSyncPendingConfirmed}
      />

      <ConfirmActionModal
        open={confirmLiveRegistro !== null}
        title="¿Guardar registro en Google Sheets?"
        description={`Se agregará este nuevo registro a la pestaña ${TAB_REGISTROS} de tu hoja «${SPREADSHEET_TITLE}».`}
        details={
          confirmLiveRegistro
            ? [
                `Nombre: ${confirmLiveRegistro.nombre}`,
                `Contacto: ${confirmLiveRegistro.contacto}`,
                `Categoría: ${confirmLiveRegistro.categoria}`,
              ]
            : []
        }
        isBusy={isBusy}
        onConfirm={handleConfirmLiveRegistro}
        onCancel={() => setConfirmLiveRegistro(null)}
      />

      <ConfirmActionModal
        open={confirmLiveBoletin !== null}
        title="¿Guardar suscripción en Google Sheets?"
        description={`Se agregará este correo a la pestaña ${TAB_BOLETIN} de tu hoja «${SPREADSHEET_TITLE}».`}
        details={
          confirmLiveBoletin
            ? [`Correo: ${confirmLiveBoletin.correo}`]
            : []
        }
        isBusy={isBusy}
        onConfirm={handleConfirmLiveBoletin}
        onCancel={() => setConfirmLiveBoletin(null)}
      />
    </div>
  );
}
