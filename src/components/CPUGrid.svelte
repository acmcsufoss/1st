<script lang="ts">
  import type { ContributorMarkdownEntry } from "../types";

  export let contributors: ContributorMarkdownEntry[];
  export let openContributorDialog: (i: number) => void;

  const pinDefaultColor = "rgb(194, 164, 20)"
  const pinColors = [
    [232, 16, 34],
    [179, 243, 16],
    [68, 249, 84],
    [151, 253, 255],
    [60, 42, 252],
    [146, 18, 214],
    [242, 92, 237],
    [254, 44, 194],
  ];
//   const bubbleProps = Array.from(contributors, (contributor) => ({
//     x: Math.random() * 10 - 5,
//     y: Math.random(),
//     z: Math.random() * 10 - 5,
//     color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
//     contributorName: contributor.frontmatter.name,
//   }));

  let namePosition = { x: 0, y: 0, z: 0 };
  let currName = "";
</script>

<svg>
    <image src="assets/CPU.svg" width="40%" style="margin:auto;" />

    {#each {length: 75} as _, i}
        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
            <circle cx={i+10} cy={i+10} r="10" fill={pinDefaultColor} />
        </svg>
    {/each}
</svg>