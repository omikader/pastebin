import { Bucket } from "sst/node/bucket";
import { GetObjectCommand } from "@aws-sdk/client-s3";

import { Snippet } from "../../entities";
import { client } from "../../s3";

export async function get(input: { id: string }) {
  const { data } = await Snippet.get(input).go();
  if (data === null) {
    return null;
  }

  const command = new GetObjectCommand({
    Bucket: Bucket.bucket.bucketName,
    Key: input.id,
  });

  const { Body } = await client.send(command);
  if (Body === undefined) {
    return null;
  }

  return {
    ...data,
    body: await Body.transformToString(),
  };
}
