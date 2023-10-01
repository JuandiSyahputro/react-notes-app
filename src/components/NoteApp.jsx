import React, { useState } from "react";
import SearchInput from "./SearchInput/SearchInput";
import InputNote from "./InputNote/InputNote";
import { NoteList } from "./NoteList";
import { getInitialData } from "../utils";

function NoteApp() {
  const [notesList, setNotesList] = useState(getInitialData);
  const [searchNote, setSearchNote] = useState("");
  const [archive, setArchive] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const maxLength = 50;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title && !content) return;

    const newListNote = { id: +new Date(), title: title, body: content, archived: false, createdAt: new Date() };
    handleAddNote(newListNote);

    setTitle("");
    setContent("");
  };

  const handleChange = (e) => {
    const inputTitle = e.target.value;
    if (inputTitle.length > maxLength) return;
    setTitle(inputTitle);
  };

  const handleAddNote = (newNote) => {
    setNotesList([...notesList, newNote]);
  };
  const handleDeleteNote = (id, type) => {
    if (type === "note") {
      setNotesList(notesList.filter((note) => note.id !== id));
    } else {
      setArchive(archive.filter((archive) => archive.id !== id));
    }
  };

  const handleArchiveNote = (noteId) => {
    const updatedData = notesList.map((item) => {
      if (item.id === noteId) {
        return { ...item, archived: true };
      }
      return item;
    });

    const archivedItem = updatedData.find((item) => item.id === noteId);
    if (archivedItem) {
      setArchive([...archive, archivedItem]);
    }

    const newData = updatedData.filter((item) => item.id !== noteId);
    setNotesList(newData);
  };

  const handleNote = (noteId) => {
    const updatedNoteList = archive.filter((item) => item.id !== noteId);

    const updateNote = archive.find((item) => item.id === noteId);
    if (updateNote) {
      setNotesList([...notesList, updateNote]);
    }

    setArchive(updatedNoteList);
  };

  const handleSearch = (e) => {
    const searchNote = e.target.value;
    setSearchNote(searchNote);
  };

  const filteredNotes = notesList.filter((note) => note.title.toLowerCase().includes(searchNote.toLowerCase()));

  const filteredArchive = archive.filter((note) => note.title.toLowerCase().includes(searchNote.toLowerCase()));

  return (
    <section className="flex justify-between gap-x-5 py-12 px-5">
      <div className="w-1/4">
        <h1 className="text-4xl font-semibold text-slate-100">My Notes App</h1>
        <SearchInput handleSearch={handleSearch} title={searchNote} />
        <InputNote handleSubmit={handleSubmit} title={title} maxLength={maxLength} handleChange={handleChange} content={content} setContent={setContent} />
      </div>
      <div className="w-2/3">
        <NoteList notesList={filteredNotes} archive={filteredArchive} handleDeleteNote={handleDeleteNote} handleArchiveNote={handleArchiveNote} handleNote={handleNote} />
      </div>
    </section>
  );
}

export default NoteApp;
