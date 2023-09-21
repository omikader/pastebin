import * as snippetService from "@pastebin/core/services/snippet";
import busboy from "busboy";
import { ApiHandler, useBody, useHeaders } from "sst/node/api";
import { P, isMatching } from "ts-pattern";
import { Readable } from "stream";

const isValidFormData = isMatching({
  title: P.string,
  description: P.optional(P.string),
  blob: P.instanceOf(Readable),
});

export const handler = ApiHandler(async () => {
  const formData: Record<string, any> = {};
  const bb = busboy({ headers: useHeaders() });
  bb.on("field", (name, value) => (formData[name] = value));
  bb.on("file", (name, stream) => (formData[name] = stream));
  bb.write(useBody());
  bb.end();

  if (isValidFormData(formData)) {
    const id = await snippetService.create(formData);
    return {
      statusCode: 200,
      body: id,
    };
  }

  return {
    statusCode: 400,
    body: "Invalid request. Form data is malformed.",
  };
});
