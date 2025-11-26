import type p5 from "p5";
import { P5Sketch } from "@/app/components/p5-sketch/P5Sketch";

/**
 * Mystify sketch class that extends P5Sketch.
 * Creates a vintage screen saver from the 1980s.
 */
export default class MystifySketch extends P5Sketch {
	protected setup(p: p5): void {
		p.background(10);
		p.noStroke();
	}

	protected draw(p: p5): void {
		p.background(10);
		p.fill(255, 0, 0);
		p.circle(p.mouseX, p.mouseY, 100);
	}
}
