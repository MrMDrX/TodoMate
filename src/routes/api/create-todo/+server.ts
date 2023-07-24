import { error, redirect } from "@sveltejs/kit";
import { createTodo } from "$lib/todos";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals, request }) => {
  const formData = await request.formData();

  const content = formData.get("content");

  try {
    if (typeof content !== "string") {
      throw new Error(`Property "content" must be a string`);
    }

    createTodo(locals.userId, content);
  } catch (err) {
    if (err instanceof Error) {
      error(500, err.message);
    }

    error(500, "Unexpected error occured while attempting to create todo.");
  }

  throw redirect(303, "/");
};
