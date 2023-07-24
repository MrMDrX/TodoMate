import { USER_ID_COOKIE_REF } from "$lib/constants";
import { v4 as uuid } from "uuid";

export const handle = async ({ event, resolve }) => {
  const userId = event.cookies.get(USER_ID_COOKIE_REF);

  if (!userId) {
    const newId = uuid();

    event.cookies.set(USER_ID_COOKIE_REF, newId, {
      httpOnly: false,
      path: "/",
    });

    event.locals.userId = newId;
  } else {
    event.locals.userId = userId;
  }

  return resolve(event);
};
