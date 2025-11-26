import Link from "next/link";
import { sketches } from "@/app/sketches";

/**
 * Home page displaying all available sketches in an elegant grid layout.
 */
export default function Home() {
	const sketchUrl = (slug: string) => `/sketches/${slug}`;

	return (
		<div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="mb-12 text-center">
					<h1 className="mb-4 text-5xl font-bold text-zinc-900 dark:text-zinc-100">
						Creative Coding Sketches
					</h1>
					<p className="text-lg text-zinc-600 dark:text-zinc-400">
						Explore interactive p5.js sketches and visual experiments
					</p>
				</div>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{sketches.map((sketch) => (
						<Link
							key={sketch.slug}
							href={sketchUrl(sketch.slug)}
							className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
						>
							<div className="mb-3">
								<h2 className="text-xl font-semibold text-zinc-900 transition-colors group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-300">
									{sketch.name}
								</h2>
							</div>
							<p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
								{sketch.description}
							</p>
							<div className="flex items-center text-sm font-medium text-zinc-500 transition-colors group-hover:text-zinc-700 dark:text-zinc-500 dark:group-hover:text-zinc-300">
								<span>View sketch</span>
								<svg
									className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
