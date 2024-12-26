"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  const notesContainerRef = useRef<HTMLDivElement | null>(null);

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
      notesContainerRef.current.scrollTop = notesContainerRef.current.scrollHeight;
    }
  }, [notes]);

  const handleUpdateNote = (id: string, content: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, content } : note
      )
    );
  };

  const [draggedNote, setDraggedNote] = useState<Note | null>(null);

  const handleDragStart = (note: Note) => {
    setDraggedNote(note);
  };

  const handleDragOver = (e: React.DragEvent, targetNote: Note) => {
    e.preventDefault();
    if (!draggedNote || draggedNote.id === targetNote.id) return;

    const draggedIndex = notes.findIndex(n => n.id === draggedNote.id);
    const targetIndex = notes.findIndex(n => n.id === targetNote.id);
    
    if (draggedIndex === targetIndex) return;

    const newNotes = [...notes];
    newNotes.splice(draggedIndex, 1);
    newNotes.splice(targetIndex, 0, draggedNote);
    setNotes(newNotes);
  };

  const handleDragEnd = () => {
    setDraggedNote(null);
  };

  return (
    <div className="w-full p-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl min-h-80 max-h-80 flex flex-col">
      <div
        ref={notesContainerRef}
        className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent"
      >
        <AnimatePresence>
          <NoteInput onAddNote={addNote} />
          {notes.map((note) => (
            <div
              key={note.id}
              draggable
              onDragStart={() => handleDragStart(note)}
              onDragOver={(e) => handleDragOver(e, note)}
              onDragEnd={handleDragEnd}
            >
              <Note
                note={note}
                onDelete={() => deleteNote(note.id)}
                onUpdate={handleUpdateNote}
              />
            </div>
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