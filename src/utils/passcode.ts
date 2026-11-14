const SESSION_UNLOCK_KEY = 'altura_bc_google_admin_unlocked';

export async function verifyAdminPasscode(candidate: string): Promise<boolean> {
  const res = await fetch('/api/admin/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ passcode: candidate }),
  });

  if (!res.ok) return false;
  const data = (await res.json()) as { ok?: boolean };
  return Boolean(data.ok);
}

export async function updateAdminPasscode(
  currentPasscode: string,
  newPasscode: string
): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch('/api/admin/change-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ currentPasscode, newPasscode }),
  });

  const data = (await res.json()) as { ok?: boolean; error?: string };
  if (!res.ok || !data.ok) {
    return {
      ok: false,
      error: data.error || 'No se pudo actualizar la contraseña.',
    };
  }
  return { ok: true };
}

export function isSessionUnlocked(): boolean {
  try {
    return sessionStorage.getItem(SESSION_UNLOCK_KEY) === '1';
  } catch {
    return false;
  }
}

export function setSessionUnlocked(unlocked: boolean): void {
  try {
    if (unlocked) {
      sessionStorage.setItem(SESSION_UNLOCK_KEY, '1');
    } else {
      sessionStorage.removeItem(SESSION_UNLOCK_KEY);
    }
  } catch {
    // ignore storage error
  }
}
