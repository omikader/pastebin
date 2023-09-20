import { Bucket } from "sst/node/bucket";
import { ConditionalCheckFailedException } from "@aws-sdk/client-dynamodb";
import { PutObjectCommand } from "@aws-sdk/client-s3";

import { Snippet } from "../../entities";
import { client } from "../../s3";
import { nanoid } from "../../nanoid";

export async function create(input: {
  title: string;
  description?: string;
  body: string;
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

  const command = new PutObjectCommand({
    Bucket: Bucket.bucket.bucketName,
    Key: id,
    Body: input.body,
    Metadata: {
      dynamoPrimaryKey: id,
    },
  });

  try {
    await client.send(command);
    return id;
  } catch (e) {
    await Snippet.delete({ id }).go();
    throw e;
  }
}
