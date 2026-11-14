interface ConfirmActionModalProps {
  open: boolean;
  title: string;
  description: string;
  details?: string[];
  confirmLabel?: string;
  cancelLabel?: string;
  isBusy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmActionModal({
  open,
  title,
  description,
  details = [],
  confirmLabel = 'Confirmar y guardar',
  cancelLabel = 'Cancelar',
  isBusy = false,
  onConfirm,
  onCancel,
}: ConfirmActionModalProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-sheet-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-md rounded-sm border border-white/15 bg-[#141417] p-6 text-[#F4F1EA]">
        <p className="text-xs font-bold tracking-[0.14em] text-[#FF1E6E] uppercase">
          Confirmación · Google Sheets
        </p>
        <h3
          id="confirm-sheet-title"
          className="mt-2 font-display text-3xl font-extrabold tracking-tight uppercase"
        >
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#D4D4D8]">
          {description}
        </p>

        {details.length > 0 && (
          <ul className="mt-4 space-y-1.5 rounded-sm border border-white/10 bg-[#0D0D0F] p-3.5 text-xs text-[#A1A1AA]">
            {details.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            disabled={isBusy}
            onClick={onCancel}
            className="cursor-pointer rounded-sm border border-white/20 px-4 py-2.5 text-xs font-semibold text-[#F4F1EA] transition-colors hover:border-white/40 disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            disabled={isBusy}
            onClick={onConfirm}
            className="cursor-pointer rounded-sm bg-[#FF1E6E] px-5 py-2.5 text-xs font-bold text-[#0D0D0F] transition-colors hover:bg-[#ff3b81] disabled:opacity-50"
          >
            {isBusy ? 'Guardando...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
