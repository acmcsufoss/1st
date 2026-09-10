<script lang="ts">
  export let middleImageSrc: string;
  export let middleImageAlt = "Rocket contributor";
  export let buttonLabel = "Rocket ship";
  export let rotation = 0;
  export let interactive = true;

  $: rocketRotation = `${rotation}deg`;
  $: middleImageRotation = `${-rotation}deg`;

  // beautiful rocket ship :D
  const rocket = {
    src: "/assets/fa26/rocket_ship.png",
    alt: "Rocket ship",
  };

  const flame = {
    src: "/assets/fa26/flame.png",
    alt: "Rocket flame",
  };

  // Some variation in size would be nice so- go go gadget rand
  const rocketWidth = `${170 + Math.floor(Math.random() * 21)}px`;
</script>

<div class="rocket" style:width={rocketWidth}>
  <div class="rocket-body" style:transform={`rotate(${rocketRotation})`}>
    <img class="flame" src={flame.src} alt={flame.alt} />
    <img
      class="middle-image"
      src={middleImageSrc}
      alt={middleImageAlt}
      style:transform={`translate(-50%, -50%) rotate(${middleImageRotation})`}
    />
    <img class="rocket-shell" src={rocket.src} alt={rocket.alt} />
    {#if interactive}
      <button class="rocket-button" type="button" aria-label={buttonLabel} on:click></button>
    {/if}
  </div>
</div>

<style>
  .rocket {
    position: relative;
    aspect-ratio: 282 / 687.5;
    line-height: 0;
  }

  .rocket-body {
    position: relative;
    transform-origin: 50% 62.5%;
  }

  .rocket-shell {
    position: relative;
    z-index: 2;
    width: 100%;
    height: auto;
    pointer-events: none;
  }

  .middle-image {
    position: absolute;
    z-index: 1;
    top: 48%;
    left: 50%;
    width: 44%;
    height: 22%;
    border-radius: 999px;
    object-fit: cover;
    pointer-events: none;
  }

  .flame {
    position: absolute;
    z-index: 0;
    left: 50%;
    bottom: -25%;
    width: 46%;
    transform: translateX(-50%) scale(0.82);
    transform-origin: top center;
    animation: thrust 0.28s ease-in-out infinite alternate;
    pointer-events: none;
  }

  .rocket-button {
    position: absolute;
    z-index: 3;
    inset: 0 0 -25%;
    border: 0;
    padding: 0;
    background: transparent;
    cursor: pointer;
  }

  .rocket-button:focus-visible {
    outline: 3px solid white;
    outline-offset: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    .flame {
      animation: none;
    }
  }

  @keyframes thrust {
    to {
      transform: translateX(-50%) scale(1.12);
    }
  }
</style>
