import { useLoading } from "../context/LoadingContext";

export default function GlobalLoader() {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="h-12 w-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
