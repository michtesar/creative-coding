import type p5 from "p5";
import { P5Sketch } from "@/app/components/p5-sketch/P5Sketch";

/**
 * Polygon with independently moving vertices used by the Mystify sketch.
 */
export class Polygon {
	vertices: p5.Vector[];
	vertexVelocities: p5.Vector[];
	color!: p5.Color;
	strokeWeight!: number;

	constructor(p: p5, strokeWeight: number, color: p5.Color = p.color(255)) {
		this.vertices = [];
		this.vertexVelocities = [];
		this.color = color;
		this.strokeWeight = strokeWeight;
	}

	/**
	 * Draws the polygon on the provided p5 instance.
	 */
	draw(p: p5): void {
		p.noFill();
		p.stroke(this.color);
		p.strokeWeight(this.strokeWeight);
		p.beginShape();
		for (const vertex of this.vertices) {
			p.vertex(vertex.x, vertex.y);
		}
		p.endShape(p.CLOSE);
	}

	/**
	 * Updates each vertex position independently and bounces off canvas edges.
	 */
	update(p: p5): void {
		for (let i = 0; i < this.vertices.length; i++) {
			const vertex = this.vertices[i];
			const velocity = this.vertexVelocities[i];

			vertex.add(velocity);

			if (vertex.x < 0 || vertex.x > p.width) {
				velocity.x *= -1;
				// Clamp back inside the canvas to avoid getting stuck.
				vertex.x = p.constrain(vertex.x, 0, p.width);
			}
			if (vertex.y < 0 || vertex.y > p.height) {
				velocity.y *= -1;
				vertex.y = p.constrain(vertex.y, 0, p.height);
			}
		}
	}
}

/**
 * Mystify sketch class that extends P5Sketch.
 * Creates a vintage screen saver from the 1980s.
 */
export default class MystifySketch extends P5Sketch {
	private polygons: Polygon[] = [];
	private numPolygons = 1;
	private numVertices = 4;
	private maxVelocity = 5;
	private minVelocity = -5;
	private strokeWeight = 1;

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
	 */
	protected draw(p: p5): void {
		p.background(10);
		for (const polygon of this.polygons) {
			polygon.draw(p);
			polygon.update(p);
		}
	}
}
