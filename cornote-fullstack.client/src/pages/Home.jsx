import { useState, useEffect } from "react";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import Modal from "../components/Modal";
import { useLoaderData } from "react-router-dom";
import {
  deleteNote as syncDelete,
  updateNote,
  getUserData,
  postUser,
} from "../services/external-api.service";
import { useAuth0 } from "@auth0/auth0-react";
import localforage from "localforage";
import { getConfig } from "../config";

const DEFAULT_VALUE = {
  _id: "",
  id: "",
  title: "",
  body: "",
  bg: "",
  isOpen: false,
};

const config = getConfig();

const Home = () => {
  const data = useLoaderData();
  const [notes, changeNotes] = useState(data ? data : []);
  const [modalData, setModalData] = useState(DEFAULT_VALUE);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const createUser = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently();
          const userInfoAccessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: `https://${config.domain}/userinfo`,
              scope: config.scope,
            },
          });
          const userData = await getUserData(
            userInfoAccessToken,
            config.domain
          );
          setUser(userData);
          const newUser = {
            Auth0Id: userData.sub,
            name: userData.nickname,
            email: userData.email,
          };
          await postUser(newUser);
          await localforage.setItem("token", accessToken);
        } catch (error) {
          console.log(error);
        }
      }
    };
    createUser();
  }, [isAuthenticated, getAccessTokenSilently]);

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
  function deleteNote(_id, id) {
    syncDelete(_id);
    changeNotes((prevNotes) => {
      return prevNotes.filter((_, index) => {
        return index !== id;
      });
    });
  }

  function openModal(_Id, Id, Title, Body, Bg, status) {
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
    const updatedData = {
      UserId: user.sub,
      title: modalData.title,
      body: modalData.body,
    };
    updateNote(modalData._id, updatedData);
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
    <main>
      <CreateArea user={user} onAdd={addNote} />
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
    </main>
  );
};

export default Home;

// TODO: Check all async fxns called without the await keyword
