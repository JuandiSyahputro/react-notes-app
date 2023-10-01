import React from "react";
import NoteItem from "./NoteItem";
import NoteArchive from "./NoteArchive";
import lottie from "../../../public/lottie.gif";
export const NoteList = (props) => {
  const { notesList, handleNote, handleDeleteNote, handleArchiveNote, archive } = props;
  return (
    <>
      <h2 className="text-2xl font-semibold mb-2 text-slate-100">List Notes</h2>
      <div className="mb-5 border-2 bg-neutral-900 p-5 overflow-x-auto gap-x-5 flex w-full">
        {notesList.length > 0 ? (
          notesList.map((note) => <NoteItem item={note} key={note.id} handleDeleteNote={handleDeleteNote} handleArchiveNote={handleArchiveNote} />)
        ) : (
          <div className="block mx-auto w-100">
            <div className="flex justify-center">
              <img src={lottie} alt="lottie" width={150} height={150} />
            </div>
            <h1 className="text-2xl font-semibold mb-2 text-slate-100 mt-5">Oppsss... Notes is empty</h1>
          </div>
        )}
      </div>
      <h2 className="text-2xl font-semibold mb-2 text-slate-100">Archive Notes</h2>
      <div className=" border-2 bg-neutral-900 p-5 overflow-x-auto gap-x-5 flex w-full">
        {archive.length > 0 ? (
          archive.map((note) => <NoteArchive item={note} key={note.id} handleDeleteNote={handleDeleteNote} handleNote={handleNote} />)
        ) : (
          <div className="block mx-auto w-100">
            <div className="flex justify-center">
              <img src={lottie} alt="lottie" width={150} height={150} />
            </div>
            <h1 className="text-2xl font-semibold mb-2 text-slate-100 mt-5">Oppsss... Archive is empty</h1>
          </div>
        )}
      </div>
    </>
  );
};
