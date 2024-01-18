import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import Modal from "./components/Modal";
import { useLoaderData } from "react-router-dom";
import { deleteNote as syncDelete } from "./services/external-api.service";
import { updateNote } from "./services/external-api.service";

const DEFAULT_VALUE = {
  _id: "",
  id: "",
  title: "",
  body: "",
  bg: "",
  isOpen: false,
};

function App() {
  const data = useLoaderData();
  const [notes, changeNotes] = useState(data);
  const [modalData, setModalData] = useState(DEFAULT_VALUE);

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
      setModalData(DEFAULT_VALUE);
    }
  }

  //TODO: Solve error that occurs since the page needs to reload in order to populate the _id field
  //of a new note
  function addNote(note) {
    changeNotes((prevNotes) => {
      return [note, ...prevNotes];
    });
    window.location.reload();
  }
  // _id;
  function deleteNote(_id, id) {
    syncDelete(_id);
    changeNotes((prevNotes) => {
      return prevNotes.filter((_, index) => {
        return index !== id;
      });
    });
  }

  function openModal(_Id, Id, Title, Body, Bg, status) {
    console.log("Id received in the modal data", _Id)
    setModalData({
      _id: _Id,
      id: Id,
      title: Title,
      body: Body,
      bg: Bg,
      isOpen: status,
    });
  }

  //TODO either reformat the data before sending to database or fetch the note being edited
  function onUpdate(event) {
    console.log("modal data when updating note", modalData)
    const newNote = {
      _id: modalData._id,
      title: modalData.title,
      body: modalData.body
    }
    updateNote(modalData._id, newNote);
    changeNotes((prevNotes) => {
      const updatedNote = {
        ...prevNotes[modalData.id],
        title: modalData.title,
        body: modalData.body,
      };

      const newNotes = prevNotes.map((note, idx) => {
        return modalData.id === idx ? updatedNote : note;
      });

      //sorting the array to move the updated note to the beginning
      newNotes.sort(function (x, y) {
        return x.title == updatedNote.title && x.body == updatedNote.body
          ? -1
          : y.title == updatedNote.title && y.body == updatedNote.body
          ? 1
          : 0;
      });

      return newNotes;
    });

    setModalData(DEFAULT_VALUE);
    event.preventDefault();
  }

  function closeModal(status) {
    setModalData({
      _id: "",
      id: "",
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
        bg_color={modalData.bg}
        showModal={modalData.isOpen}
        onClose={closeModal}
        onChange={setModalData}
        handleUpdate={onUpdate}
      />
      <div className="grid-container">
        {notes.map((noteItem, index) => {
          /**
          TODO Apply the date of creation/editing
          **/
          // Calculate the class name to apply to the note
          const bgClassName = `bg-${(index % 5) + 1}`;
          return (
            <Note
              key={index}
              id={index}
              bg={bgClassName}
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
