<script lang="ts">
  import type { ContributorMarkdownEntry } from "../../types";
  import RocketShip from "./RocketShip.svelte";

  export let contributors: ContributorMarkdownEntry[] = [];
  export let openContributorDialog: (i: number) => void;

  // Repeat the full list until we have at least four rockets: no long empty gaps.
  $: copies = Math.ceil(4 / (contributors.length || 1));
  $: rockets = Array.from({ length: copies }, () => contributors).flat().map((contributor) => ({
    contributor,
    offset: Math.round(Math.random() * 280 - 140),
  }));
</script>

<div
  class="rocket-field"
  style:--duration={`${rockets.length * 6}s`}
  style:--end={`${rockets.length * 450 - 900}px`}
>
  {#each rockets as { contributor, offset }, i}
    <!--  
    For the sake of collision, each rocket has its own slot 
    Each slot controls the offset of where the rocket is
    and the speed at which it flies across the screen.
    -->
    <button
      class="rocket-slot"
      type="button"
      aria-label={`Open ${contributor.frontmatter.name}`}
      style:--offset={`${offset}px`}
      style:animation-delay={`${-i * 4}s`}
      on:click={() => openContributorDialog(i % contributors.length)}
    >
      <svg class="border" viewBox="0 0 400 400" aria-hidden="true">
        <polyline points="400,0 0,0 0,400 400,400, 400,0" class="bg-line" />
        <polyline points="400,0 0,0 0,400 400,400, 400,0 0,0" class="hl-line" />
      </svg>
      <RocketShip
        middleImageSrc={`https://github.com/${contributor.frontmatter.githubUsername}.png`}
        middleImageAlt={contributor.frontmatter.name}
        buttonLabel={`Open ${contributor.frontmatter.name}`}
        rotation={45}
        interactive={false}
      />
    </button>
  {/each}
</div>

<style>
  .rocket-field {
    position: relative;
    width: min(1472px, 100%);
    height: 760px;
    margin: 0 auto;
    overflow: hidden;
  }

  .rocket-slot {
    position: absolute;
    left: calc(50% + var(--offset));
    top: calc(50% + var(--offset));
    width: 400px;
    height: 400px;
    display: grid;
    place-items: center;
    margin-left: -200px;
    margin-top: -200px;
    border: 0;
    padding: 0;
    background: transparent;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    animation: fly var(--duration) linear infinite;
  }

  .rocket-slot:hover,
  .rocket-slot:focus-visible {
    background: rgb(79 149 218 / 20%);
  }

  .border {
    position: absolute;
    z-index: 4;
    inset: 0;
    width: 100%;
    height: 100%;
    fill: none;
    pointer-events: none;
    stroke: white;
    stroke-width: 3;
  }

  .bg-line {
    opacity: 0;
  }


  .rocket-slot:hover .bg-line,
  .rocket-slot:focus-visible .bg-line {
    opacity: 0.25;
    transition: opacity 0.25s ease-in-out;
  }

  .hl-line {
    opacity: 0;
    stroke-dasharray: 200 500;
    transition: stroke-dashoffset 0.5s ease-in-out, opacity 0.1s ease-in-out;
  }

  .rocket-slot:hover .hl-line,
  .rocket-slot:focus-visible .hl-line {
    opacity: 1;
    stroke-dashoffset: -700px;
  }

  .rocket-slot:focus-visible {
    outline: 3px solid white;
    outline-offset: 6px;
  }

  @keyframes fly {
    from {
      transform: translate(-900px, 900px);
    }
    to {
      transform: translate(var(--end), calc(-1 * var(--end)));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .rocket-field {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 120px;
      height: auto;
      padding-block: 100px;
    }

    .rocket-slot {
      position: static;
      margin: 0;
      animation: none;
    }
  }
</style>
