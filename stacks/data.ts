import { Bucket, StackContext, Table } from "sst/constructs";

export function DataStack({ stack }: StackContext) {
  const bucket = new Bucket(stack, "bucket");

  const table = new Table(stack, "table", {
    fields: {
      pk: "string",
    },
    primaryIndex: {
      partitionKey: "pk",
    },
  });

  return { bucket, table };
}
