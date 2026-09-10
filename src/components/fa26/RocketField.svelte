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
    <div
      class="rocket-slot"
      style:--offset={`${offset}px`}
      style:animation-delay={`${-i * 4}s`}
    >
      <RocketShip
        middleImageSrc={`https://github.com/${contributor.frontmatter.githubUsername}.png`}
        middleImageAlt={contributor.frontmatter.name}
        buttonLabel={`Open ${contributor.frontmatter.name}`}
        rotation={45}
        on:click={() => openContributorDialog(i % contributors.length)}
      />
    </div>
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
    margin-left: -250px;
    margin-top: -250px;
    animation: fly var(--duration) linear infinite;
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
