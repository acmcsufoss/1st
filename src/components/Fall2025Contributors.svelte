<script lang="ts">
  import type { ContributorMarkdownEntry } from "../types";
  import CPUGrid from "./CPUGrid.svelte";
  import ContributorPopup from "./ContributorPopup.svelte";
  import Contributors from "./Contributors.svelte";

  export let contributors: ContributorMarkdownEntry[];

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

<CPUGrid {contributors} {openContributorDialog} />

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
