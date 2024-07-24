import React, { useEffect, useState } from 'react';
import SearchInput from './SearchInput/SearchInput';
import InputNote from './InputNote/InputNote';
import { NoteList } from './NoteList';
import { formatDate, getInitialData, showFormattedDate } from '../utils';
import { notesService } from '../services/notesHttp';
import {
  Button,
  Checkbox,
  Datepicker,
  Label,
  Modal,
  Spinner,
  TextInput,
} from 'flowbite-react';
import IconRemove from '../../public/icon-trash.svg';

function NoteApp() {
  const maxLength = 50;
  const [notesList, setNotesList] = useState([]);
  const [searchNote, setSearchNote] = useState('');
  const [archive, setArchive] = useState([]);
  const [fields, setFields] = useState([{ value: '', is_completed: 0 }]);
  const [editFields, setEditFields] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [dataId, setDataId] = useState({});
  const [date, setDate] = useState('');
  const [addNote, setAddNote] = useState({
    title: '',
    date_note: '',
  });
  const [editNote, setEditNote] = useState({
    title: '',
    date_note: '',
  });

  useEffect(() => {
    const handleGetNotes = async (param) => {
      try {
        const response = await notesService.getNotes(param);
        if (response.status_code === 200) {
          setNotesList(response.data.data);
        } else {
          console.log('Failed to get notes');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };

    if (isLoading) {
      handleGetNotes(`?filter-date=${dateFilter}`);
    }
  }, [isLoading, dateFilter]);

  useEffect(() => {
    if (dataId?.date_note) {
      setDate(formatDate(dataId.date_note));
      setEditNote({
        title: dataId.title,
        date_note: formatDate(dataId.date_note),
      });
    }
  }, [dataId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!addNote.title && !addNote.date_note) return;

    const newListNote = {
      title: addNote.title,
      date_note: addNote.date_note,
      archived: 0,
    };

    handleAddNote(newListNote);
  };

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (name === 'title') {
      if (value.length > maxLength) return;
    }

    if (type == 'edit') {
      setEditNote({ ...editNote, [name]: value });
    } else {
      setAddNote({ ...addNote, [name]: value });
    }
  };

  const handleAddNote = async (newNote) => {
    try {
      const response = await notesService.postNote(newNote);
      if (response.status_code === 201) {
        handleAddNoteItems(response.data.note_id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateNote = async (id_note) => {
    const payload = {
      title: editNote.title,
      date_note: editNote.date_note,
    };
    try {
      const response = await notesService.putNote(id_note, payload);
      if (response.status_code === 200) {
        setIsLoading(true);
        handleUpdateNoteItems(response.data.note_id);
      } else {
        console.log('Failed to update note');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteNote = async (id, type) => {
    if (type === 'note') {
      const response = await notesService.deleteNote(id);
      if (response.status_code === 200) {
        setNotesList(notesList.filter((note) => note.id !== id));
        setIsLoading(true);
      } else {
        console.log('Failed to delete note');
      }
    } else {
      const response = await notesService.deleteNote(id);
      if (response.status_code === 200) {
        setArchive(archive.filter((archive) => archive.id !== id));
        setIsLoading(true);
      } else {
        console.log('Failed to delete note');
      }
    }
  };

  const onChangeCheckbox = (e, item_notes_id) => {
    const { checked, value } = e.target;
    let is_completed = 0;

    if (checked) {
      is_completed = 1;
    } else {
      is_completed = 0;
    }
    const payload = {
      is_completed,
      title: value,
    };

    handleUpdateItemsNote(item_notes_id, payload);
  };

  const handleUpdateItemsNote = async (id, payload) => {
    try {
      const response = await notesService.updateItemsNote(id, payload);

      if (response.status_code === 200) {
        setIsLoading(true);
      } else {
        console.log('Failed to update note items');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (noteId) => {
    const dataById = notesList.find((item) => item.id === noteId);
    setDataId(dataById);
    setModalOpen(true);
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

  const handleFilterDate = async (e) => {
    const { value } = e.target;

    setDateFilter(value);
    setIsLoading(true);
  };

  const handleDateChange = (date) => {
    const d = showFormattedDate(date);
    setDate(d);
    setEditNote({
      ...editNote,
      date_note: formatDate(date),
    });
  };

  const handleAddNoteItems = async (id) => {
    try {
      const payload = {
        id_notes: id,
        content: [],
      };

      fields.map((field) => {
        payload.content.push({
          title: field.value,
          is_completed: field.is_completed,
        });
      });

      const response = await notesService.postItemsNote(payload);

      if (response.status_code === 201) {
        setEditNote({
          title: '',
          date_note: '',
        });
        setFields([{ value: '', is_completed: 0 }]);
        setDateFilter('');
        setIsLoading(true);
      } else {
        console.log('Failed to add note items');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeEditNoteItems = (e, itemId) => {
    const { name, value } = e.target;
    setEditFields((prevFields) => {
      const index = prevFields.findIndex((field) => field.id === itemId);
      if (index !== -1) {
        const updatedFields = [...prevFields];
        updatedFields[index] = { ...updatedFields[index], [name]: value };

        return updatedFields;
      } else {
        return [...prevFields, { id: itemId, [name]: value }];
      }
    });
  };

  const handleDeleteNoteItem = async (note_id, items_id) => {
    try {
      const response = await notesService.deleteItemsNote(items_id);
      if (response.status_code === 200) {
        const updatedNotesList = notesList.map((note) => {
          if (note.id === note_id) {
            return {
              ...note,
              notes_item: note.notes_item.filter(
                (item) => item.id !== items_id
              ),
            };
          }
          return note;
        });

        const dataById = updatedNotesList.find((item) => item.id === note_id);

        setDataId(dataById);
        setIsLoading(true);
      } else {
        console.log('Failed to delete note items');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateNoteItems = async (id_notes) => {
    const payload = {
      content: editFields,
    };

    try {
      const response = await notesService.putNote(id_notes, payload);
      if (response.status_code === 200) {
        setIsLoading(true);
        setEditFields([]);
        setEditNote({
          title: '',
          date_note: '',
        });

        setTimeout(() => {
          setModalOpen(false);
        }, 1500);
      } else {
        console.log('Failed to update note items');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredNotes = notesList.filter((note) =>
    note.title.toLowerCase().includes(searchNote.toLowerCase())
  );

  const filteredArchive = archive.filter((note) =>
    note.title.toLowerCase().includes(searchNote.toLowerCase())
  );

  return (
    <section className="flex flex-wrap lg:flex-nowrap lg:justify-between gap-x-5 py-12 px-5">
      <div className="w-full lg:w-1/4">
        <h1 className="text-4xl font-semibold text-slate-100">
          My TodoList App
        </h1>
        <SearchInput
          handleSearch={handleSearch}
          handleFilterDate={handleFilterDate}
          title={searchNote}
        />
        <InputNote
          handleSubmit={handleSubmit}
          addNote={addNote}
          maxLength={maxLength}
          handleChange={handleChange}
          fields={fields}
          setFields={setFields}
        />
      </div>
      <div className="w-full lg:w-2/3">
        <NoteList
          notesList={filteredNotes}
          archive={filteredArchive}
          handleDeleteNote={handleDeleteNote}
          handleEdit={handleEdit}
          handleNote={handleNote}
          onChangeCheckbox={onChangeCheckbox}
        />
      </div>

      <Modal
        show={modalOpen}
        size="md"
        onClose={() => setModalOpen(false)}
        popup
      >
        <Modal.Header className="bg-gray-700 px-6">
          <span className="text-slate-100 text-xl">Edit TodoList</span>
        </Modal.Header>
        <Modal.Body className="bg-gray-700 pt-5">
          <div className="space-y-6">
            <div>
              <div className="mb-1 block">
                <Label
                  htmlFor="email"
                  className="text-slate-100"
                  value="Title"
                />
              </div>
              <TextInput
                id="email"
                placeholder="Title"
                name="title"
                defaultValue={dataId?.title}
                required
                style={{ marginBottom: '0', marginTop: '0' }}
                onChange={(e) => handleChange(e, 'edit')}
              />
            </div>
            {/* <div>
              <div className="mb-1 block">
                <Label
                  htmlFor="date"
                  className="text-slate-100"
                  value="Date Note"
                />
              </div>
              <Datepicker
                language="id"
                value={date}
                onSelectedDateChanged={handleDateChange}
              />
            </div> */}
            <div>
              <div className="mb-2 block">
                <Label className="text-slate-100" value="List TodoList" />
              </div>
              <div className="h-[250px] overflow-y-auto scroll__bar-items-note pr-2">
                {dataId?.notes_item?.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center gap-3"
                  >
                    <TextInput
                      id="password"
                      type="text"
                      required
                      defaultValue={item.title}
                      className="w-4/5 mb-0"
                      name="title"
                      onChange={(e) => changeEditNoteItems(e, item.id)}
                    />
                    <button
                      type="button"
                      className="bg-red-500 w-1/6 flex justify-center text-white px-4 py-2 rounded"
                      onClick={() => handleDeleteNoteItem(dataId?.id, item.id)}
                    >
                      <img src={IconRemove} alt="" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Button
                className="bg-cyan-500 w-full"
                onClick={() => handleUpdateNote(dataId?.id)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner aria-label="Spinner button example" size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  <span>Save</span>
                )}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default NoteApp;
