<script lang="ts">
  import { T } from "@threlte/core";
  import { interactivity, OrbitControls, Text } from "@threlte/extras";
  import type { Fa2024MarkdownEntry } from "../types";

  export let contributors: Fa2024MarkdownEntry[];
  export let openContributorDialog: (i: number) => void;

  interactivity();

  const bubbleColors = [
    "rgb(17, 212, 177)",
    "rgb(21, 114, 97)",
    "rgb(18, 132, 138)",
    "rgb(255, 253, 117)",
  ];
  const bubbleProps = Array.from(contributors, (contributor) => ({
    x: Math.random() * 10 - 5,
    y: Math.random(),
    z: Math.random() * 10 - 5,
    color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
    contributorName: contributor.frontmatter.name,
  }));

  let namePosition = { x: 0, y: 0 };
  let currName = "";
</script>

<T.PerspectiveCamera makeDefault position={[0, 5, 0]}>
  <OrbitControls
    enableDamping
    minPolarAngle={Math.PI / 3}
    maxPolarAngle={Math.PI / 2.1}
    minDistance={2}
    maxDistance={8.5}
    dampingFactor={0.03}
  />
</T.PerspectiveCamera>

<T.AmbientLight position={[0, 10, 10]} color="#FFFFFF" intensity={5} />
<T.GridHelper args={[30, 30]} />

{#key namePosition}
  <Text
    text={currName}
    anchorX={-1 * namePosition.x}
    anchorY={-1 * namePosition.y}
  />
{/key}

{#each bubbleProps as { x, y, z, color, contributorName }, i}
  <T.Mesh
    position={[x, y, z]}
    onpointerenter={() => {
      currName = contributorName;
      namePosition = { x: x, y: y + 0.2 };
    }}
    onclick={() => {
      openContributorDialog(i);
    }}
  >
    <T.SphereGeometry args={[0.1]} />
    <T.MeshStandardMaterial {color} />
  </T.Mesh>
{/each}
