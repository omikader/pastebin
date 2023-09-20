import { SSTConfig } from "sst";
import { ApiStack, DataStack, WebStack } from "./stacks";

export default {
  config(_input) {
    return {
      name: "pastebin",
      region: "us-west-2",
    };
  },
  stacks(app) {
    app.stack(DataStack).stack(ApiStack).stack(WebStack);
  },
} satisfies SSTConfig;
