<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { cubicIn } from "svelte/easing";

  export let speedFactor = 0.03;
  export let backgroundColor = "black";

  const starColors = [
    [17, 212, 177],
    [21, 114, 97],
    [18, 132, 138],
  ];

  export let starCount = 3000;

  let canvas: HTMLCanvasElement;

  onMount(() => {
    if (!canvas) return;
    const c = canvas.getContext("2d");
    if (!c) {
      console.error("Could not get 2d context from canvas element");
      return;
    }

    let w = window.innerWidth;
    let h = window.innerHeight;

    const setCanvasExtents = () => {
      canvas.width = w;
      canvas.height = h;
    };

    setCanvasExtents();
    window.addEventListener("resize", () => {
      w = window.innerWidth;
      h = window.innerHeight;
      setCanvasExtents();
    });

    const makeStars = (count: number) => {
      return Array.from({ length: count }, () => ({
        x: Math.random() * 1600 - 800,
        y: Math.random() * 900 - 450,
        z: Math.random() * 1000,
      }));
    };

    let stars = makeStars(starCount);

    const clear = () => {
      c.fillStyle = backgroundColor;
      c.fillRect(0, 0, canvas.width, canvas.height);
    };

    const putPixel = (x: number, y: number, brightness: number) => {
      const starColor =
        starColors[Math.floor(Math.random() * starColors.length)];
      c.fillStyle = `rgba(${starColor[0]}, ${starColor[1]}, ${starColor[2]}, ${brightness})`;
      c.fillRect(x, y, 1.4, 1.4);
    };

    const moveStars = (distance: number) => {
      for (let star of stars) {
        star.z -= distance;
        if (star.z <= 1) star.z += 1000;
      }
    };

    let prevTime: number;
    const tick = (time: number) => {
      if (!prevTime) prevTime = time;
      let elapsed = time - prevTime;
      prevTime = time;

      moveStars(elapsed * speedFactor);
      clear();

      const cx = w / 2;
      const cy = h / 2;

      for (let star of stars) {
        const x = cx + star.x / (star.z * 0.001);
        const y = cy + star.y / (star.z * 0.001);
        if (x < 0 || x >= w || y < 0 || y >= h) continue;
        const d = star.z / 1000.0;
        putPixel(x, y, 1 - d * d * d);
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);

    onDestroy(() => {
      window.removeEventListener("resize", setCanvasExtents);
    });
  });
</script>

<canvas
  bind:this={canvas}
  transition:fade={{ delay: 500, duration: 1000, easing: cubicIn }}
  style="
    padding: 0;
    margin: 0;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    opacity: 1;
    pointer-events: none;
    mix-blend-mode: screen;
  "
></canvas>
