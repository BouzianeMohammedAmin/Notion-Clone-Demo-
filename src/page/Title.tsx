import { useRef, useEffect } from "react";
import { NodeData } from "../utils/types";
import { nanoid } from "nanoid";
type TitleProps = {
  title: string;
  onChangeTitle(title: string): void;
  addNode(nodeData: NodeData, index: number): void; //index of title = 0
};

export default function Title({ title, onChangeTitle, addNode }: TitleProps) {
  
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const isFocused = document.activeElement == headerRef.current;
    if (!isFocused && headerRef.current) {
      headerRef.current.textContent = title;
    }
  }, [title]);

  return (
    <div className=" mt-5  px-20 max-w-4xl ">
      <h1
        className="outline-none text-2xl font-bold"
        contentEditable
        suppressContentEditableWarning
        ref={headerRef}
        onInput={(e) => onChangeTitle(e.currentTarget.textContent || "")}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            addNode({ type: "text", id: nanoid(), value: "" }, 0);
          }
        }}
      />
    </div>
  );
}
