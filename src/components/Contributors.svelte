<script lang="ts">
  import ContributorPopup from "./ContributorPopup.svelte";
  import type { Fa2024MarkdownEntry } from "../types";

  export let contributors: Fa2024MarkdownEntry[];

  let isContributorDialogOpen = false;
  let contributorIndex = 0;

  function openContributorDialog(i: number) {
    contributorIndex = i;
    isContributorDialogOpen = true;
  }

  $: contributor = contributors[contributorIndex];
</script>

{#key contributorIndex}
  <ContributorPopup bind:contributor bind:isOpen={isContributorDialogOpen} />
{/key}

<section class="contributors">
  {#each contributors as contributor, i}
    {#if contributor}
      <div
        class="contributor"
        on:click={() => openContributorDialog(i)}
        on:keydown={() => openContributorDialog(i)}
        role="button"
        tabindex="0"
      >
        <img
          class="profile-image"
          src="https://github.com/{contributor.frontmatter.githubUsername}.png"
          alt="ACM at CSUF Icon"
          width={32}
          height={32}
        />
        <span>{contributor.frontmatter.name}</span>
      </div>
    {/if}
  {/each}
</section>

<style>
  .contributors {
    display: grid;
    gap: 1rem;
    align-items: center;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .contributor {
    cursor: pointer;
    display: flex;
    gap: 0.25rem;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: 2px solid rgb(var(--color-secondary));
    background-color: rgba(var(--color-secondary), 0.6);
    transition: background-color 150ms ease;
    font-size: 0.875rem;
    font-weight: 500;
    overflow-x: hidden;
    white-space: nowrap;
  }

  .contributor:hover {
    background-color: rgba(var(--color-secondary), 0.9);
  }

  .profile-image {
    border-radius: 50%;
  }

  @media screen and (min-width: 640px) {
    .contributors {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .contributor {
      font-size: 1rem;
    }
  }

  @media screen and (min-width: 768px) {
    .contributors {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media screen and (min-width: 1024px) {
    .contributors {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
</style>
