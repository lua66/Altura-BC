const SESSION_UNLOCK_KEY = 'altura_bc_google_admin_unlocked';
const CUSTOM_HASH_KEY = 'altura_bc_admin_custom_hash';

// SHA-256 hashes of the default access passcodes ('Altura2240' and 'Altura2240!')
// Used only as fallback if the static preview host does not run the Express API.
const FALLBACK_DEFAULT_HASHES = [
  '56b60a38dc366e6735307ac1d289f70a945e79cb77c3a0c047467832924e71cc',
  'c7e622b483200055b8c800aed76d5e3693071bd91d3fb04a58e05968d53a042b',
];

async function sha256Hex(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  if (typeof window !== 'undefined' && window.crypto?.subtle) {
    const digest = await window.crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  return '';
}

async function verifyLocally(candidate: string): Promise<boolean> {
  const trimmed = candidate.trim();
  const hash = await sha256Hex(trimmed);
  if (!hash) return false;
  try {
    const customHash = localStorage.getItem(CUSTOM_HASH_KEY);
    if (customHash) return hash === customHash;
  } catch {
    // ignore storage error
  }
  return FALLBACK_DEFAULT_HASHES.includes(hash);
}

export async function verifyAdminPasscode(candidate: string): Promise<boolean> {
  const trimmed = candidate.trim();
  if (!trimmed) return false;

  try {
    const res = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode: trimmed }),
    });

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = (await res.json()) as { ok?: boolean };
      if (res.ok && data.ok) {
        return true;
      }
      if (res.status === 401) {
        return false;
      }
    }
  } catch {
    // Fall back to local verification if API route is unreachable
  }

  return verifyLocally(trimmed);
}

export async function updateAdminPasscode(
  currentPasscode: string,
  newPasscode: string
): Promise<{ ok: boolean; error?: string }> {
  const current = currentPasscode.trim();
  const next = newPasscode.trim();

  if (next.length < 6) {
    return {
      ok: false,
      error: 'La nueva contraseña debe tener al menos 6 caracteres.',
    };
  }

  try {
    const res = await fetch('/api/admin/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPasscode: current, newPasscode: next }),
    });
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        return {
          ok: false,
          error: data.error || 'No se pudo actualizar la contraseña.',
        };
      }
      const hash = await sha256Hex(next);
      if (hash) {
        try {
          localStorage.setItem(CUSTOM_HASH_KEY, hash);
        } catch {
          // ignore
        }
      }
      return { ok: true };
    }
  } catch {
    // Fall back to local update if static host
  }

  const validLocal = await verifyLocally(current);
  if (!validLocal) {
    return { ok: false, error: 'La contraseña actual no es correcta.' };
  }
  const hash = await sha256Hex(next);
  if (hash) {
    try {
      localStorage.setItem(CUSTOM_HASH_KEY, hash);
    } catch {
      return { ok: false, error: 'No se pudo guardar la nueva contraseña.' };
    }
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
