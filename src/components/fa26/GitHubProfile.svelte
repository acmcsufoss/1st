<script lang="ts">
  import type { ContributorMarkdownEntry } from "../../types";

  export let isOpen = false;
  export let contributor: ContributorMarkdownEntry;
  export let inline = false;
  export let cardElement: HTMLDivElement;

  $: profile = contributor.frontmatter;

  function close() {
    isOpen = false;
  }
</script>

{#if isOpen}
  <div class="profile-overlay" role="presentation" on:click={close}></div>

  <div
    bind:this={cardElement}
    class="profile-card"
    class:profile-inline={inline}
    role="dialog"
    aria-modal="true"
    aria-labelledby="profile-title"
    tabindex="-1"
    on:click|stopPropagation
    on:keydown|stopPropagation
  >
    <button class="close-button" type="button" aria-label="Close profile" on:click={close}>
      ×
    </button>

    <div class="profile-header">
      <img
        src={`https://github.com/${profile.githubUsername}.png`}
        alt={`${profile.name} GitHub profile`}
      />
      <div>
        <p class="eyebrow">CONTRIBUTOR PROFILE</p>
        <h2 id="profile-title">{profile.name}</h2>
        <p class="handle">@{profile.githubUsername}</p>
      </div>
    </div>

    {#if profile.message}
      <p class="message">“{profile.message}”</p>
    {/if}

    <div class="profile-details">
      {#if profile.about}
        <div>
          <h3>About</h3>
          <p>{profile.about}</p>
        </div>
      {/if}
      {#if profile.programmingInterests}
        <div>
          <h3>Programming interests</h3>
          <p>{profile.programmingInterests}</p>
        </div>
      {/if}
      {#if profile.hobbies}
        <div>
          <h3>Hobbies</h3>
          <p>{profile.hobbies}</p>
        </div>
      {/if}
    </div>

    <div class="profile-links">
      <a href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noreferrer">
        GitHub profile ↗
      </a>
      {#if profile.extraLink}
        <a href={profile.extraLink} target="_blank" rel="noreferrer">External link ↗</a>
      {/if}
    </div>
  </div>
{/if}

<style>
  .profile-overlay {
    position: fixed;
    z-index: 20;
    inset: 0;
    background: rgb(0 0 0 / 78%);
    animation: fade-in 180ms ease-out;
  }

  .profile-card {
    position: fixed;
    z-index: 21;
    top: 50%;
    left: 50%;
    width: min(620px, calc(100vw - 2rem));
    max-height: calc(100vh - 2rem);
    overflow-y: auto;
    padding: 2rem;
    border: 1px solid rgb(91 205 255 / 80%);
    border-radius: 0.25rem;
    background: linear-gradient(145deg, #071a37, #000000);
    box-shadow: 0 0 1.5rem rgb(45 190 255 / 35%);
    color: white;
    transform: translate(-50%, -50%) scaleY(0.02);
    transform-origin: center;
    animation: expand-profile 500ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .profile-inline {
    position: absolute;
    top: 1rem;
    left: 1rem;
    transform: scaleY(0.02);
    animation-name: expand-inline-profile;
  }

  .close-button {
    position: absolute;
    top: 0.5rem;
    right: 0.75rem;
    border: 0;
    background: transparent;
    color: white;
    cursor: pointer;
    font-size: 2rem;
    line-height: 1;
  }

  .profile-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-right: 2rem;
  }

  .profile-header img {
    width: 5rem;
    height: 5rem;
    border: 2px solid #5bcdff;
    border-radius: 50%;
  }

  .eyebrow,
  .handle {
    margin: 0;
    color: #7edcff;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
  }

  h2,
  h3,
  p {
    margin: 0;
  }

  h2 {
    font-size: clamp(1.5rem, 5vw, 2.5rem);
  }

  .message {
    margin-top: 1.5rem;
    padding: 1rem;
    border-left: 3px solid #ffbd5c;
    background: rgb(0 0 0 / 20%);
  }

  .profile-details {
    display: grid;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  h3 {
    margin-bottom: 0.25rem;
    color: #7edcff;
    font-size: 0.85rem;
    text-transform: uppercase;
  }

  .profile-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  a {
    padding: 0.6rem 0.8rem;
    border: 1px solid #5bcdff;
    color: white;
    text-decoration: none;
  }

  a:hover {
    background: rgb(91 205 255 / 20%);
  }

  @keyframes expand-profile {
    from {
      transform: translate(-50%, -50%) scaleY(0.02);
    }
    to {
      transform: translate(-50%, -50%) scaleY(1);
    }
  }

  @keyframes expand-inline-profile {
    from {
      transform: scaleY(0.02);
    }
    to {
      transform: scaleY(1);
    }
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (prefers-reduced-motion: reduce) {
    .profile-card,
    .profile-overlay {
      animation: none;
    }

    .profile-card {
      transform: translate(-50%, -50%);
    }

    .profile-inline {
      transform: none;
    }
  }
</style>
