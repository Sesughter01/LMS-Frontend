import { Check } from "lucide-react";

interface Option {
  content: string;
  isCorrectOne?: string;
}

interface ContentOptionProps {
  option: Option;
  index: number;
}

const ContentOption: React.FC<ContentOptionProps> = ({ option, index }) => {

  return (
    <div className="flex items-center justify-between bg-white gap-6 border border-[#BEBEBE] rounded">
      <span className="text-[#1A183E] px-2 font-medium text-sm">
        {`Option ${index + 1}.`}
      </span>
      <input
        type="text"
        name={`option${option.content}`}
        id={`option${index + 1}`}
        value={option.content}
        className="py-1 px-4 rounded-lg bg-white focus:outline-none
          placeholder-gray-200::placeholder placeholder-opacity-75 flex-1 
          border border-[#BEBEBE]"
      />
      <button
        className={`flex border border-[#BEBEBE] px-2 py-4 items-center gap-1 ${
          option.isCorrectOne ? "bg-green-500" : "bg-[#9e9e9e]"
        }`}
        
      >
        <Check
          className={`w-4 h-4 ${option.isCorrectOne ? "text-white" : "text-[#7A7A7A]"}`}
        />
        <p
          className={`font-medium text-xs ${
            option.isCorrectOne ? "text-white" : "text-[#7A7A7A]"
          }`}
        >
          Mark as correct
        </p>
      </button>
    </div>
  );
};

export default ContentOption;
