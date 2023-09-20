import { ActionFunction, redirect } from "react-router-dom";

export const snippetAction: ActionFunction = async ({ request }) => {
  const res = await fetch(import.meta.env.VITE_APP_API_URL, {
    method: request.method,
    body: await request.formData(),
  });

  if (!res.ok) {
    throw new Response(await res.text(), { status: res.status });
  }

  const id = await res.text();
  return redirect(`/${id}`);
};
