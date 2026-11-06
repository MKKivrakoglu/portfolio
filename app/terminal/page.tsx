import Terminal from "@/components/Terminal";
import Link from "next/link";

export default function TerminalPage() {
  return (
    <main className="min-h-screen w-screen border-amber-50">
      <div className="p-6">
        <Link className="text-sm text-green-700 underline" href="/">← Back to index</Link>
      </div>
      <Terminal />
    </main>
  );
}
