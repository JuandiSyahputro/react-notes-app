import React from 'react';
import IconAdd from '../../../public/icon-add.svg';
import IconRemove from '../../../public/icon-trash.svg';
import { Spinner } from 'flowbite-react';

const InputNote = (props) => {
  const {
    handleSubmit,
    addNote,
    maxLength,
    handleChange,
    fields,
    setFields,
    isSubmit,
  } = props;

  const addField = () => {
    setFields([...fields, { value: '', is_completed: 0 }]);
  };

  const removeField = () => {
    if (fields.length > 1) {
      setFields(fields.slice(0, -1));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="block w-full">
        <div className="w-full">
          <label
            htmlFor="title"
            className="text-base font-semibold mb-1 text-end text-slate-100"
          >
            Judul {addNote?.title.length} / {maxLength}
          </label>
          <input
            type="text"
            placeholder="Title"
            onChange={handleChange}
            className="focus:ring-2 focus:ring-blue-500 bg-transparent focus:outline-none w-full"
            id="title"
            name="title"
            defaultValue={addNote?.title}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="date_note"
            className="text-base font-semibold mb-1 text-end text-slate-100"
          >
            Tanggal Pengerjaan TodoList
          </label>
          <input
            type="date"
            placeholder="Date Note"
            onChange={handleChange}
            className="focus:ring-2 focus:ring-blue-500 bg-transparent focus:outline-none w-full"
            id="date_note"
            name="date_note"
            defaultValue={addNote?.date_note}
          />
        </div>
        <h2 className="text-base font-semibold mb-1 text-slate-100">
          Masukan List TodoList
        </h2>
        {fields.map((field, index) => (
          <div key={index}>
            <input
              type="text"
              value={field.value}
              placeholder={`List - ${index + 1}`}
              onChange={(e) => {
                const updatedFields = [...fields];
                updatedFields[index].value = e.target.value;
                setFields(updatedFields);
              }}
              className="focus:ring-2 bg-transparent focus:ring-blue-500 focus:outline-none w-full"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addField}
          className="bg-cyan-500 text-white px-4 py-2 rounded mr-2"
        >
          <img src={IconAdd} alt="" />
        </button>
        <button
          type="button"
          onClick={removeField}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          <img src={IconRemove} alt="" />
        </button>
      </div>
      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
        >
          {isSubmit ? (
            <>
              <Spinner aria-label="Spinner button example" size="sm" />
              <span className="pl-3">Loading...</span>
            </>
          ) : (
            <>
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="mr-2"
                aria-hidden="true"
              >
                <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
              </svg>
              Submit
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default InputNote;
