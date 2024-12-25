import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { Button } from "@/components/shadcn/ui/button"

interface NoteDeleteConfirmationProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function NoteDeleteConfirmation({ isOpen, onClose, onConfirm }: NoteDeleteConfirmationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 100 }}
            className="bg-white rounded-lg p-6 w-80 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Are you sure?</h2>
            <p className="text-gray-600 mb-6">Do you really want to delete this cute note?</p>
            <div className="flex justify-center space-x-4">
              <Button
                onClick={onClose}
                variant="outline"
                className="rounded-full hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                onClick={onConfirm}
                className="rounded-full bg-red-400 hover:bg-red-500 text-white"
              >
                Delete
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

