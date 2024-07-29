import { Spinner } from 'flowbite-react';
import React from 'react';
import IconAdd from '../../../public/icon-add.svg';

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
  // const dataField = fields.reverse();
  const [valField, setValField] = React.useState('');

  const addField = () => {
    if (valField) {
      const newField = { value: valField, is_completed: 0 };
      setFields((prevFields) => [newField, ...prevFields]);
    }

    setValField('');
  };

  const handleKeydown = (e) => {
    if (e.key === 'Enter' && valField) {
      addField();
    }
  };

  const removeField = (idx) => {
    setFields(fields.filter((_, index) => index !== idx));
  };
  const handleChangeInputList = (e) => {
    const { value } = e.target;
    setValField(value);
  };

  return (
    <form>
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
            value={addNote?.title || ''}
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
            value={addNote?.date_note || ''}
          />
        </div>
        <h2 className="text-base font-semibold mb-1 text-slate-100">
          Masukan List TodoList
        </h2>
        <div className="flex overflow-y-auto pb-1 gap-2 w-full overflow__multiple-input">
          {fields.map((field, index) => (
            <div key={index} className="w-full inline-flex">
              <div className="flex items-center gap-2 bg-rose-500 text-white rounded-md px-3 py-1 m-1">
                <input
                  type="text"
                  value={field.value}
                  placeholder={`List - ${index + 1}`}
                  onChange={(e) => {
                    const updatedFields = [...fields];
                    updatedFields[index].value = e.target.value;
                    setFields(updatedFields);
                  }}
                  className="focus:ring-2 ring-1 ring-white py-0 my-0 placeholder:text-white border-0 bg-transparent focus:ring-blue-500 focus:outline-none"
                  size={field.value.length || 1}
                />
                <button
                  type="button"
                  onClick={() => removeField(index)}
                  className="text-white mb-[5px]"
                >
                  <span>&times;</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full mb-2">
          <input
            type="text"
            placeholder={`Masukan List TodoList`}
            value={valField || ''}
            onChange={handleChangeInputList}
            onKeyDown={handleKeydown}
            className="focus:ring-2 bg-transparent focus:ring-blue-500 focus:outline-none w-full pb-1 mb-1"
          />
          <b>
            <span className="text-red-500">*</span>
            <i className="text-slate-100 text-[10px]">
              Klik Enter / Button untuk menambahkan data.
            </i>
          </b>
        </div>
        <button
          type="button"
          onClick={addField}
          className="bg-cyan-500 text-white px-4 py-2 rounded mr-2"
        >
          <img src={IconAdd} alt="" />
        </button>
      </div>
      <div className="flex items-center justify-end">
        <button
          type="button"
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
          onClick={handleSubmit}
          disabled={isSubmit}
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
