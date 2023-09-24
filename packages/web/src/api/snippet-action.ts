import { type ActionFunction, json, redirect } from "react-router-dom";

export const snippetAction = (async ({ request }) => {
  const data = await request.formData();
  const body = data.get("body");
  if (body === null) {
    throw json("Form data is missing 'body' key.", { status: 400 });
  }

  data.delete("body");
  data.append("blob", new Blob([body], { type: "text/plain" }));
  const res = await fetch(import.meta.env.VITE_APP_API_URL, {
    method: request.method,
    body: data,
  });

  if (!res.ok) {
    throw res;
  }

  const id = await res.text();
  return redirect(`/${id}`);
}) satisfies ActionFunction;
