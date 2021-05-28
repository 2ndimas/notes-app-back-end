const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require("./handler");

const routes = [
  {
    // ROUTES UNTUK MENULIS CATATAN
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    // ROUTES UNTUK MENAMPILKAN SELURUH CATATAN
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    // ROUTES UNTUK menampilkan catatan tertentu MENDAPATKAN DENGAN ID TERTENTU
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    // ROUTES MENDAPATKAN ID CATATAN UNTUK KEPERLUAN EDIT CATATAN
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  {
    // ROUTES UNTUK DELETE MENGGUNAKAN ID
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;