import React from 'react'
import '../App.css'
import ListItems from './ListItems'
import useTaskStore from '../store/appStore'

import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const List = (props) => {
  const { tasks, filterTask, filterAssignee } = useTaskStore(
    (state) => ({
      tasks: state.tasks,
      filterTask: state.filterTask,
      filterAssignee: state.filterAssignee
    })
  );

  const [open, setOpen] = React.useState(false);
  // const tasks = useTaskStore((state) => state.tasks);
  //memo
  return (

    <div className='List-body'>
      <div className='List-body-heading'>{props.heading}</div>
      <Droppable droppableId={props.heading} >
        {
          (provided, snapshot) => (
            <div className='List-body-items'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {
                tasks.map((task, index) => {
                  if (props.heading === task.status) {

                    if (filterAssignee === "" && filterTask === "")
                      return <ListItems key={task.taskId} task={task} setOpen={setOpen} index={index}/>


                    else if (filterAssignee !== "" && filterTask === "") {
                      if (task.assignee === filterAssignee) return <ListItems key={task.taskId} task={task} setOpen={setOpen} index={index}/>

                      else return "";
                    }

                    else if (filterAssignee === "" && filterTask !== "") {
                      if (task.name_ === filterTask) return <ListItems key={task.taskId} task={task} setOpen={setOpen} index={index}/>

                      else return "";
                    }

                    else {
                      if (filterAssignee === task.assignee && filterTask === task.name_) return <ListItems key={task.taskId} task={task} setOpen={setOpen} index={index}/>
                      else return "";
                    }
                    // return <ListItems key={task.taskId}  task={task} />
                  }
                  else return "";
                })
              }
              {provided.placeholder}
            </div>
          )}
      </Droppable>

      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Upadated Successfully!
        </Alert>
      </Collapse>
    </div>
  )
}

export default List