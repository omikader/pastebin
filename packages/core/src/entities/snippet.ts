import { Entity } from "electrodb";
import { Table } from "sst/node/table";

import { client } from "../dynamo";

export const Snippet = new Entity(
  {
    model: { service: "pastebin", entity: "snippet", version: "1" },
    attributes: {
      id: {
        type: "string",
        required: true,
      },
      title: {
        type: "string",
        required: true,
      },
      description: {
        type: "string",
        required: false,
      },
    },
    indexes: {
      byId: {
        pk: {
          field: "pk",
          composite: ["id"],
        },
      },
    },
  },
  { table: Table.table.tableName, client }
);
