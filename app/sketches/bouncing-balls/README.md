# Bouncing Balls

A simple physics simulation of colorful spheres bouncing around the canvas. Each run generates 50-200 randomly sized spheres (10-50px) with unique colors and velocities.

## How it works

The sketch uses basic 2D physics: each sphere has a position (x, y) and velocity (vx, vy). Every frame, positions update and spheres bounce off the canvas edges by inverting their velocity. The background uses a subtle fade effect to create motion trails.

## Technical details

- Spheres are randomly initialized with positions, velocities (-3 to 3), sizes, and RGB colors (100-255 range)
- Edge collision detection uses size-based boundary checking with position constraints
- The fade effect is achieved by drawing a semi-transparent dark background each frame instead of clearing completely

## Visual style

Dark background with vibrant, saturated spheres that leave subtle trails as they move. The randomness in count, size, and color creates a different composition each time the sketch loads.
