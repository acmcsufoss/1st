<script lang="ts">
  import type { ContributorMarkdownEntry } from "../../types";
  import RocketField from "./RocketField.svelte";
  import RocketDashboard from "./RocketDashboard.svelte";
  import Contributors from "../Contributors.svelte";

  export let contributors: ContributorMarkdownEntry[];

  let selectedContributor = -1;
  let scene: HTMLDivElement;
  let dashboard: HTMLDivElement;

  // Heres a cool function! Basically this tracks the rockets and draws a line
  // between the selected rocket and the dashboard until the rocket is unmounted.
  // Unmounting happens when the component is no longer rendered on the screen
  // (and removed from the DOM tree etc etc..)
  function trackRocket(line: SVGLineElement) {
    let frame: number;

    function update() {
      line.style.visibility = "hidden";
      const field = scene?.querySelector(".rocket-field");
      const panel = dashboard?.querySelector(".dashboard");

      if (field && panel) {
        const fieldBox = field.getBoundingClientRect();
        const sceneBox = scene.getBoundingClientRect();
        const dashboardBox = panel.getBoundingClientRect();
        const selector = `[data-contributor-index="${selectedContributor}"]`;
        const rockets = field.querySelectorAll(selector);

        for (const rocket of rockets) {
          const box = rocket.getBoundingClientRect();
          const x = box.left + box.width / 2;
          const y = box.top + box.height / 2;

          // Only connect when the rocket's center is inside the visible field.
          if (x < Math.max(fieldBox.left, 0) || x > Math.min(fieldBox.right, window.innerWidth) ||
              y < Math.max(fieldBox.top, 0) || y > Math.min(fieldBox.bottom, window.innerHeight)) continue;

          line.setAttribute("x1", String(dashboardBox.left + dashboardBox.width / 2 - sceneBox.left));
          line.setAttribute("y1", String(dashboardBox.top - sceneBox.top));
          line.setAttribute("x2", String(x - sceneBox.left));
          line.setAttribute("y2", String(y - sceneBox.top));
          line.style.visibility = "visible";
          break;
        }
      }

      frame = requestAnimationFrame(update);
    }

    frame = requestAnimationFrame(update);
    return { destroy: () => cancelAnimationFrame(frame) };
  }

  function openContributorDialog(i: number) {
    selectedContributor = i;
  }

  $: contributor = contributors[selectedContributor];
</script>

<svelte:window on:click|capture={(event) => {
  if (!(event.target instanceof Element) || !event.target.closest(".dashboard")) {
    selectedContributor = -1;
  }
}} />

<div class="rocket-scene" bind:this={scene}>
  <RocketField {contributors} {openContributorDialog} bind:selectedContributor />
  <div class="dashboard-dock" bind:this={dashboard}>
    <RocketDashboard
      {contributor}
      queuePosition={selectedContributor}
      contributorCount={contributors.length}
    />
  </div>
  {#if contributor}
    <svg class="connector" aria-hidden="true">
      <line use:trackRocket />
    </svg>
  {/if}
</div>
<div class="contributors-grid">
  <h2>List Of Contributors</h2>
  <Contributors
    {contributors}
    selectContributor={openContributorDialog}
  />
</div>

<style>
  .rocket-scene {
    position: relative;
    isolation: isolate;
  }

  .dashboard-dock {
    position: relative;
    z-index: 6;
  }

  .connector {
    position: absolute;
    z-index: 5; 
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .connector line {
    visibility: hidden;
    stroke: rgb(17 212 177);
    stroke-width: 2;
    stroke-dasharray: 8 6;
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
