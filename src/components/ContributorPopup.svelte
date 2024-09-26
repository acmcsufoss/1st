<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import type { Fa2024MarkdownEntry } from "../types";

  export let isOpen = false;
  export let contributor: Fa2024MarkdownEntry;

  const {
    name,
    githubUsername,
    message,
    about,
    programmingInterests,
    hobbies,
    extraLink,
  } = contributor.frontmatter;

  function toggleContainer() {
    isOpen = !isOpen;
  }
</script>

{#key [isOpen, contributor]}
  <div
    class="custom-modal"
    class:containerOpen={isOpen}
    out:fly={{ y: 40, duration: 150 }}
  >
    <button class="custom-close-btn" on:click={toggleContainer}>
      <img src="/1st/closeIcon.svg" alt="Close Icon" />
    </button>

    <h2>{name}</h2>

    <div class="card-layout">
      {#if message && message !== ""}
        <div class="message">
          <b>Message:</b>
          {message}
        </div>
      {/if}

      <div class="bubble-1"></div>
      <div class="bubble-2"></div>
      <div class="bubble-3"></div>
      <div class="bubble-4"></div>

      <div class="left">
        <img
          src="https://github.com/{githubUsername}.png"
          alt="{name} GitHub image"
        />
        <div class="links">
          {#if githubUsername && githubUsername !== ""}
            <a target="_blank" href="https://github.com/{githubUsername}">
              GitHub Profile
            </a>
          {/if}
          {#if extraLink && extraLink !== ""}
            <a target="_blank" href={extraLink}> External Link </a>
          {/if}
        </div>
      </div>

      <div class="right">
        {#if githubUsername && githubUsername !== ""}
          <div>
            <h3>GitHub Username</h3>
            <p>{githubUsername}</p>
          </div>
        {/if}
        {#if about && about !== ""}
          <div>
            <h3>About</h3>
            <p>{about}</p>
          </div>
        {/if}
        {#if programmingInterests && programmingInterests !== ""}
          <div>
            <h3>Programming Interests</h3>
            <p>{programmingInterests}</p>
          </div>
        {/if}
        {#if hobbies && hobbies !== ""}
          <div>
            <h3>Hobbies</h3>
            <p>{hobbies}</p>
          </div>
        {/if}
      </div>
    </div>
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
    width: min(40rem, 90vw);
    max-height: 500px;
    overflow-y: scroll;
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

  h2,
  h3,
  p {
    margin: 0;
  }

  .message {
    padding: 0.5rem;
    border-radius: 0.5rem;
    top: -42%;
    background-color: rgb(var(--color-secondary));
  }

  .bubble-1,
  .bubble-2,
  .bubble-3,
  .bubble-4 {
    display: none;
    background-color: rgb(var(--color-secondary));
    position: absolute;
    border-radius: 50%;
  }

  .bubble-1 {
    width: 2rem;
    height: 2rem;
    top: -38%;
    left: -5%;
  }
  .bubble-2 {
    width: 1.5rem;
    height: 1.5rem;
    top: -22%;
    left: -8%;
  }
  .bubble-3 {
    width: 1.25rem;
    height: 1.25rem;
    top: -10%;
    left: -4%;
  }
  .bubble-4 {
    width: 1rem;
    height: 1rem;
    top: 2%;
    left: 0;
  }

  .card-layout {
    position: relative;
    padding-inline: 1rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .card-layout > .left {
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
  }

  .card-layout > .left a {
    padding: 0.25rem 0.5rem;
    border-radius: 0.75rem;
    background-color: rgb(var(--color-secondary));
    text-align: center;
  }

  .card-layout img {
    margin-inline: auto;
    border-radius: 50%;
    width: 7rem;
  }

  .card-layout > .right {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .card-layout > .right > div {
    font-size: 0.875rem;
  }

  .card-layout > .left > .links {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  @media screen and (min-width: 640px) {
    .custom-modal {
      max-width: none;
      overflow-y: visible;
    }

    .message {
      position: absolute;
    }

    .card-layout {
      flex-direction: row;
    }

    .bubble-1,
    .bubble-2,
    .bubble-3,
    .bubble-4 {
      display: block;
    }

    .card-layout img {
      width: 10rem;
    }
  }
</style>
