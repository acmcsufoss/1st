<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import CloseIcon from "./CloseIcon.svelte";

  export let isOpen = false;
  export let contributor: any;

  function toggleContainer() {
    isOpen = !isOpen;
  }
</script>

{#key isOpen}
  <div
    class="custom-modal"
    class:containerOpen={isOpen}
    in:fly={{ y: 40, duration: 150 }}
    out:fly={{ y: 40, duration: 150 }}
  >
    <button class="custom-close-btn" on:click={toggleContainer}>
      <CloseIcon />
    </button>
    <h2>{contributor.frontmatter.name}</h2>
  </div>

  <div
    class="custom-overlay {isOpen ? 'custom-overlay-active' : ''}"
    on:click={toggleContainer}
    on:keydown={toggleContainer}
    role="presentation"
    tabindex="-1"
    in:fade={{ duration: 100 }}
    out:fade={{ duration: 100 }}
  />
{/key}

<style>
  .custom-modal {
    position: fixed;
    left: 50%;
    top: 55%;
    z-index: 20;
    display: none;
    width: min(35rem, 90vw);
    max-height: 400px;
    transform: translate(-50%, -50%);
    border-radius: 0.5rem;
    background-color: rgb(var(--color-primary));
    padding: 1.5rem;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
  }

  .containerOpen {
    top: 50%;
    display: block;
  }

  .custom-close-btn {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    background-color: rgb(var(--color-background-500));
    outline: none;
    border: none;
    cursor: pointer;
  }

  .custom-overlay {
    position: fixed;
    display: none;
    left: 0;
    top: 0;
    z-index: 10;
    height: 100vh;
    width: 100vw;
    background-color: rgba(15, 23, 42, 0.25);
  }

  .custom-overlay-active {
    display: block;
  }
</style>
