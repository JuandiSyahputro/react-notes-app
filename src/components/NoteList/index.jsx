import React, { useState } from 'react';
import lottie from '../../../public/lottie.gif';
import NoteArchive from './NoteArchive';
import NoteItem from './NoteItem';
export const NoteList = (props) => {
  const {
    notesList,
    handleNote,
    handleDeleteNote,
    handleEdit,
    archive,
    onChangeCheckbox,
  } = props;
  const [showArchive, setShowArchive] = useState(false);

  return (
    <>
      <h2 className="text-2xl font-semibold mb-2 text-slate-100">TodoList</h2>
      <div className="mb-5 border-2 bg-neutral-900 p-5 h-full overflow-x-auto gap-x-5 flex w-full">
        {notesList.length > 0 ? (
          notesList.map((note) => (
            <NoteItem
              item={note}
              key={note.id}
              handleDeleteNote={handleDeleteNote}
              handleEdit={handleEdit}
              onChangeCheckbox={onChangeCheckbox}
            />
          ))
        ) : (
          <div className="grid place-items-center h-full w-full">
            <div className="grid place-items-center">
              <img src={lottie} alt="lottie" width={200} height={200} />
              <h1 className="text-2xl font-semibold mb-2 text-slate-100 mt-5">
                Oppsss... TodoList is empty
              </h1>
            </div>
          </div>
        )}
      </div>
      {/* <div className="flex justify-between mb-3">
        <h2 className="text-2xl font-semibold mb-2 text-slate-100">
          Archive TodoList
        </h2>
        <button
          type="button"
          className="bg-emerald-500 text-white px-4 py-2 rounded-md mr-2"
          onClick={() => setShowArchive(!showArchive)}
        >
          {!showArchive ? 'Show' : 'Hide'} Archive
        </button>
      </div>
      <div
        className={`border-2 bg-neutral-900 p-5 overflow-x-auto gap-x-5 w-full ${
          showArchive ? 'flex' : 'hidden'
        }`}
      >
        {archive.length > 0 ? (
          archive.map((note) => (
            <NoteArchive
              item={note}
              key={note.id}
              handleDeleteNote={handleDeleteNote}
              handleNote={handleNote}
            />
          ))
        ) : (
          <div className="block mx-auto w-100">
            <div className="flex justify-center">
              <img src={lottie} alt="lottie" width={150} height={150} />
            </div>
            <h1 className="text-2xl font-semibold mb-2 text-slate-100 mt-5">
              Oppsss... Archive is empty
            </h1>
          </div>
        )}
      </div> */}
    </>
  );
};
