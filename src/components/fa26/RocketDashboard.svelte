<script lang="ts">
  import type { ContributorMarkdownEntry } from "../../types";

  export let contributor: ContributorMarkdownEntry;
  export let queuePosition = 0;
  export let contributorCount = 1;

  $: profile = contributor.frontmatter;
  $: eta = queuePosition * 6;
  $: isInvalid = [
    profile.name,
    profile.githubUsername,
    profile.message,
    profile.about,
    profile.programmingInterests,
    profile.hobbies,
  ].some((value) => !value?.trim());
</script>

<section
  class="dashboard"
  class:invalid={isInvalid}
  aria-label="Rocket mission dashboard"
>
  <div class="signal-arm" aria-hidden="true"></div>

  {#if isInvalid}
    <div class="error-box" role="alert">
      <div class="error-header">
        <span>EMERGENCY CONDITION</span>
        <span>WARNING // WARNING</span>
      </div>
      <div class="error-center">
        <p>SECURITY LEVEL: RED</p>
        <h2>ERROR</h2>
        <strong>FINAL GATE / LOCKED</strong>
      </div>
      <div class="error-grid">
        <span>DATA CORRUPTED</span>
        <span>SECURITY CHECK</span>
        <span>ENTRY DENIED</span>
        <span>RETRY CONNECTION</span>
        <span>INVALID PILOT</span>
        <span>ABORT SEQUENCE</span>
      </div>
    </div>
  {/if}

  <header class="dashboard-header">
    <span>CAPY // PERSONNEL DATABASE</span>
    <span>FA-26 / 01</span>
  </header>

  <div class="dashboard-body">
    <div class="monitor">
      <div class="monitor-screen">
        <div class="screen-grid" aria-hidden="true"></div>
        <div class="screen-topline">
          <span>IDENTIFICATION COMPLETE</span>
          <strong>&lt ACTIVE &gt</strong>
        </div>

        <div class="profile-heading">
          <img
            src={`https://github.com/${profile.githubUsername}.png`}
            alt={`${profile.name} GitHub profile`}
          />
          <div>
            <p class="orange-label">PILOT</p>
            <h2>{profile.name}</h2>
            <p class="handle">@{profile.githubUsername}</p>
          </div>
        </div>

        <div class="profile-grid">
          <div class="readout">
            <span>ABOUT</span>
            <p>{profile.about || "NO DATA AVAILABLE"}</p>
          </div>
          <div class="readout">
            <span>PROGRAMMING INTERESTS</span>
            <p>{profile.programmingInterests || "NO DATA AVAILABLE"}</p>
          </div>
          <div class="readout">
            <span>HOBBIES</span>
            <p>{profile.hobbies || "NO DATA AVAILABLE"}</p>
          </div>
          <div class="readout message">
            <span>TRANSMISSION</span>
            <p>{profile.message || "NO MESSAGE RECEIVED"}</p>
          </div>
        </div>
      </div>
    </div>

    <aside class="instrument-panel">
      <div class="instrument warning">WARNING</div>
      <div class="instrument">ROCKETS AHEAD <b>{queuePosition}</b></div>
      <div class="instrument">EST. ARRIVAL <b>{eta}s</b></div>
      <div class="instrument">FLEET SIZE <b>{contributorCount}</b></div>
      <div class="radar" aria-hidden="true"><i></i></div>
    </aside>
  </div>

  <footer class="dashboard-footer">
    <a href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noreferrer">
      ACCESS GITHUB ↗
    </a>
    {#if profile.extraLink}
      <a href={profile.extraLink} target="_blank" rel="noreferrer">ACCESS EXTERNAL LINK ↗</a>
    {/if}
    <span class="lights" aria-hidden="true">● ● ●</span>
  </footer>
</section>

<style>
  .dashboard {
    position: relative;
    width: min(1100px, calc(100% - 2rem));
    margin: -1rem auto 0;
    padding: 0.8rem;
    border: 2px solid #202020;
    background: #c7c3a5;
    box-shadow: 0.7rem 0.7rem 0 #050505;
    color: #171717;
    font-family: "Courier New", monospace;
    clip-path: polygon(0 0, 98% 0, 100% 9%, 100% 91%, 98% 100%, 0 100%);
  }

  .dashboard.invalid::after {
    position: absolute;
    z-index: 8;
    inset: 0;
    background: rgb(170 0 0 / 22%);
    content: "";
    pointer-events: none;
  }

  .error-box {
    position: absolute;
    z-index: 9;
    inset: 1.5rem;
    display: grid;
    grid-template-rows: auto 1fr auto;
    border: 4px solid #ff2020;
    outline: 2px solid rgb(255 32 32 / 55%);
    outline-offset: 0.5rem;
    background: repeating-linear-gradient(135deg, #a40000 0 0.8rem, #280000 0.8rem 1rem);
    color: #ff2020;
    box-shadow: 0 0 2rem rgb(255 0 0 / 65%), inset 0 0 2rem rgb(255 0 0 / 25%);
  }

  .error-header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.6rem 1rem;
    background: #e01616;
    color: #170000;
    font-weight: 900;
    letter-spacing: 0.08em;
  }

  .error-center {
    display: grid;
    place-content: center;
    margin: 1rem;
    border: 3px solid #ff2020;
    background: rgb(0 0 0 / 82%);
    text-align: center;
  }

  .error-center p,
  .error-center strong {
    padding: 0.5rem;
    color: #ff2020;
    font-weight: 900;
    letter-spacing: 0.12em;
  }

  .error-center h2 {
    margin: 0;
    border-block: 2px solid #ff2020;
    padding: 0.3rem 2rem;
    color: #ff2020;
    font-size: clamp(2.5rem, 10vw, 6rem);
    font-weight: 900;
    letter-spacing: 0.12em;
  }

  .error-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.35rem;
    padding: 0.7rem;
    background: #a40000;
  }

  .error-grid span {
    border: 1px solid #ff2020;
    padding: 0.45rem;
    background: #300000;
    color: #ff6060;
    font-size: 0.7rem;
    font-weight: 900;
    text-align: center;
  }

  .signal-arm {
    position: absolute;
    top: 45%;
    right: -5rem;
    width: 5rem;
    height: 0.3rem;
    background: #f05a28;
    box-shadow: 0 0 0 2px #171717;
  }

  .signal-arm::after {
    position: absolute;
    right: -0.4rem;
    top: -0.25rem;
    width: 0.8rem;
    height: 0.8rem;
    border: 2px solid #171717;
    border-radius: 50%;
    background: #f05a28;
    content: "";
  }

  .dashboard-header,
  .dashboard-footer {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.45rem 0.7rem;
    background: #171717;
    color: #f5e9c9;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
  }

  .dashboard-body {
    display: grid;
    grid-template-columns: 1fr 10rem;
    gap: 0.8rem;
    margin-block: 0.8rem;
  }

  .monitor {
    padding: 0.7rem;
    border: 0.4rem solid #343434;
    background: #111;
    box-shadow: inset 0 0 0 2px #050505;
  }

  .monitor-screen {
    position: relative;
    min-height: 300px;
    overflow: hidden;
    padding: 1rem;
    background: #e8e2c7;
    color: #171717;
  }

  .screen-grid {
    position: absolute;
    inset: 0;
    opacity: 0.25;
    pointer-events: none;
    background: linear-gradient(90deg, transparent 49%, #f05a28 50%, transparent 51%),
      linear-gradient(0deg, transparent 49%, #f05a28 50%, transparent 51%);
    background-size: 3rem 3rem;
  }

  .screen-topline,
  .profile-heading,
  .profile-grid {
    position: relative;
  }

  .screen-topline {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #171717;
    padding-bottom: 0.4rem;
    font-size: 0.7rem;
  }

  .screen-topline strong,
  .orange-label,
  .readout > span {
    color: #d94118;
  }

  .profile-heading {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-block: 1rem;
  }

  .profile-heading img {
    width: 5rem;
    height: 5rem;
    border: 3px solid #171717;
    filter: sepia(0.3) contrast(1.1);
  }

  h2,
  p {
    margin: 0;
  }

  h2 {
    font-size: clamp(1.3rem, 4vw, 2.2rem);
    line-height: 1;
  }

  .orange-label,
  .readout > span {
    font-size: 0.7rem;
    font-weight: bold;
    letter-spacing: 0.08em;
  }

  .handle {
    margin-top: 0.3rem;
  }

  .profile-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem;
  }

  .readout {
    min-height: 3.5rem;
    border-top: 2px solid #171717;
    padding-top: 0.35rem;
  }

  .readout p {
    margin-top: 0.25rem;
    font-size: 0.85rem;
  }

  .message {
    border-top-color: #f05a28;
  }

  .instrument-panel {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .instrument {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.6rem;
    border: 2px solid #171717;
    background: #e8e2c7;
    font-size: 0.65rem;
  }

  .instrument b {
    font-size: 1.2rem;
  }

  .warning {
    background: #f05a28;
    color: #171717;
    font-weight: bold;
    text-align: center;
  }

  .radar {
    position: relative;
    width: 5rem;
    height: 5rem;
    margin: auto;
    border: 2px solid #171717;
    border-radius: 50%;
    background: repeating-radial-gradient(circle, transparent 0 0.8rem, #171717 0.85rem 0.9rem);
  }

  .radar::after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 2px;
    background: #f05a28;
    content: "";
    transform-origin: left;
    animation: sweep 2s linear infinite;
  }

  .dashboard-footer {
    align-items: center;
  }

  a {
    color: #f5e9c9;
    text-decoration: none;
  }

  a:hover {
    color: #f05a28;
  }

  .lights {
    color: #f05a28;
    letter-spacing: 0.3rem;
  }

  @keyframes sweep {
    to { transform: rotate(360deg); }
  }

  @media (max-width: 700px) {
    .dashboard-body {
      grid-template-columns: 1fr;
    }

    .instrument-panel {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }

    .warning,
    .radar {
      display: none;
    }
  }

  @media (max-width: 500px) {
    .error-header {
      flex-direction: column;
    }

    .error-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .dashboard-header,
    .dashboard-footer {
      flex-direction: column;
    }

    .profile-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .radar::after {
      animation: none;
    }
  }
</style>
