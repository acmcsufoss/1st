<script lang="ts">
  import type { ContributorMarkdownEntry } from "../types";

  export let contributors: ContributorMarkdownEntry[] = [];
  export let openContributorDialog: (i: number) => void;

  function randomIndex(existing: Set<string>) {
    let x = 4, y = 4;
    while (
      existing.has(`${x},${y}`)
    ) {
      x = Math.floor(Math.random() * 12);
      y = Math.floor(Math.random() * 12);
    }
    existing.add(`${x},${y}`);
    return [x, y];
  }

  const takenGrid = new Set<string>();
  const jellyfish = contributors.map((contributor) => {
    const location = randomIndex(takenGrid);
    return {
      location,
      contributorName: contributor.frontmatter.name
    };
  });

  let hovered = {
    name: "",
    x: -1,
    y: -1
  };

  function showHover(i: number, j: number) {
    const jf = jellyfish.find(f => f.location[0] === i && f.location[1] === j);
    if (jf) {
      hovered = {
        name: jf.contributorName,
        x: i,
        y: j
      };
    }
  }

  function hideHover() {
    hovered = { name: "", x: -1, y: -1 };
  }

  function isTaken(i: number, j: number) {
    return jellyfish.some(f => f.location[0] === i && f.location[1] === j);
  }

  function getJellyfish(i: number, j: number) {
    return jellyfish.find(f => f.location[0] === i && f.location[1] === j);
  }

</script>

<svg width="600" height="600" viewBox="0 0 600 536" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin:auto;">
  <!-- Background Square -->
  <rect x="24" y="12" width="512" height="512" fill="#0a5447" rx="10" ry="10" />

  <!-- Circle Generation -->
  {#each Array(12) as _, i}
    {#each Array(12) as _, j}
      {#if isTaken(i, j)}
        <!-- Contributor Circle -->
        <circle cx={i * 42 + 48} cy={j * 42 + 36} r="12" fill="#FFFFFF"
            on:mouseover={() => showHover(i, j)}
            on:mouseout={hideHover}
            on:click={() => {
                openContributorDialog(jellyfish.indexOf(getJellyfish(i, j)));
            }}
        />
    {:else}
        <!-- Default Circle -->
        <circle cx={i * 42 + 48} cy={j * 42 + 36} r="12" fill="#FFFFFF" />
    {/if}
    {/each}
  {/each}


  <!-- Hover Box -->
  {#if hovered.name}
    <rect
      x={hovered.x * 42 + 48 - (hovered.name.length * 6)}
      y={hovered.y * 42 - 6}
      width={hovered.name.length * 12}
      height="28"
      fill="#2b2b2b"
      opacity="0.8"
      rx="4"
    />
    <text
      x={hovered.x * 42 + 48}
      y={hovered.y * 42 + 10}
      font-size="16"
      fill="#FFFFFE"
      text-anchor="middle"
      alignment-baseline="middle"
      opacity="1"
    >
      {hovered.name}
    </text>
  {/if}
  
</svg>

<style>
  svg {
    user-select: none;
    width: min(100%, 600px);
  }
</style>
