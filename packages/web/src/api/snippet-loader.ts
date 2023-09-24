import { type LoaderFunction, defer, json } from "react-router-dom";
import { P, isMatching } from "ts-pattern";

const isSnippet = isMatching({
  title: P.string,
  description: P.string.optional(),
  body: P.string,
});

export const snippetLoader = (async ({ params: { snippetId } }) => {
  const data = fetch(`${import.meta.env.VITE_APP_API_URL}/${snippetId}`).then(
    async (res) => {
      if (!res.ok) {
        throw res;
      }

      const snippet = await res.json();
      if (!isSnippet(snippet)) {
        throw json("Response is malformed.", { status: 500 });
      }

      return snippet;
    }
  );

  return defer({ data });
}) satisfies LoaderFunction;
