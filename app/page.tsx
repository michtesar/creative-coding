"use client";

import Sketch from "@/app/components/p5-sketch/P5Sketch";
import { BouncingBallSketch } from "@/app/sketches/bouncing-balls";

export default function Home() {
	console.log("[Home] Component rendering");
	return (
		<div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
			<div className="w-full h-screen">
				<Sketch sketchClass={BouncingBallSketch} />
			</div>
		</div>
	);
}
