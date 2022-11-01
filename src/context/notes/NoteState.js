
import NoteContext from "./noteContext";
import React, { useState } from 'react';

const NoteState = (props)=>{

    const host = "http://localhost:5000"
    // const notesInitial = []
    const [notes, setNotes] = useState([]);

     // Get all Note
     const getAllNote = async() =>{
      // API CALL
      
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1MjU2YWNkOWFlNzA4ZGI4MmQ3N2M1In0sImlhdCI6MTY2NjM0NTU5M30.u4bH30DEP7_oSu9Q12iXyhGYernibZuk8zuY5VbFgyA'
          "auth-token": localStorage.getItem('token')
        }
      });
      
      const json = await response.json()
      setNotes(json);
    }
      // Add a Note
      const addNote = async(title,description,tag) =>{
        
        // API CALL
        
        const response = await fetch(`${host}/api/notes/addnewnotes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
            // 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1MjU2YWNkOWFlNzA4ZGI4MmQ3N2M1In0sImlhdCI6MTY2NjM0NTU5M30.u4bH30DEP7_oSu9Q12iXyhGYernibZuk8zuY5VbFgyA'
          },
         
          body: JSON.stringify({title,description,tag})
        });
        const note = await response.json(); 
        setNotes(notes.concat(note));
      }

      // Delete a Note
      const deleteNote = async (id) =>{

         // API CALL
      
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1MjU2YWNkOWFlNzA4ZGI4MmQ3N2M1In0sImlhdCI6MTY2NjM0NTU5M30.u4bH30DEP7_oSu9Q12iXyhGYernibZuk8zuY5VbFgyA'
          "auth-token": localStorage.getItem('token')
        }
      });
      
      const json = await response.json()
      
      const newNotes = notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes);
        
      }

      // Edit a Note
      const editNote = async (id, title, description, tag) =>{

        // API CALL
        
          const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem('token')
              // 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1MjU2YWNkOWFlNzA4ZGI4MmQ3N2M1In0sImlhdCI6MTY2NjM0NTU5M30.u4bH30DEP7_oSu9Q12iXyhGYernibZuk8zuY5VbFgyA'
            },
           
            body: JSON.stringify({title,description,tag})
          });
          const json = await response.json(); 
          
          
          let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic for edit in client
        for (let index = 0; index < notes.length; index++) {
          const element = newNotes[index];
          if(element._id === id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }
        setNotes(newNotes)
      }
    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getAllNote}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;