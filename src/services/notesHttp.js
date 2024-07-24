import { todoList } from '../constants/api';

export const notesService = {
  getNotes(filter) {
    return todoList.get(`/notes${filter ? filter : ''}`);
  },

  putNote(id, payload) {
    return todoList.put(`/notes/${id}`, payload);
  },

  postNote(payload) {
    return todoList.post('/notes', payload);
  },

  deleteNote(id) {
    return todoList.delete(`/notes/${id}`);
  },

  postItemsNote(payload) {
    return todoList.post('/item-notes', payload);
  },

  updateItemsNote(id, payload) {
    return todoList.put(`/item-notes/${id}`, payload);
  },

  deleteItemsNote(id) {
    return todoList.delete(`/item-notes/${id}`);
  },
};
