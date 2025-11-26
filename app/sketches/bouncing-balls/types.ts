/**
 * Represents a bouncing sphere with position, velocity, size, and color.
 */
export interface Sphere {
	x: number;
	y: number;
	vx: number;
	vy: number;
	size: number;
	color: { r: number; g: number; b: number };
}
