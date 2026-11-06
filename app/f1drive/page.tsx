import F1Drive from "@/components/F1Drive";
import Link from "next/link";

export default function F1DrivePage() {
  return (
    <main className="bg-black font-mono text-green-400">
      <div className="absolute left-4 top-4 z-10 rounded bg-black/70 px-3 py-2">
        <Link className="text-sm underline" href="/">← Back to index</Link>
      </div>
      <F1Drive />
    </main>
  );
}
