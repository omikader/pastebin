import BadWordsFilter from "bad-words";
import { nanoid as gen } from "nanoid";

const filter = new BadWordsFilter();

export function nanoid() {
  let id = gen(6);
  while (filter.isProfane(id)) {
    id = gen(6);
  }

  return id;
}
