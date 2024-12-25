import { useImmer } from "use-immer";
import { NodeData, NodeType, Page } from "../utils/types";

export const usePageState = (initialState: Page) => {
  const [page, setPage] = useImmer<Page>(initialState);

  const addNode = (node: NodeData, index: number) => {
    setPage((draft) => draft.nodes.splice(index, 0, node));
  };
  const removeNodeByIndex = (index: number) => {
    setPage((draft) => draft.nodes.splice(index, 1));
  };

  const changingNodeValue = (value: string, nodeIndex: number) => {
    setPage((draft) => {
      draft.nodes[nodeIndex].value = value;
    });
  };
  const changingNodeType = (type: NodeType, nodeIndex: number) => {
    setPage((draft) => {
      draft.nodes[nodeIndex].type = type;
      draft.nodes[nodeIndex].value = "";
    });
  };
  const setNode = (nodes: NodeData[]) => {
    setPage((draft) => {
      draft.nodes = nodes;
    });
  };

  const setTitle = (title: string) => {
    setPage((draft) => {
      draft.title = title;
    });
  };

  const setCoverImg = (coverImg: string) => {
    setPage((draft) => {
      draft.cover = coverImg;
    });
  };

  return {
    nodes: page.nodes,
    title: page.title,
    cover: page.cover,
    changingNodeType,
    changingNodeValue,
    setCoverImg,
    setTitle,
    setNode,
    addNode,
    removeNodeByIndex,
  };
};
