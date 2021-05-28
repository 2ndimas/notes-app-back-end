const { nanoid } = require("nanoid");
const notes = require("./notes");

// HANDLER UNTUK MENULIS NOTES dan menerima inputan dari clien
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload; // inputan dari aplikasi client

  const id = nanoid(16); // id ditambahkan otomatis dan di olah dari sisi server
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  // gunakan filter untuk mengetahui apakah newNote sudahmasuk ke dalam array notes

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// HANDLER UNTUK MENAMPILKAN SELURUH CATATAN
const getAllNotesHandler = () => ({
  status: 'succes',
  data: {
    notes,
  },
});

// HANDLER UNTUK DETAIL CATATAN -- MENDAPATKAN DATA BERDASARKAN ID CATATAN
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id) [0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

// HANDLER UNTUK EDIT DATA -- MENDAPATKAN ID CATATAN
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params; // mendapatkan nilai id

  // mendapatkan data yg dikirim oleh client melalui body request
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal meperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// HENDLER UNTUK DELETE
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params; // dapatkan id

  // dapatkan index dari object catatan dengan id yang di dapat
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'succes',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = { 
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};