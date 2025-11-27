# Mystify

A recreation of the classic Windows screensaver from the 1980s. Features colorful polygons with independently moving vertices that bounce off the canvas edges, creating mesmerizing geometric patterns with trailing effects.

## How it works

The sketch creates multiple polygons (default: 2) with 4 vertices each. Each vertex moves independently with a random velocity, creating constantly morphing shapes. When vertices hit the canvas edges, they bounce by inverting their velocity. A semi-transparent overlay is drawn each frame to create the signature trailing effect that gives the classic screensaver its distinctive look.

## Technical details

- Each polygon has 4 vertices that move independently with velocities ranging from -5 to 5
- Vertices are randomly positioned on initialization
- Edge collision detection inverts velocity and constrains position to prevent vertices from getting stuck outside the canvas
- The trail effect is achieved by drawing a semi-transparent dark rectangle (alpha: 10) over the entire canvas each frame
- Each polygon is assigned a random color with RGB values between 100-255
- Stroke weight is set to 1 for clean, crisp lines

## Visual style

Dark background (RGB: 10) with vibrant, colorful polygons that leave smooth trailing effects as they morph. The constantly changing shapes create an abstract, hypnotic visual pattern reminiscent of the original Windows screensaver.
