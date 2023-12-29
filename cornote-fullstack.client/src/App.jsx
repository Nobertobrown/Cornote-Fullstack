import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import { useLoaderData } from "react-router-dom";

function App() {
  const data = useLoaderData();
  const [notes, changeNotes] = useState(data);

  function addNote(note) {
    changeNotes((prevNotes) => {
      return [note, ...prevNotes];
    });
  }

  function deleteNote(id) {
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
