import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesLists";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => { 
  const[notes, setNotes] = useState([
    {
      id: nanoid(), 
      text: "This is my First Note!",
      date: "10/03/2022",
    },

    {
      id: nanoid(), 
      text: "This is my Second Note!",
      date: "11/03/2022",
    },

    {
      id: nanoid(), 
      text: "This is my Third Note!",
      date: "14/03/2022",
    },

    
    {
      id: nanoid(), 
      text: "This is my new Note!",
      date: "20/03/2022",
    },
]);

  const [searchText, setSearchText] = useState("");

  const [darkMode , setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data")
    );

    if(savedNotes){
      setNotes(savedNotes);
    }
  }, [])

  // useEffect saves our note to local storage anytime note changed
  useEffect(() => {
    localStorage.setItem(
      "react-notes-app-data", 
      JSON.stringify(notes) )
  }, [notes])

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id:nanoid(),
      text: text,
      date:date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);

};

const deleteNote = (id) => {
  const newNotes = notes.filter((note) =>note.id !== id);
  setNotes(newNotes);
};

    return ( 
      <div className= {`${darkMode && "dark-mode"}`}>
        <div className="container">
          <Header handleToggleDarkMode= {setDarkMode} />
          <Search handleSearchNote={setSearchText}/>
          <NotesList 
            notes={notes.filter((note) => 
              note.text.toLowerCase().includes(searchText)
            )} 
            handleAddNote = {addNote}
            handleDeleteNote={deleteNote}
            />
        </div>
      </div>
     
   );
};

export default App;