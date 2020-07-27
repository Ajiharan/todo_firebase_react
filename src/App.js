import React,{useState,useEffect} from 'react';
import { FormControl,InputLabel,Input,Button} from '@material-ui/core';
import './App.css';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';
import { css } from "@emotion/core";
import {ClipLoader,DotLoader,BounceLoader,BeatLoader} from "react-spinners";
 

function App() {
  const [todos,setTodos]=useState([]);
  const [input,setInput]=useState("");

 
  useEffect(()=>{
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      console.log(snapshot.docs.map(doc=>doc.data()));
      // setTodos(snapshot.docs.map(doc=>doc.data().todo));
      setTodos(snapshot.docs.map(doc=>({id:doc.id,todo:doc.data().todo})));
    })
  },[]);

  const AddtoList=(e)=>{
    e.preventDefault();
    // setTodos([...todos,input]);
    db.collection('todos').add({
      todo:input,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    });
    setInput("");
  }
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  return (
    <div className="App">
      <h2>Todo application in react </h2>
      <BeatLoader
         css={override}
          size={30}
          color={"#123abc"}
          loading={true}
        />
      <FormControl>
        <InputLabel htmlFor="todo-input">Todo Text</InputLabel>
         <Input id="todo-input" value={input} type="text" onChange={(e)=>setInput(e.target.value)}/>
        <Button  variant="contained" color="primary" disabled={!input} type="submit" onClick={(e)=>AddtoList(e)}>Add Todo</Button>
      </FormControl>
     
      <div>
        <ul>
          {
            todos.map((e,i)=>(
              <Todo list={e} key={i}/>
            ))
          }
        </ul>
      </div>
    
    </div>
  );
}

export default App;
