<script lang="ts">
  import type { ContributorMarkdownEntry } from "../../types";
  import RocketShip from "./RocketShip.svelte";

  export let contributors: ContributorMarkdownEntry[] = [];
  export let openContributorDialog: (i: number) => void;

  const columns = 12;
  const rows = 6;

  function randomIndex(taken: Set<string>) {
    let x = 0;
    let y = 0;

    do {
      x = Math.floor(Math.random() * columns);
      y = Math.floor(Math.random() * rows);
    } while (taken.size < columns * rows && taken.has(`${x},${y}`));

    taken.add(`${x},${y}`);
    return { x, y };
  }

  function avatar(username: string) {
    return `https://github.com/${username}.png`;
  }

  const taken = new Set<string>();
  const rockets = contributors.map((contributor, i) => ({
    contributor,
    i,
    location: randomIndex(taken),
    nudgeX: Math.floor(Math.random() * 8),
    nudgeY: Math.floor(Math.random() * 8),
    rotation: 45,
  }));

  let hovered = {
    name: "",
    x: 0,
    y: 0,
  };
</script>

<div class="rocket-field">
  {#each rockets as rocket}
    <div
      class="rocket-slot"
      style:left={`${(rocket.location.x / columns) * 100 + rocket.nudgeX}%`}
      style:top={`${(rocket.location.y / rows) * 100 + rocket.nudgeY}%`}
      on:mouseenter={() => {
        hovered = {
          name: rocket.contributor.frontmatter.name,
          x: (rocket.location.x / columns) * 100 + rocket.nudgeX,
          y: (rocket.location.y / rows) * 100 + rocket.nudgeY,
        };
      }}
      on:mouseleave={() => {
        hovered = { name: "", x: 0, y: 0 };
      }}
    >
      <RocketShip
        middleImageSrc={avatar(rocket.contributor.frontmatter.githubUsername)}
        middleImageAlt={rocket.contributor.frontmatter.name}
        buttonLabel={`Open ${rocket.contributor.frontmatter.name}`}
        rotation={rocket.rotation}
        on:click={() => openContributorDialog(rocket.i)}
      />
    </div>
  {/each}

  {#if hovered.name}
    <div class="hover-label" style:left={`${hovered.x}%`} style:top={`${hovered.y}%`}>
      {hovered.name}
    </div>
  {/if}
</div>

<style>
  .rocket-field {
    position: relative;
    width: min(1472px, 95vw);
    min-height: 760px;
    margin: 0 auto;
    overflow: hidden;
  }

  .rocket-slot {
    position: absolute;
  }

  .hover-label {
    position: absolute;
    z-index: 4;
    translate: -15% -120%;
    border-radius: 4px;
    padding: 0.35rem 0.55rem;
    background: rgb(43 43 43 / 80%);
    color: #fffffe;
    font-size: 1rem;
    line-height: 1;
    pointer-events: none;
    white-space: nowrap;
  }
</style>
