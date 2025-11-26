import type p5 from "p5";
import { P5Sketch } from "@/app/components/p5-sketch/P5Sketch";
import type { Sphere } from "./types";

/**
 * Bouncing ball sketch class that extends P5Sketch.
 * Creates 50-200 randomly sized and colored spheres that bounce around the screen.
 */
export default class BouncingBallSketch extends P5Sketch {
	private spheres: Sphere[] = [];

	protected setup(p: p5): void {
		console.log("[BouncingBallSketch] setup() called", {
			width: p.width,
			height: p.height,
		});
		p.background(10); // Dark background to match dark theme
		p.noStroke();

		// Create random number of spheres between 50 and 200
		const numSpheres = Math.floor(p.random(50, 201));
		console.log("[BouncingBallSketch] Creating", numSpheres, "spheres");
		this.spheres = [];

		for (let i = 0; i < numSpheres; i++) {
			const size = p.random(10, 50);
			this.spheres.push({
				x: p.random(size, p.width - size),
				y: p.random(size, p.height - size),
				vx: p.random(-3, 3),
				vy: p.random(-3, 3),
				size: size,
				color: {
					r: p.random(100, 255),
					g: p.random(100, 255),
					b: p.random(100, 255),
				},
			});
		}
		console.log("[BouncingBallSketch] Setup complete");
	}

	protected draw(p: p5): void {
		// Log first few draw calls to verify it's running
		if (p.frameCount <= 3) {
			console.log(`[BouncingBallSketch] draw() called (frame ${p.frameCount})`);
		}

		// Clear with slight fade for trail effect
		p.background(10, 10, 10, 25);

		// Update and draw each sphere
		for (const sphere of this.spheres) {
			// Update position
			sphere.x += sphere.vx;
			sphere.y += sphere.vy;

			// Bounce off edges
			if (
				sphere.x <= sphere.size / 2 ||
				sphere.x >= p.width - sphere.size / 2
			) {
				sphere.vx *= -1;
				sphere.x = p.constrain(
					sphere.x,
					sphere.size / 2,
					p.width - sphere.size / 2,
				);
			}
			if (
				sphere.y <= sphere.size / 2 ||
				sphere.y >= p.height - sphere.size / 2
			) {
				sphere.vy *= -1;
				sphere.y = p.constrain(
					sphere.y,
					sphere.size / 2,
					p.height - sphere.size / 2,
				);
			}

			// Draw sphere
			p.fill(sphere.color.r, sphere.color.g, sphere.color.b);
			p.ellipse(sphere.x, sphere.y, sphere.size, sphere.size);
		}
	}
}
