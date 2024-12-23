type SpacerProps = {
  handelClick(): void;
  showHint: boolean;
};
export default function Spacer({ handelClick, showHint }: SpacerProps) {
  return (
    <div className="h-10 w-full px-2  text-gray-400" onClick={handelClick}>
      {showHint && "Click to Create First Paragraph"}
    </div>
  );
}
