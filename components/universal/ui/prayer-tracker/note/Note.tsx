import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { Button } from "@/components/shadcn/ui/button"
import { Checkbox } from "@/components/shadcn/ui/checkbox"
import { useState } from 'react'

interface NoteProps {
  note: { id: string; content: string }
  onDelete: () => void
}

export function Note({ note, onDelete }: NoteProps) {
  const [checked, setChecked] = useState("")
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className="bg-white rounded-lg p-4 shadow-md flex items-center justify-between"
      style={{ boxShadow: "0 4px 14px 0 rgba(255, 192, 203, 0.39)" }}
    >
      <div className="flex items-center justify-center gap-2">
        <Checkbox id={note.id} onCheckedChange={() => setChecked(note.id)} />
        <motion.label
          htmlFor={note.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-gray-800 flex-1 break-words ${checked === note.id ? "line-through" : ""}`}
        >
          {note.content}
        </motion.label>
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
  )
}

