import { LoaderFunction } from "react-router-dom";

export const snippetLoader: LoaderFunction = async ({
  params: { snippetId },
}) => {
  const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/${snippetId}`);

  if (!res.ok) {
    throw new Response(await res.text(), { status: res.status });
  }

  return res.json();
};
