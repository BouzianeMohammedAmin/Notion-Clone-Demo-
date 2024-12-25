import { nanoid } from "nanoid";
import { Page } from "./types";

export const createPage = () => {
  const id = nanoid();
  const slug = nanoid();
  const page :Page = {
    id,
    slug,
    title: "UnTitle",
    nodes: [],
    cover: "notion-cover.png",
  };
  return page;
};
