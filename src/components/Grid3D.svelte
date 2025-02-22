<script lang="ts">
  import type { Fa2024MarkdownEntry } from "../types";
  import { Canvas } from "@threlte/core";
  import ContributorPopup from "./ContributorPopup.svelte";
  import Starfield from "./Starfield.svelte";
  import Scene from "./Scene.svelte";

  export let contributors: Fa2024MarkdownEntry[];

  let isContributorDialogOpen = false;
  let contributorIndex = 0;

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
    <Scene {contributors} {openContributorDialog} />
  </Canvas>
</div>

<style>
  .canvas-wrapper {
    width: 95%;
    margin-inline: auto;
  }
</style>
