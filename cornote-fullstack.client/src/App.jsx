import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import { useLoaderData } from "react-router-dom";
import { deleteNote as syncDelete } from "./services/external-api.service";

function App() {
  const data = useLoaderData();
  const [notes, changeNotes] = useState(data);

  function addNote(note) {
    changeNotes((prevNotes) => {
      return [note, ...prevNotes];
    });
  }

  function deleteNote(id, _id) {
    syncDelete(_id);
    changeNotes((prevNotes) => {
      return prevNotes.filter((aNote, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
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
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
