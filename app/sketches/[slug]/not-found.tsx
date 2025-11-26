import Link from "next/link";

/**
 * 404 page for invalid sketch slugs.
 */
export default function NotFound() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<div className="text-center">
				<h1 className="mb-4 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
					Sketch Not Found
				</h1>
				<p className="mb-8 text-zinc-600 dark:text-zinc-400">
					The sketch you&apos;re looking for doesn&apos;t exist.
				</p>
				<Link
					href="/"
					className="rounded-lg bg-zinc-900 px-6 py-3 text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
				>
					Back to Sketches
				</Link>
			</div>
		</div>
	);
}
