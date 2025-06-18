import { memo } from "react";

interface ITextInput {
  onChange: (text: string) => void;
}

const TextInput = ({ onChange }: ITextInput) => {
  console.log("TextInput rendered");

  return (
    <input
      type="text"
      className="border p-4 rounded-lg border-blue-400"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default memo(TextInput);
