import './App.css';
import './index.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DUMMY_NOTES from './DUMMY_NOTES';
import Note from './components/Note/Note';
import INote from './interfaces/note.interface';

function App() {
  const [notesList, setNotesList] = useState<any[]>([]);

  useEffect(() => {
    const listFromStorage = localStorage.getItem("my-notes");
    if (listFromStorage) {
      const listFromStorageArray = JSON.parse(listFromStorage);
      setNotesList(listFromStorageArray);
    } else {
      setNotesList(DUMMY_NOTES);
    }
  }, []);

  useEffect(() => {
    const notesListString = JSON.stringify(notesList);
    localStorage.setItem('my-notes', notesListString);
  }, [notesList])

  // const getNotes = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/notes");
  //     setNotesList(response.data.notes);
  //     console.log(notesList);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  const updateNoteItem = (updatedNote: INote) => {
    const updatedList = notesList.map((noteItem: INote) => {
      if (noteItem._id === updatedNote._id) {
        return updatedNote
      }
      return noteItem
    })
    setNotesList(updatedList);
  }

  return (
    <div className="App">
      <div className="notes-list">
        {
          notesList.map((noteItem, index) => {
            return <Note note={noteItem} onNoteUpdate={updateNoteItem} key={index} />
          })
        }
      </div>
    </div>
  );
}

export default App;
