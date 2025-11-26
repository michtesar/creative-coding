"use client";

import type p5 from "p5";
import { useEffect, useRef } from "react";

/**
 * Base p5 sketch class that handles canvas creation and resizing.
 * Extend this class and override setup() and draw() methods.
 */
export class P5Sketch {
	private p5Instance: p5 | null = null;
	private containerRef: React.RefObject<HTMLDivElement | null>;
	private resizeObserver: ResizeObserver | null = null;

	constructor(containerRef: React.RefObject<HTMLDivElement | null>) {
		this.containerRef = containerRef;
	}

	/**
	 * Initialize the p5 sketch instance.
	 */
	public async init(): Promise<void> {
		console.log("[P5Sketch] init() called");
		if (!this.containerRef.current) {
			console.warn("[P5Sketch] Container ref is null in init()");
			return;
		}

		console.log("[P5Sketch] Waiting for container dimensions...");
		// Wait for container to have dimensions
		await this.waitForContainerDimensions();

		if (!this.containerRef.current) {
			console.warn(
				"[P5Sketch] Container ref is null after waiting for dimensions",
			);
			return;
		}

		console.log("[P5Sketch] Importing p5 module...");
		// Dynamically import p5 only on the client side
		const p5Module = await import("p5");
		const p5 = p5Module.default;
		console.log("[P5Sketch] p5 module imported successfully");

		const container = this.containerRef.current;

		// Get initial dimensions
		const initialWidth = container.clientWidth || 800;
		const initialHeight = container.clientHeight || 600;
		console.log("[P5Sketch] Initial dimensions:", {
			width: initialWidth,
			height: initialHeight,
		});

		console.log("[P5Sketch] Creating p5 instance...");
		this.p5Instance = new p5((p: p5) => {
			// Setup function - called once
			p.setup = () => {
				console.log("[P5Sketch] p5.setup() called");
				// Use container dimensions, fallback to initial dimensions
				const width = this.containerRef.current?.clientWidth || initialWidth;
				const height = this.containerRef.current?.clientHeight || initialHeight;
				console.log("[P5Sketch] Creating canvas with dimensions:", {
					width,
					height,
				});
				p.createCanvas(width, height);
				console.log("[P5Sketch] Calling this.setup()");
				this.setup(p);
			};

			// Draw function - called continuously
			p.draw = () => {
				this.draw(p);
			};

			// Handle window resize
			p.windowResized = () => {
				if (this.containerRef.current) {
					this.handleResize(p, this.containerRef.current);
				}
			};
		}, container);

		console.log("[P5Sketch] p5 instance created, setting up ResizeObserver");
		// Set up ResizeObserver to handle container size changes
		this.resizeObserver = new ResizeObserver(() => {
			if (this.p5Instance && this.containerRef.current) {
				this.handleResize(this.p5Instance, this.containerRef.current);
			}
		});

		this.resizeObserver.observe(container);
		console.log("[P5Sketch] Initialization complete");
	}

	/**
	 * Wait for the container to have valid dimensions.
	 */
	private waitForContainerDimensions(): Promise<void> {
		return new Promise((resolve) => {
			let attempts = 0;
			const maxAttempts = 100; // ~1.6 seconds at 60fps

			const checkDimensions = () => {
				attempts++;
				const hasContainer = !!this.containerRef.current;
				const width = this.containerRef.current?.clientWidth ?? 0;
				const height = this.containerRef.current?.clientHeight ?? 0;

				if (attempts % 10 === 0) {
					console.log(
						`[P5Sketch] Waiting for dimensions (attempt ${attempts}/${maxAttempts}):`,
						{
							hasContainer,
							width,
							height,
						},
					);
				}

				if (
					this.containerRef.current &&
					this.containerRef.current.clientWidth > 0 &&
					this.containerRef.current.clientHeight > 0
				) {
					console.log("[P5Sketch] Container dimensions available:", {
						width: this.containerRef.current.clientWidth,
						height: this.containerRef.current.clientHeight,
					});
					resolve();
				} else if (attempts >= maxAttempts) {
					// Fallback: use window dimensions if container never gets size
					console.warn(
						"[P5Sketch] Container dimensions not available after max attempts, using window dimensions",
					);
					resolve();
				} else {
					// Use requestAnimationFrame to wait for next frame
					requestAnimationFrame(checkDimensions);
				}
			};
			checkDimensions();
		});
	}

	/**
	 * Clean up the p5 instance and observers.
	 */
	public destroy(): void {
		if (this.resizeObserver) {
			this.resizeObserver.disconnect();
			this.resizeObserver = null;
		}

		if (this.p5Instance) {
			this.p5Instance.remove();
			this.p5Instance = null;
		}
	}

	/**
	 * Handle canvas resize to match container dimensions.
	 */
	private handleResize(p: p5, container: HTMLDivElement): void {
		const width = container.clientWidth;
		const height = container.clientHeight;
		p.resizeCanvas(width, height);
	}

	/**
	 * Override this method in your subclass to set up the sketch.
	 * @param p - The p5 instance
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected setup(_p: p5): void {
		// Override in subclass
	}

	/**
	 * Override this method in your subclass to draw each frame.
	 * @param p - The p5 instance
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected draw(_p: p5): void {
		// Override in subclass
	}
}

/**
 * React component wrapper for P5Sketch.
 * Pass a class that extends P5Sketch as a prop.
 */
interface SketchProps {
	sketchClass: new (
		containerRef: React.RefObject<HTMLDivElement | null>,
	) => P5Sketch;
	className?: string;
}

/**
 * React component that renders a p5 sketch.
 * @param sketchClass - A class that extends P5Sketch
 * @param className - Optional CSS classes for the container div
 */
export default function Sketch({ sketchClass, className = "" }: SketchProps) {
	console.log("[Sketch] Component rendering", { sketchClass, className });
	const containerRef = useRef<HTMLDivElement>(null);
	const sketchRef = useRef<P5Sketch | null>(null);

	useEffect(() => {
		console.log("[Sketch] useEffect running", {
			hasContainerRef: !!containerRef.current,
			containerDimensions: containerRef.current
				? {
						width: containerRef.current.clientWidth,
						height: containerRef.current.clientHeight,
					}
				: null,
		});

		if (!containerRef.current) {
			console.warn("[Sketch] Container ref is null, skipping initialization");
			return;
		}

		console.log("[Sketch] Creating sketch instance");
		// Create sketch instance
		sketchRef.current = new sketchClass(containerRef);
		console.log("[Sketch] Calling init()");
		sketchRef.current.init().catch((error) => {
			console.error("[Sketch] Failed to initialize p5 sketch:", error);
		});

		// Cleanup on unmount
		return () => {
			console.log("[Sketch] Cleanup: destroying sketch");
			if (sketchRef.current) {
				sketchRef.current.destroy();
				sketchRef.current = null;
			}
		};
	}, [sketchClass]);

	console.log("[Sketch] Rendering container div");
	return (
		<div
			ref={containerRef}
			className={className}
			style={{
				width: "100%",
				height: "100%",
				minWidth: "1px",
				minHeight: "1px",
			}}
		/>
	);
}
