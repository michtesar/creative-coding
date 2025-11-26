"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import Sketch from "@/app/components/p5-sketch/P5Sketch";
import { sketches } from "@/app/sketches";

interface SketchPageProps {
	params: Promise<{
		slug: string;
	}>;
}

/**
 * Individual sketch page component.
 * Renders a sketch based on the slug parameter from the URL.
 */
export default function SketchPage({ params }: SketchPageProps) {
	const { slug } = use(params);
	const sketch = sketches.find((sketch) => sketch.slug === slug);

	if (!sketch) {
		notFound();
	}

	return (
		<div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
			<div className="w-full h-screen">
				<Sketch sketchClass={sketch.component} />
			</div>
		</div>
	);
}
