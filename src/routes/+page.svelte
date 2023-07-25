<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { fade, slide, type TransitionConfig } from "svelte/transition";
  import type { PageData } from "./$types";
  import Icon from "@iconify/svelte";

  export let data: PageData;

  let inputContent = "";

  async function handleCreateTodo(event: { currentTarget: EventTarget & HTMLFormElement }) {
    inputContent = "";

    const data = new FormData(event.currentTarget);

    await fetch("/api/create-todo", {
      method: "POST",
      body: data,
    });

    await invalidateAll();
  }

  async function handleCheckTodo(
    id: string,
    event: {
      currentTarget: EventTarget & HTMLFormElement;
    }
  ) {
    inputContent = "";

    const data = new FormData(event.currentTarget);

    await fetch(`/api/check-todo/${id}`, {
      method: "POST",
      body: data,
    });

    await invalidateAll();
  }

  async function handleDeleteTodo(
    id: string,
    event: {
      currentTarget: EventTarget & HTMLFormElement;
    }
  ) {
    inputContent = "";

    const data = new FormData(event.currentTarget);

    await fetch(`/api/delete-todo/${id}`, {
      method: "POST",
      body: data,
    });

    await invalidateAll();
  }

  function fadeAbsolute(node: HTMLElement): TransitionConfig {
    return {
      duration: 100,
      css(t, u) {
        return `position: absolute; opacity: ${t};`;
      },
    };
  }
</script>

<div class="flex-wrapper">
  <main>
    <div class="header">
      <div class="logo-container">
        <img src="logo.png" alt="Logo" class="logo" />
        <span class="app-name">TodoMate</span>
      </div>
    </div>

    <section class="header">
      <form action="/api/create-todo" method="POST" on:submit|preventDefault={handleCreateTodo} class="create-todo-form">
        <input type="text" name="content" placeholder="Create a new todo!" bind:value={inputContent} />

        <button type="submit" class="create-todo-button">Create Todo</button>
      </form>
    </section>

    <ul>
      {#each data.todos as todo (todo.id)}
        <li class={todo.checked ? "done" : ""} transition:slide|global>
          <div class="list-item-container">
            <form action="/api/check-todo/{todo.id}" method="POST" class="check-form" on:submit|preventDefault={(event) => handleCheckTodo(todo.id, event)}>
              <button class="list-item">
                {#key todo.checked}
                  <div class="check-indicator" in:fade={{ duration: 100 }} out:fadeAbsolute>
                    {#if todo.checked}
                      <Icon icon="lucide:square-check-big" height="4em" width="4em" />
                    {:else}
                      <Icon icon="lucide:square" height="4em" width="4em" />
                    {/if}
                  </div>
                {/key}

                {todo.content}
              </button>
            </form>

            <form action="/api/delete-todo/{todo.id}" method="POST" on:submit|preventDefault={(event) => handleDeleteTodo(todo.id, event)}>
              <button class="delete-button">
                <Icon icon="lucide:trash" height="4em" width="4em" />
              </button>
            </form>
          </div>
        </li>
      {/each}
    </ul>
  </main>
</div>

<style>
  .header {
    box-shadow: rgba(0, 0, 0, 0.1) 0 0.1rem 0.5rem;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(5px);
    gap: 1rem;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  .logo-container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 50px;
    height: 50px;
    margin-right: 1rem;
  }

  .app-name {
    color: rgba(29, 24, 37, 1);
    font-size: 2rem;
    font-weight: 600;
  }

  input {
    background: rgba(255, 255, 255, 0.3);
    padding: 0.5rem;
    border: transparent solid 2px;
    outline: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: all 150ms ease;
    width: 100%;
    box-sizing: border-box;
  }

  input:focus {
    border: rgba(158, 120, 207, 1) solid 2px;
  }

  .create-todo-form {
    display: flex;
    gap: 1rem;
    width: 100%;
  }

  .create-todo-button {
    padding: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    background-color: rgba(158, 120, 207, 1);
    color: white;
    transition: all 150ms ease;
  }

  .create-todo-button:hover {
    background-color: rgba(158, 120, 207, 0.7);
  }

  button {
    cursor: pointer;
  }

  main {
    border-radius: 1rem;
    background: rgba(29, 24, 37, 0.6);
    box-shadow: rgba(0, 0, 0, 0.2) 0 0.25rem 0.8rem;
    width: 90%;
    max-width: 40rem;
    height: 90vh;
    margin: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  ul {
    list-style-type: none;
    overflow: auto;
    height: 90%;
    margin: 0;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .list-item-container {
    display: flex;
    gap: 0.5rem;
    width: 100%;
  }

  .check-form {
    width: 100%;
  }

  .list-item {
    font-size: clamp(1rem, 3vh, 4rem);
    width: 100%;
    text-align: left;
    padding: 1rem;
    background-color: rgba(170, 170, 170, 0.35);
    border: none;
    border-radius: 0.5rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 150ms ease;
  }

  .list-item:hover {
    background-color: rgba(170, 170, 170, 0.45);
  }

  .delete-button {
    height: 100%;
    width: 2.5rem;
    color: rgba(158, 120, 207, 1);
    background: none;
    border: none;
    border-radius: 0.5rem;
    transition: all 150ms ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .delete-button:hover {
    color: rgba(158, 120, 207, 0.7);
  }

  .check-indicator {
    width: 1.3rem;
    height: 1.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(158, 120, 207, 1);
  }

  .flex-wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .done {
    text-decoration: line-through;
  }
</style>
