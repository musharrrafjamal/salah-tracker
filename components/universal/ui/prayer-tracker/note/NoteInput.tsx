import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpenCheck, PlusCircle, X } from "lucide-react";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";

interface NoteInputProps {
  onAddNote: (content: string) => void;
}

export function NoteInput({ onAddNote }: NoteInputProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onAddNote(inputValue.trim());
      setInputValue("");
      setIsExpanded(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-md px-4 h-16 ${
        !isExpanded ? "cursor-pointer" : ""

      }`}
      style={{ boxShadow: "0 4px 14px 0 rgba(255, 192, 203, 0.39)" }}
      onClick={() => {
        if (!isExpanded) {
          setIsExpanded(true);
        }
      }}
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            key="button"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
          >
            <span className="text-gray-800 flex items-center gap-2">
              Add a note <PlusCircle className="w-4 h-4" />
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="input"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                maxLength={100}
                placeholder="Write a note..."
                icon={<BookOpenCheck className="w-4 h-4" />}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              <Button
                onClick={handleSubmit}
                variant={"default"}
                size={"icon"}
                className="w-11 bg-gradient-to-br from-pink-400 to-violet-400 hover:shadow-lg transition-all duration-300 text-white"
              >
                <PlusCircle className="w-8 h-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(false)}
                className="rounded-full text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
