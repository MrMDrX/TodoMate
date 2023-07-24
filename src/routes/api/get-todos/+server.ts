import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getTodos } from "$lib/todos";

export const GET: RequestHandler = async ({ params, locals }) => {
  const result = getTodos(locals.userId);

  return json(result);
};
