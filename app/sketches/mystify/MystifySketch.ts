import type p5 from "p5";
import { P5Sketch } from "@/app/components/p5-sketch/P5Sketch";
import { Polygon } from "./polygon";



/**
 * Mystify sketch class that extends P5Sketch.
 * Creates a vintage screen saver from the 1980s.
 */
export default class MystifySketch extends P5Sketch {
	private polygons: Polygon[] = [];
	private numPolygons = 2;
	private numVertices = 4;
	private maxVelocity = 5;
	private minVelocity = -5;
	private strokeWeight = 1;
	private trailAlpha = 10;

	/**
	 * Sets up the Mystify sketch with one or more polygons and moving vertices.
	 */
	protected setup(p: p5): void {
		p.background(10);
		this.polygons = [];
		for (let i = 0; i < this.numPolygons; i++) {
			const polygon = new Polygon(p, this.strokeWeight);
			for (let j = 0; j < this.numVertices; j++) {
				const vertex = p.createVector(
					p.random(0, p.width),
					p.random(0, p.height),
				);
				polygon.vertices.push(vertex);
				const velocity = p.createVector(
					p.random(this.minVelocity, this.maxVelocity),
					p.random(this.minVelocity, this.maxVelocity),
				);
				polygon.vertexVelocities.push(velocity);
			}
			this.polygons.push(polygon);
		}
	}

	/**
	 * Draws and updates the animation on each frame.
	 * Uses a semi-transparent overlay to create a fading trail effect.
	 */
	protected draw(p: p5): void {
		// Draw a semi-transparent rectangle over the entire canvas to create the trail effect
		p.fill(10, this.trailAlpha);
		p.noStroke();
		p.rect(0, 0, p.width, p.height);

		// Draw and update all polygons
		for (const polygon of this.polygons) {
			polygon.draw(p);
			polygon.update(p);
		}
	}
}
