import { useState } from "react";
import { NodeData } from "../utils/types";
import { useFocusedNodeIndex } from "./useFocusedNodeIndex";
import Cover from "./Cover";
import Title from "./Title";
import BasicNode from "../node/BasicNode";
import Spacer from "./Spacer";
import { nanoid } from "nanoid";

export default function Page() {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [title, setTitle] = useState("Default Title ");
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });
  const addNode = (node: NodeData, index: number) => {
    const newNodes = [...nodes];
    newNodes.splice(index, 0, node);
    setNodes(newNodes);
  };

  const deleteNodeByIndex = (index: number) => {
    const newNodes = [...nodes];
    newNodes.splice(index, 1);
    setNodes(newNodes);
  };

  const changeNodeValue = (index: number, value: string) => {
    const newNodes = [...nodes];
    newNodes[index].value = value;
    setNodes(newNodes);
  };

  return (
    <>
      <Cover />
      <div className="mx-5">
        <Title addNode={addNode} title={title} onChangeTitle={setTitle} />
        {nodes.map((node, index) => (
          <BasicNode
            key={node.id}
            node={node}
            isFocused={focusedNodeIndex === index}
            updateFocusedIndex={setFocusedNodeIndex}
            index={index}
            addNode={addNode}
            removeNodByIndex={deleteNodeByIndex}
            changeValue={changeNodeValue}
          />
        ))}
        <Spacer
          showHint={!nodes.length}
          handelClick={() => {
            addNode(
              {
                id: nanoid(),
                type: "text",
                value: "",
              },
              nodes.length,
            );
          }}
        />
      </div>
    </>
  );
}
