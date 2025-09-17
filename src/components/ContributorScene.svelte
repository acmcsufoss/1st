<script lang="ts">
  import { T } from "@threlte/core";
  import {
    interactivity,
    OrbitControls,
    Text,
    Billboard,
  } from "@threlte/extras";
  import type { ContributorMarkdownEntry } from "../types";

  export let contributors: ContributorMarkdownEntry[];
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

  let namePosition = { x: 0, y: 0, z: 0 };
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
  <Billboard position={[namePosition.x, namePosition.y, namePosition.z]}>
    <Text text={currName} />
  </Billboard>
{/key}

{#each bubbleProps as { x, y, z, color, contributorName }, i}
  <T.Mesh
    position={[x, y, z]}
    onpointerenter={() => {
      currName = contributorName;
      namePosition = { x: x, y: y + 0.2, z: z };
    }}
    onclick={() => {
      openContributorDialog(i);
    }}
  >
    <T.SphereGeometry args={[0.1]} />
    <T.MeshStandardMaterial {color} />
  </T.Mesh>
{/each}
