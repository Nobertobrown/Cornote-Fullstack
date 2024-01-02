import { useState, useEffect } from "react";
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
    Id: "",
    title: "",
    body: "",
    isOpen: false,
  });

  useEffect(() => {
    document.addEventListener("keydown", checkEsc);
    return function cleanup() {
      document.removeEventListener("keydown", checkEsc);
    };
  }, []);

  function checkEsc(event) {
    // Get the key that was pressed
    const key = event.key;

    // Check if the key that was pressed is the "Enter" key
    if (key === "Escape") {
      setModalData({
        Id: "",
        title: "",
        body: "",
        isOpen: false,
      });
    }
  }

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

  function openModal(Id, Title, Body, status) {
    setModalData({
      id: Id,
      title: Title,
      body: Body,
      isOpen: status,
    });
  }

  function onUpdate(event) {
    // putNote(modalData);
    changeNotes((Notes) => {
      // const updatedNote = {
      //   ...Notes[modalData.Id],
      //   title: modalData.title,
      //   body: modalData.body,
      // };

      Notes = Notes.map((note) =>
        note.id !== modalData.Id ? note : modalData
      );
      return Notes;
    });

    setModalData({
      Id: "",
      title: "",
      body: "",
      isOpen: false,
    });
    event.preventDefault();
  }

  function closeModal(status) {
    setModalData({
      Id: "",
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
        handleUpdate={onUpdate}
      />
      <div className="grid-container">
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              _id={noteItem.id}
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

//add the update complete functionality when there is backend
//remember to use the id from the database