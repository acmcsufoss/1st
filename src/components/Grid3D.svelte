<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./Scene.svelte";

  export let contributors;
</script>

<div class="canvas-wrapper">
  <Canvas>
    <Scene {contributors} />
  </Canvas>
</div>

<style>
  .canvas-wrapper {
    max-width: 1280px;
    height: 700px;
    margin: auto;
  }
</style>
