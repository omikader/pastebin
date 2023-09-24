import { Bucket } from "sst/node/bucket";
import { ConditionalCheckFailedException } from "@aws-sdk/client-dynamodb";
import type { Readable } from "stream";
import { Upload } from "@aws-sdk/lib-storage";

import { Snippet } from "../../entities";
import { client } from "../../s3";
import { nanoid } from "../../nanoid";

export async function create(input: {
  title: string;
  description?: string;
  blob: Readable;
}) {
  let id = nanoid();
  while (true) {
    try {
      await Snippet.create({ id, ...input }).go({ originalErr: true });
      break;
    } catch (e) {
      if (e instanceof ConditionalCheckFailedException) {
        id = nanoid();
      } else {
        throw e;
      }
    }
  }

  const upload = new Upload({
    client,
    params: {
      Bucket: Bucket.bucket.bucketName,
      Key: id,
      Body: input.blob,
    },
  });

  try {
    await upload.done();
    return id;
  } catch (e) {
    await Snippet.delete({ id }).go();
    throw e;
  }
}
