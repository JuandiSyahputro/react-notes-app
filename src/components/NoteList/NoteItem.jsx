import React from 'react';
import { showFormattedDate } from '../../utils';
import IconEdit from '../../../public/icon-edit.svg';

const NoteItem = (props) => {
  const { item, handleDeleteNote, handleEdit, onChangeCheckbox } = props;

  const renderNoteItems = (data) => {
    return (
      <div className="h-[250px] pr-2 overflow-y-auto scroll__bar-items-note">
        {data?.notes_item?.map((item_note, index) => (
          <div className="flex justify-between mb-2" key={item_note.id}>
            <label
              htmlFor={`default-checkbox-${index + 1}`}
              className={`text-md flex items-center font-medium  ${
                item_note.is_completed
                  ? 'line-through text-slate-600'
                  : 'text-slate-100 dark:text-slate-100'
              }`}
            >
              {item_note.title}
            </label>
            <input
              id={`default-checkbox-${index + 1}`}
              type="checkbox"
              className=" text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 w-5 h-5"
              value={item_note.title}
              checked={item_note.is_completed}
              onChange={(e) => onChangeCheckbox(e, item_note.id)}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div key={item.id} className="">
      <div className="bg-stone-950 min-h-[350px] h-full flex flex-col justify-between rounded-lg w-96">
        <div className="px-6 py-2">
          <dl className="mb-5">
            <dd className="text-slate-500 text-end mb-5 text-sm font-semibold">
              {showFormattedDate(item.date_note)}
            </dd>
            <dt className="text-3xl uppercase font-semibold text-slate-100 mb-3 break-all">
              {item.title}
            </dt>
          </dl>
          {renderNoteItems(item)}
        </div>
        <div className="px-6 pb-6 flex justify-between">
          <button
            className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-full inline-block"
            onClick={() => handleDeleteNote(item.id, 'note')}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 flex items-center hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded-full gap-2"
            onClick={() => handleEdit(item.id)}
          >
            <span>Edit</span> <img src={IconEdit} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
