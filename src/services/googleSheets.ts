export const SPREADSHEET_TITLE = 'web basket mexico';
export const TAB_REGISTROS = 'Registros';
export const TAB_BOLETIN = 'Boletin';

export interface RegistroRow {
  fecha: string;
  nombre: string;
  contacto: string;
  categoria: string;
  nivel: string;
  plan: string;
}

export interface BoletinRow {
  fecha: string;
  correo: string;
  origen: string;
}

export interface ConnectedSheetInfo {
  spreadsheetId: string;
  spreadsheetUrl: string;
  title: string;
  tabs: string[];
}

interface DriveFileListResponse {
  files?: Array<{
    id: string;
    name: string;
    webViewLink?: string;
  }>;
}

interface SpreadsheetMetadata {
  spreadsheetId: string;
  spreadsheetUrl: string;
  properties?: {
    title?: string;
  };
  sheets?: Array<{
    properties?: {
      sheetId?: number;
      title?: string;
    };
  }>;
}

async function fetchGoogleJson<T>(
  url: string,
  accessToken: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    let errorText = `Error de Google API (${res.status})`;
    try {
      const errBody = await res.json();
      if (errBody?.error?.message) {
        errorText = errBody.error.message;
      }
    } catch {
      // ignore json parse failure
    }
    throw new Error(errorText);
  }

  return res.json() as Promise<T>;
}

export async function findWebBasketMexicoSheet(
  accessToken: string
): Promise<ConnectedSheetInfo | null> {
  const query = encodeURIComponent(
    `name='${SPREADSHEET_TITLE}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`
  );
  const data = await fetchGoogleJson<DriveFileListResponse>(
    `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink)&orderBy=modifiedTime desc`,
    accessToken
  );

  const match = data.files?.[0];
  if (!match?.id) return null;

  return getSpreadsheetMetadata(accessToken, match.id);
}

export async function getSpreadsheetMetadata(
  accessToken: string,
  spreadsheetId: string
): Promise<ConnectedSheetInfo> {
  const meta = await fetchGoogleJson<SpreadsheetMetadata>(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=spreadsheetId,spreadsheetUrl,properties.title,sheets.properties`,
    accessToken
  );

  const tabs = (meta.sheets ?? [])
    .map((s) => s.properties?.title)
    .filter((t): t is string => Boolean(t));

  return {
    spreadsheetId: meta.spreadsheetId,
    spreadsheetUrl: meta.spreadsheetUrl,
    title: meta.properties?.title ?? SPREADSHEET_TITLE,
    tabs,
  };
}

export async function createWebBasketMexicoSheet(
  accessToken: string
): Promise<ConnectedSheetInfo> {
  const created = await fetchGoogleJson<SpreadsheetMetadata>(
    'https://sheets.googleapis.com/v4/spreadsheets',
    accessToken,
    {
      method: 'POST',
      body: JSON.stringify({
        properties: {
          title: SPREADSHEET_TITLE,
          locale: 'es_MX',
        },
        sheets: [
          { properties: { title: TAB_REGISTROS } },
          { properties: { title: TAB_BOLETIN } },
        ],
      }),
    }
  );

  const spreadsheetId = created.spreadsheetId;

  await writeHeadersIfNeeded(accessToken, spreadsheetId, TAB_REGISTROS, [
    'Fecha',
    'Nombre',
    'WhatsApp o correo',
    'Categoría',
    'Nivel',
    'Plan de interés',
  ]);

  await writeHeadersIfNeeded(accessToken, spreadsheetId, TAB_BOLETIN, [
    'Fecha',
    'Correo electrónico',
    'Origen',
  ]);

  return getSpreadsheetMetadata(accessToken, spreadsheetId);
}

export async function ensureRequiredTabs(
  accessToken: string,
  info: ConnectedSheetInfo
): Promise<ConnectedSheetInfo> {
  const missingTabs: string[] = [];
  if (!info.tabs.includes(TAB_REGISTROS)) missingTabs.push(TAB_REGISTROS);
  if (!info.tabs.includes(TAB_BOLETIN)) missingTabs.push(TAB_BOLETIN);

  if (missingTabs.length > 0) {
    await fetchGoogleJson(
      `https://sheets.googleapis.com/v4/spreadsheets/${info.spreadsheetId}:batchUpdate`,
      accessToken,
      {
        method: 'POST',
        body: JSON.stringify({
          requests: missingTabs.map((title) => ({
            addSheet: { properties: { title } },
          })),
        }),
      }
    );

    if (missingTabs.includes(TAB_REGISTROS)) {
      await writeHeadersIfNeeded(
        accessToken,
        info.spreadsheetId,
        TAB_REGISTROS,
        [
          'Fecha',
          'Nombre',
          'WhatsApp o correo',
          'Categoría',
          'Nivel',
          'Plan de interés',
        ]
      );
    }

    if (missingTabs.includes(TAB_BOLETIN)) {
      await writeHeadersIfNeeded(
        accessToken,
        info.spreadsheetId,
        TAB_BOLETIN,
        ['Fecha', 'Correo electrónico', 'Origen']
      );
    }
  }

  return getSpreadsheetMetadata(accessToken, info.spreadsheetId);
}

async function writeHeadersIfNeeded(
  accessToken: string,
  spreadsheetId: string,
  tabName: string,
  headers: string[]
): Promise<void> {
  const range = encodeURIComponent(`'${tabName}'!A1`);
  await fetchGoogleJson(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`,
    accessToken,
    {
      method: 'PUT',
      body: JSON.stringify({
        values: [headers],
      }),
    }
  );
}

export async function appendRegistrosRows(
  accessToken: string,
  spreadsheetId: string,
  rows: RegistroRow[]
): Promise<void> {
  if (rows.length === 0) return;
  const range = encodeURIComponent(`'${TAB_REGISTROS}'!A1`);
  await fetchGoogleJson(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    accessToken,
    {
      method: 'POST',
      body: JSON.stringify({
        values: rows.map((r) => [
          r.fecha,
          r.nombre,
          r.contacto,
          r.categoria,
          r.nivel,
          r.plan || 'Sin especificar',
        ]),
      }),
    }
  );
}

export async function appendBoletinRows(
  accessToken: string,
  spreadsheetId: string,
  rows: BoletinRow[]
): Promise<void> {
  if (rows.length === 0) return;
  const range = encodeURIComponent(`'${TAB_BOLETIN}'!A1`);
  await fetchGoogleJson(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    accessToken,
    {
      method: 'POST',
      body: JSON.stringify({
        values: rows.map((r) => [r.fecha, r.correo, r.origen]),
      }),
    }
  );
}

export async function readSheetPreview(
  accessToken: string,
  spreadsheetId: string,
  tabName: string
): Promise<string[][]> {
  const range = encodeURIComponent(`'${tabName}'!A1:F25`);
  const data = await fetchGoogleJson<{ values?: string[][] }>(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`,
    accessToken
  );
  return data.values ?? [];
}
