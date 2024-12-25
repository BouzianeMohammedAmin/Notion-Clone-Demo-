import { NodeData } from "../utils/types";
import {
  useEffect,
  useRef,
  FormEventHandler,
  KeyboardEventHandler,
} from "react";
import { nanoid } from "nanoid";
import { useAppState } from "../state/AppStateContext";

type BasicNodeProps = {
  node: NodeData;
  updateFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
};

export default function BasicNode({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}: BasicNodeProps) {
  const { addNode, changingNodeValue, removeNodeByIndex } = useAppState();

  const nodeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isFocused) {
      nodeRef.current?.focus();
    } else {
      nodeRef.current?.blur();
    }
  }, [isFocused]);
  useEffect(() => {
    if (nodeRef.current && !isFocused) {
      nodeRef.current.textContent = node.value;
    }
  }, [node]);

  const handelInput: FormEventHandler<HTMLDivElement> = ({ currentTarget }) => {
    const { textContent } = currentTarget;
    changingNodeValue(textContent || "", index);
  };
  const handelClick = () => {
    updateFocusedIndex(index);
  };
  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement;
    if (event.key == "Enter") {
      event.preventDefault();

      if (target.textContent?.[0] === "/") {
        return;
      }
      addNode({ type: node.type, value: "", id: nanoid() }, index + 1);
      updateFocusedIndex(index + 1);
    }
    if (event.key == "Backspace") {
      if (target.textContent?.length === 0) {
        event.preventDefault();
        removeNodeByIndex(index);
        updateFocusedIndex(index - 1);
      } else if (window?.getSelection()?.anchorOffset === 0) {
        // cursor in the beginning of content  or selected  all content text of node
        event.preventDefault();
        removeNodeByIndex(index - 1);
        updateFocusedIndex(index - 1);
      }
    }
  };

  return (
    <div
      className="mx-2 px-2 outline-none bg-slate-50"
      onInput={handelInput}
      onClick={handelClick}
      onKeyDown={onKeyDown}
      contentEditable
      suppressContentEditableWarning
      ref={nodeRef}
    />
  );
}
