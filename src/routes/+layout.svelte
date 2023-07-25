<script>
  import "../style.css";
</script>

<svelte:head>
  <title>TodoMate</title>
</svelte:head>

<slot />

<style>
  :global(body) {
    margin: 0;
    background: rgba(13, 7, 20, 1);
    height: 100vh;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
  }
</style>
