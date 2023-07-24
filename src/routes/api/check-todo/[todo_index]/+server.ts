import { error, redirect } from "@sveltejs/kit";
import { checkTodo } from "$lib/todos";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals, params }) => {
  try {
    checkTodo(locals.userId, params.todo_index);
  } catch (err) {
    if (err instanceof Error) {
      error(500, err.message);
    }

    error(500, "Unexpected error occured while attempting to create todo.");
  }

  throw redirect(303, "/");
};
