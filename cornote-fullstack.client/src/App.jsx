import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import Modal from "./components/Modal";
// import { useLoaderData } from "react-router-dom";
// import { deleteNote as syncDelete } from "./services/external-api.service";

const DEFAULT_VALUE = {
  id: "",
  title: "",
  body: "",
  bg: "",
  isOpen: false,
};

function App() {
  // const data = useLoaderData();
  const [notes, changeNotes] = useState([]);
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

  function openModal(Id, Title, Body, Bg, status) {
    setModalData({
      id: Id,
      title: Title,
      body: Body,
      bg: Bg,
      isOpen: status,
    });
  }

  function onUpdate(event) {
    // putNote(modalData);
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
