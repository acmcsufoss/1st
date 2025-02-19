<script>
  import { T, useTask } from "@threlte/core";
  import { interactivity, OrbitControls } from "@threlte/extras";

  export let contributors;

  interactivity();

  const coordinates = Array.from(contributors, () => [
    Math.random() * 10 - 5,
    Math.random(),
    Math.random() * 10 - 5,
  ]);

  let rotation = 0;
  useTask((delta) => {
    rotation += delta;
  });
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

<T.AmbientLight position={[0, 10, 10]} color="#FFFFFF" intensity={3} />
<T.GridHelper args={[30, 30]} />

{#each coordinates as [x, y, z]}
  <T.Mesh position={[x, y, z]}>
    <T.SphereGeometry args={[0.1]} />
    <T.MeshStandardMaterial color="rgb(17, 212, 177)" />
  </T.Mesh>
{/each}
