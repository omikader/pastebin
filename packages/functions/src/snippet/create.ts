import * as snippetService from "@pastebin/core/services/snippet";
import busboy from "busboy";
import { ApiHandler, useBody, useHeaders } from "sst/node/api";

export const handler = ApiHandler(async () => {
  const formData: Record<string, string> = {};

  const bb = busboy({ headers: useHeaders() });
  bb.on("field", (name, value) => (formData[name] = value));
  bb.write(useBody());
  bb.end();

  if (!formData.hasOwnProperty("title") || !formData.hasOwnProperty("body")) {
    return {
      statusCode: 400,
      body: "Invalid request. Missing 'title' or 'body' form fields.",
    };
  }

  if (Buffer.byteLength(formData.body) > 10 * 1024 * 1024) {
    return {
      statusCode: 400,
      body: "Invalid request. Snippet body is larger than 10 MB.",
    };
  }

  const id = await snippetService.create({
    title: formData.title,
    description: formData.description,
    body: formData.body,
  });

  return {
    statusCode: 200,
    body: id,
  };
});
