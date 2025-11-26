# Creative Coding Lab

A Next.js-based creative coding playground with a clean P5.js abstraction. Subclass `P5Sketch`, override `setup()` and `draw()`, and ship visual experiments without boilerplate.

## Quick Start

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000). Build for production with `bun run build`.

## Creating a New Sketch

1. Create a directory in `app/sketches/[name]/`

2. Create your sketch class extending `P5Sketch`:

   ```typescript
   import { P5Sketch } from "@/app/components/p5-sketch/P5Sketch";
   import type p5 from "p5";

   export default class MySketch extends P5Sketch {
     protected setup(p: p5): void {
       // Initialize your sketch
     }

     protected draw(p: p5): void {
       // Draw each frame
     }
   }
   ```

3. Export it from `app/sketches/[name]/index.ts`:

   ```typescript
   export { default as MySketch } from "./MySketch";
   ```

4. Register it in `app/sketches/index.ts`:

   ```typescript
   import { MySketch } from "@/app/sketches/[name]";

   export const sketches: Sketch[] = [
     // ... existing sketches
     {
       name: "My Sketch",
       slug: "my-sketch",
       description: "What it does",
       component: MySketch,
     },
   ];
   ```

5. Add a `README.md` in your sketch directory documenting what it does and how it works.

See `app/sketches/bouncing-balls/` for a complete example.

## Project Structure

```text
app/
  components/
    p5-sketch/          # Base P5Sketch class and React wrapper
  sketches/
    [slug]/             # Dynamic route handler
    [name]/              # Individual sketch directories
      README.md          # Sketch-specific documentation
      [Name]Sketch.ts    # Your sketch class
      index.ts           # Export
```

Each sketch lives in its own directory with its own README. Keep them focused and documented.
