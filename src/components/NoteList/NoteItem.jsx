import React from "react";
import { showFormattedDate } from "../../utils";

const NoteItem = (props) => {
  const { item, handleDeleteNote, handleArchiveNote } = props;
  return (
    <div key={item.id} className="">
      <div className="bg-stone-950 min-h-[350px] flex flex-col justify-between rounded-lg w-96">
        <div className="px-6 py-4">
          <dl>
            <dt className="text-lg font-semibold text-slate-100">{item.title}</dt>
            <dd className="text-slate-500 text-sm py-2 font-semibold">{showFormattedDate(item.createdAt)}</dd>
            <p className="text-slate-100">{item.body}</p>
          </dl>
        </div>
        <div className="px-6 py-4 flex justify-between">
          <button className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-full inline-block" onClick={() => handleDeleteNote(item.id, "note")}>
            delete
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full inline-block" onClick={() => handleArchiveNote(item.id)}>
            archive
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
