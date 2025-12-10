import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-white flex flex-col items-center justify-center h-[70vh]">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="mb-4">Page not found.</p>
      <Link
        to="/"
        className="px-4 py-2 rounded-xl bg-cyan-500/80 text-slate-900 font-semibold"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
