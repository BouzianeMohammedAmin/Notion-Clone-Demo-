import { NodeData } from "../utils/types";
import {
  useEffect,
  useRef,
  FormEventHandler,
  KeyboardEventHandler,
} from "react";
import { nanoid } from "nanoid";

type BasicNodeProps = {
  node: NodeData;
  updateFocusedIndex(index: number): void;
  isFocused: boolean;
  addNode(node: NodeData, index: number): void;
  removeNodByIndex(index: number): void;
  changeValue(index: number, value: string): void;
  index: number;
};

export default function BasicNode({
  node,
  updateFocusedIndex,
  isFocused,
  addNode,
  removeNodByIndex,
  changeValue,
  index,
}: BasicNodeProps) {
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
    changeValue(index, textContent || "");
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
        removeNodByIndex(index);
        updateFocusedIndex(index - 1);
      } else if (window?.getSelection()?.anchorOffset === 0) {
        // cursor in the beginning of content
        event.preventDefault();
        removeNodByIndex(index - 1);
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
