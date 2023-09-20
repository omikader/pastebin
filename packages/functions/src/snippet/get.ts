import * as snippetService from "@pastebin/core/services/snippet";
import { ApiHandler, usePathParam } from "sst/node/api";

export const handler = ApiHandler(async () => {
  const id = usePathParam("id");
  if (id === undefined) {
    return {
      statusCode: 400,
      body: "Missing snippet id",
    };
  }

  const snippet = await snippetService.get({ id });
  if (snippet === null) {
    return {
      statusCode: 404,
      body: "Snippet is unavailable",
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(snippet),
  };
});
