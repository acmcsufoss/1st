<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./Scene.svelte";
  import type { Fa2024MarkdownEntry } from "../types";
  import ContributorPopup from "./ContributorPopup.svelte";

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

<div class="canvas-wrapper">
  <Canvas>
    <Scene {contributors} {openContributorDialog} />
  </Canvas>
</div>
