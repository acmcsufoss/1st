<script lang="ts">
  import type { ContributorMarkdownEntry } from "../types";

  export let contributors: ContributorMarkdownEntry[] = [];
  export let openContributorDialog: (i: number) => void;

  function randomIndex(existing: Set<string>) {
    let x = -1, y = -1;
    while (
      existing.has(`${x},${y}`) ||
      x < 0
    ) {
      x = Math.floor(Math.random() * 12);
      y = Math.floor(Math.random() * 8);
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

<!-- https://stackoverflow.com/questions/21368410/how-to-set-svg-width-and-svg-height-by-percent -->
 
<svg viewBox="0 0 1472 832" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block; margin:auto; height=auto; width=95%">

  <!-- Circle Generation -->
  {#each Array(12) as _, i}
    {#each Array(8) as _, j}
      {#if isTaken(i, j)}
        <!-- Contributor Jellyfish -->
        <image href="/1st/assets/jellyfish.png" width="128" height="128"
            x={i * 112+48+Math.floor(Math.random() * 16)}
            y={j * 96+8+Math.floor(Math.random() * 16)}
            on:mouseover={() => showHover(i, j)}
            on:mouseout={hideHover}
            on:click={() => {
                openContributorDialog(jellyfish.indexOf(getJellyfish(i, j)));
            }}
        />
        {:else}
            <!-- Default Circle -->
          <!-- <circle cx={i * 112+64+48} cy={j * 96+64+8} r="16" fill="#FFFFFF" /> -->
      {/if}
    {/each}
  {/each}


  <!-- Hover Box -->
  {#if hovered.name}
    <rect
      x={hovered.x * 112 + 96 - (hovered.name.length * 7)}
      y={hovered.y * 96}
      width={hovered.name.length * 14}
      height="28"
      fill="#2b2b2b"
      opacity="0.8"
      rx="4"
    />
    <text
      x={hovered.x * 112 + 96}
      y={hovered.y * 96 + 16}
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
