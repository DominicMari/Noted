import React, { createContext, useState, ReactNode } from 'react';

export type Note = {
  id: number;
  label: string;
  message: string;
};

type NotesContextType = {
  personalNotes: Note[];
  sharedNotes: Note[];
  addNote: (type: 'personal' | 'shared') => void;
  editNote: (type: 'personal' | 'shared', id: number, field: 'label' | 'message', value: string) => void;
  deleteNote: (type: 'personal' | 'shared', id: number) => void;
};

export const NotesContext = createContext<NotesContextType | undefined>(undefined);

type NotesProviderProps = {
  children: ReactNode;
};

let noteIdCounter = 100;

export const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
  const [personalNotes, setPersonalNotes] = useState<Note[]>([
    { id: 1, label: 'Buy groceries', message: 'Milk, eggs, bread' },
    { id: 2, label: 'Homework', message: 'Finish math assignment' },
  ]);
  const [sharedNotes, setSharedNotes] = useState<Note[]>([
    { id: 3, label: 'Team Project', message: 'Meeting at 3 PM' },
    { id: 4, label: 'Shared Task', message: 'Review presentation slides' },
  ]);

  const addNote = (type: 'personal' | 'shared') => {
    const newNote: Note = {
      id: ++noteIdCounter,
      label: 'New Note',
      message: 'Edit your note here...',
    };
    if (type === 'personal') {
      setPersonalNotes([newNote, ...personalNotes]);
    } else {
      setSharedNotes([newNote, ...sharedNotes]);
    }
  };

  const editNote = (type: 'personal' | 'shared', id: number, field: 'label' | 'message', value: string) => {
    const updateNotes = (notes: Note[]) =>
      notes.map(note => (note.id === id ? { ...note, [field]: value } : note));

    if (type === 'personal') {
      setPersonalNotes(updateNotes(personalNotes));
    } else {
      setSharedNotes(updateNotes(sharedNotes));
    }
  };

  const deleteNote = (type: 'personal' | 'shared', id: number) => {
    if (type === 'personal') {
      setPersonalNotes(personalNotes.filter(note => note.id !== id));
    } else {
      setSharedNotes(sharedNotes.filter(note => note.id !== id));
    }
  };

  return (
    <NotesContext.Provider value={{ personalNotes, sharedNotes, addNote, editNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};
