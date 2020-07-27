import React,{useState} from 'react';
import {List,ListItem,ListItemText,Button,Modal,makeStyles} from '@material-ui/core';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import db from './firebase';
const Todo = (props) => {

    const [open,setOpen]=useState(false);
    const [input,setInput]=useState("");

    const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));
      const classes = useStyles();

      const UpdateTodo=()=>{
          db.collection('todos').doc(props.list.id).set({
            todo:input
          },{merge:true})
          setOpen(false);
          
      }
    return (
        <React.Fragment>
             <Modal
                    open={open}
                    onClose={e=>setOpen(false)}>
                   <div className={classes.paper}>
                        <h2>Material Ui</h2>
                        <input type="text" value={input} onChange={e=>setInput(e.target.value)}/>
                        <Button onClick={UpdateTodo}>Update</Button>
                   </div>
            </Modal>
            <List>
                <ListItem>
                    <ListItemText primary={props.list.id} secondary={props.list.todo}></ListItemText>
                    <RestoreFromTrashIcon 
                    onClick={event=>db.collection('todos').doc(props.list.id).delete()}
                        variant="contained" color="secondary"/> 
                    <Button onClick={e=>{setOpen(true);setInput(props.list.todo)}}>Edit</Button>        
                </ListItem>
            </List>
        </React.Fragment>
       
    );
};

export default Todo;