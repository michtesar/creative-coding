import type { P5Sketch } from "@/app/components/p5-sketch/P5Sketch";
import { BouncingBallSketch } from "@/app/sketches/bouncing-balls";
import { MystifySketch } from "@/app/sketches/mystify";

interface Sketch {
	name: string;
	slug: string;
	description: string;
	component: new (
		containerRef: React.RefObject<HTMLDivElement | null>,
	) => P5Sketch;
}

export const sketches: Sketch[] = [
	{
		name: "Bouncing Balls",
		slug: "bouncing-balls",
		description:
			"A simple physics simulation of colorful spheres bouncing around the canvas.",
		component: BouncingBallSketch,
	},
	{
		name: "Mystify",
		slug: "mystify",
		description: "A vintage screen saver from the 1980s.",
		component: MystifySketch,
	},
];
