"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Note } from "./Note";
import { NoteDeleteConfirmation } from "./NoteDeleteConfirmation";
import { NoteInput } from "./NoteInput";

interface Note {
  id: string;
  content: string;
}

export function NoteTaker() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const notesContainerRef = useRef<HTMLDivElement>(null);

  const addNote = (content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const deleteNote = (id: string) => {
    setNoteToDelete(id);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    if (noteToDelete) {
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== noteToDelete)
      );
      setShowConfirmation(false);
      setNoteToDelete(null);
    }
  };

  useEffect(() => {
    if (notesContainerRef.current) {
      notesContainerRef.current.scrollTop =
        notesContainerRef.current.scrollHeight;
    }
  }, [notes]);

  return (
    <div className="w-full p-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl min-h-80 max-h-80 flex flex-col">
      <div
        ref={notesContainerRef}
        className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent"
      >
        <AnimatePresence>
          <NoteInput onAddNote={addNote} />
          {notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              onDelete={() => deleteNote(note.id)}
            />
          ))}
        </AnimatePresence>
      </div>
      <NoteDeleteConfirmation
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
