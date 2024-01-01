import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import Modal from "./components/Modal";
// import { useLoaderData } from "react-router-dom";
// import { deleteNote as syncDelete } from "./services/external-api.service";

function App() {
  // const data = useLoaderData();
  const [notes, changeNotes] = useState([]);
  const [modalData, setModalData] = useState({
    title: "",
    body: "",
    isOpen: false,
  });

  function addNote(note) {
    changeNotes((prevNotes) => {
      return [note, ...prevNotes];
    });
  }
  // _id;
  function deleteNote(id) {
    // syncDelete(_id);
    changeNotes((prevNotes) => {
      return prevNotes.filter((_, index) => {
        return index !== id;
      });
    });
  }

  function openModal(Title, Body, status) {
    setModalData({
      title: Title,
      body: Body,
      isOpen: status,
    });
  }

  function closeModal(status) {
    setModalData({
      title: "",
      body: "",
      isOpen: status,
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <Modal
        title={modalData.title}
        body={modalData.body}
        showModal={modalData.isOpen}
        onClose={closeModal}
        onChange={setModalData}
      />
      <div className="grid-container">
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              // _id={noteItem.id}
              title={noteItem.title}
              body={noteItem.body}
              onDelete={deleteNote}
              onEdit={openModal}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
