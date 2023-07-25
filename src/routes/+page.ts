import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { Todo } from "$lib/types";

export const load = (async ({ fetch }) => {
  async function getTodos() {
    try {
      const result = await fetch("/api/get-todos");

      const jsonResult: Todo[] = await result.json();

      return jsonResult;
    } catch (err) {
      if (err instanceof Error) {
        throw error(500, err.message);
      }
      throw error(500, "Unexpected error occurred");
    }
  }

  return {
    todos: await getTodos(),
  };
}) satisfies PageLoad;
