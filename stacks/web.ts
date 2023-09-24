import { StackContext, StaticSite, use } from "sst/constructs";

import { ApiStack } from "./api";

export function WebStack({ stack }: StackContext) {
  const { api } = use(ApiStack);

  const app = new StaticSite(stack, "app", {
    path: "packages/web",
    buildCommand: "pnpm run build",
    buildOutput: "dist",
    environment: {
      VITE_APP_API_URL: api.url,
    },
    customDomain: {
      domainName: "pastebin.omikader.com",
      domainAlias: "www.pastebin.omikader.com",
      hostedZone: "omikader.com",
    },
  });

  stack.addOutputs({
    AppUrl: app.customDomainUrl ?? app.url,
  });
}
