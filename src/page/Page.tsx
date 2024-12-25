import { useFocusedNodeIndex } from "./useFocusedNodeIndex";
import Cover from "./Cover";
import Title from "./Title";
import BasicNode from "../node/BasicNode";
import Spacer from "./Spacer";
import { nanoid } from "nanoid";
import { useAppState } from "../state/AppStateContext";

export default function Page() {
  const { nodes, title, addNode, setTitle } = useAppState();
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });

  return (
    <>
      <Cover />
      <div className="mx-5">
        <Title addNode={addNode} title={title} onChangeTitle={setTitle} />

        {nodes.map((node, index) => {
          console.log(node);

          return (
            <BasicNode
              key={node.id}
              node={node}
              isFocused={focusedNodeIndex === index}
              updateFocusedIndex={setFocusedNodeIndex}
              index={index}
            />
          );
        })}
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
