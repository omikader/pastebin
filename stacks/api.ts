import { Api, StackContext, use } from "sst/constructs";

import { DataStack } from "./data";

export function ApiStack({ stack }: StackContext) {
  const { bucket, table } = use(DataStack);

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [bucket, table],
      },
    },
    routes: {
      "GET  /{id}": "packages/functions/src/snippet/get.handler",
      "POST /": "packages/functions/src/snippet/create.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return { api };
}
