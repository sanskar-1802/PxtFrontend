export default function ConfirmModal({ show, onClose, onConfirm, message }) {
  if (!show) return null;

  return (
    <div className="
      fixed inset-0 flex items-center justify-center
      bg-black/60 backdrop-blur-md z-50
    ">
      <div className="
        bg-white/10 border border-white/20 rounded-2xl
        p-6 w-[90%] max-w-md text-white
        shadow-[0_0_40px_rgba(0,255,255,.3)]
      ">

        <h2 className="text-2xl font-bold mb-2 text-cyan-300">
          Are you sure?
        </h2>

        <p className="opacity-80 mb-6">
          {message || "This action cannot be undone."}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-lg
              bg-white/10 border border-white/20
              hover:bg-white/20 transition
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
              px-4 py-2 rounded-lg
              bg-gradient-to-r from-red-400 to-rose-500
              text-black font-bold hover:opacity-90
            "
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}
