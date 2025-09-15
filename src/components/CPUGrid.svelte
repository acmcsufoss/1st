<script lang="ts">
  import type { ContributorMarkdownEntry } from "../types";
  import { Canvas } from "@threlte/core";
  import Starfield from "./Starfield.svelte";
  import ContributorPopup from "./ContributorPopup.svelte";
  import ContributorScene from "./ContributorScene.svelte";
  import Contributors from "./Contributors.svelte";

  export let contributors: ContributorMarkdownEntry[];

  let isContributorDialogOpen = false;
  let contributorIndex = 0;

  const pinDefaultColor = [194, 164, 20]
  const pinColors = [
    [232, 16, 34],
    [179, 243, 16],
    [68, 249, 84],
    [151, 253, 255],
    [60, 42, 252],
    [146, 18, 214],
    [242, 92, 237],
    [254, 44, 194],
  ];

  function openContributorDialog(i: number) {
    contributorIndex = i;
    isContributorDialogOpen = true;
  }

  $: contributor = contributors[contributorIndex];
</script>

{#key contributorIndex}
  <ContributorPopup bind:contributor bind:isOpen={isContributorDialogOpen} />
{/key}

<Starfield />

<div class="canvas-wrapper">
  <Canvas>
    <ContributorScene {contributors} {openContributorDialog} />
  </Canvas>
</div>

<div class="contributors-grid">
  <h2>List Of Contributors</h2>
  <Contributors {contributors} />
</div>

<style>
  .canvas-wrapper {
    width: 95%;
    margin-inline: auto;
  }

  .contributors-grid {
    width: min(1280px, 100%);
    margin-inline: auto;
    margin-top: 3rem;
  }

  .contributors-grid > h2 {
    text-align: center;
  }
</style>
