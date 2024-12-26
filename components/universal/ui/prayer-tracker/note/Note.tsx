import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Sparkles, Check, GripVertical } from 'lucide-react';
import { Button } from "@/components/shadcn/ui/button";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { Input } from "@/components/shadcn/ui/input";
import { useState, useEffect, useRef } from "react";

interface NoteProps {
  note: { id: string; content: string };
  onDelete: () => void;
  onUpdate: (id: string, content: string) => void;
}

export function Note({ note, onDelete, onUpdate }: NoteProps) {
  const [checked, setChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note.content);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    if (!checked) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    onUpdate(note.id, editedContent);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedContent(note.content);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    setEditedContent(note.content);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className="bg-white rounded-lg p-4 shadow-md flex items-center justify-between"
      style={{ boxShadow: "0 4px 14px 0 rgba(255, 192, 203, 0.39)" }}
    >
      <div className="flex items-center justify-center gap-2 flex-grow">
        <GripVertical className="text-gray-400 cursor-move" size={16} />
        <Checkbox
          id={note.id}
          checked={checked}
          onCheckedChange={(isChecked) => setChecked(isChecked as boolean)}
        />
        <div className="relative flex-grow max-w-screen-sm truncate" onDoubleClick={handleDoubleClick}>
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center"
              >
                <Input
                  ref={inputRef}
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSave}
                  className="ml-2"
                >
                  <Check className="w-4 h-4 text-green-500" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`text-gray-800 flex-1 break-words ${
                  checked ? "text-gray-500" : ""
                }`}
              >
                {note.content}
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {checked && !isEditing && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ width: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 top-1/2 h-0.5 bg-gray-400"
              />
            )}
          </AnimatePresence>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="text-red-400 hover:text-red-600 hover:bg-red-100 rounded-full ml-2 flex-shrink-0"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </motion.div>
  );
}

