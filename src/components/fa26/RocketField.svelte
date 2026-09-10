<script lang="ts">
  import type { ContributorMarkdownEntry } from "../../types";
  import RocketShip from "./RocketShip.svelte";

  export let contributors: ContributorMarkdownEntry[] = [];
  export let openContributorDialog: (i: number) => void;

  export let selectedContributor = -1;

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
  <div class="space-background" aria-hidden="true"></div>
  <div class="field-rail top-rail" aria-hidden="true"></div>
  <div class="field-rail bottom-rail" aria-hidden="true"></div>

  {#each rockets as { contributor, offset }, i}
    <!--  
    For the sake of collision, each rocket has its own slot 
    Each slot controls the offset of where the rocket is
    and the speed at which it flies across the screen.
    -->
    <button
      class="rocket-slot"
      data-contributor-index={i % contributors.length}
      class:selected={selectedContributor === i % contributors.length}
      aria-pressed={selectedContributor === i % contributors.length}
      type="button"
      aria-label={`Open ${contributor.frontmatter.name}`}
      style:--offset={`${offset}px`}
      style:animation-delay={`${-i * 6}s`}
      on:click|stopPropagation={() => {
        selectedContributor = i % contributors.length;
        openContributorDialog(i % contributors.length);
      }}
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

  .rocket-field::after {
    content: "";
    position: absolute;
    z-index: 4;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(to bottom, rgb(var(--color-primary)), transparent 140px),
      linear-gradient(to top, rgb(var(--color-primary)), transparent 140px),
      linear-gradient(to right, rgb(var(--color-primary)), transparent min(140px, 20%)),
      linear-gradient(to left, rgb(var(--color-primary)), transparent min(140px, 20%));
  }

  .space-background {
    position: absolute;
    z-index: 0;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(ellipse at 55% 45%, #201333, #080912 65%, #000);
    mask-image: linear-gradient(to bottom, transparent, black 12% 88%, transparent),
      linear-gradient(to right, transparent, black 10% 90%, transparent);
    mask-composite: intersect;
  }

  .space-background::before,
  .space-background::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 25px 43px, #e7dcff 1px, transparent 1.5px) 0 0 / 173px 191px,
      radial-gradient(circle at 110px 80px, #a4c8dc 0.7px, transparent 1.2px) 0 0 / 251px 137px;
    opacity: 0.4;
    animation: twinkle 5s ease-in-out infinite alternate;
  }

  .space-background::after {
    background-position: 83px 57px, 41px 113px;
    animation-delay: -3s;
    animation-duration: 7s;
  }

  .field-rail {
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    height: 36px;
    pointer-events: none;
    background:
      linear-gradient(to bottom, transparent, rgb(17 212 177 / 45%) 48% 52%, transparent),
      repeating-linear-gradient(to right, transparent 0 39px, rgb(17 212 177 / 20%) 39px 40px);
    mask-image: linear-gradient(to right, transparent, black 20% 80%, transparent),
      linear-gradient(to bottom, transparent, black 35% 65%, transparent);
    mask-composite: intersect;
  }

  .top-rail { top: 0; }
  .bottom-rail { bottom: 0; }

  @keyframes twinkle {
    to { opacity: 0.85; }
  }

  .rocket-slot {
    position: absolute;
    z-index: 3; /* Above the connector; below the edge fades. */
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
  .rocket-slot.selected,
  .rocket-slot:focus-visible {
    background: rgb(17 212 177 / 20%);
  }

  .border {
    position: absolute;
    z-index: 4;
    inset: 0;
    width: 100%;
    height: 100%;
    fill: none;
    pointer-events: none;
    stroke: rgb(17 212 177);
    stroke-width: 3;
  }

  .bg-line {
    opacity: 0;
  }


  .rocket-slot:hover .bg-line,
  .rocket-slot.selected .bg-line,
  .rocket-slot:focus-visible .bg-line {
    opacity: 0.25;
    transition: opacity 0.25s ease-in-out;
  }

  .hl-line {
    stroke-width: 6;
    opacity: 0;
    stroke-dasharray: 200 500;
    transition: stroke-dashoffset 0.5s ease-in-out, opacity 0.1s ease-in-out;
  }

  .rocket-slot:hover .hl-line,
  .rocket-slot.selected .hl-line,
  .rocket-slot:focus-visible .hl-line {
    opacity: 1;
    stroke-dashoffset: -700px;
  }

  .rocket-slot:focus-visible {
    outline: 3px solid rgb(17 212 177);
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
    .space-background::before,
    .space-background::after {
      animation: none;
    }

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
