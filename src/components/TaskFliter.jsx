import React, {useState} from 'react'
import '../App.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import useTaskStore from '../store/appStore';

function TaskFliter() {
    const [task,setTask] = useState("");
    const [assignee,setAssignee] = useState("");

    const {setFilterTask,setFilterAssignee, dark} = useTaskStore((state) =>({
        setFilterTask: state.setFilterTask,
        setFilterAssignee: state.setFilterAssignee,
        dark: state.dark
    }));

    const handleTask = (event) =>{
        setFilterTask(event.target.value);
        setTask(event.target.value);
    }

    const handleAssignee = (event) =>{
        setFilterAssignee(event.target.value);
        setAssignee(event.target.value);
    };

    const handleClear = () =>{
        setTask('');
        setAssignee("");
        setFilterTask('');
        setFilterAssignee('');
    }
    return (
        <div className={`task-fliter ${dark ? "task-fliter-dark": ""}`}>
            {/* <div className='task-fliter-input'> */}
                <Box
                    className = "task-fliter-box"
                >
                    <TextField fullWidth label="Search for a Task" id="fullWidth" onChange={handleTask} 
                    value={task} style={{borderRadius:"5px", backgroundColor: "rgba(255, 255, 255, 0.6)"}}
                    />
                </Box>
                <Box
                    className = "task-fliter-box"
                >
                    <TextField fullWidth label="filter by assignee" id="fullWidth" onChange={handleAssignee} 
                    value={assignee} style={{borderRadius: "5px", backgroundColor: "rgba(255, 255, 255, 0.6)"}}
                    />
                </Box>
            {/* </div> */}
            <button className="taskBoard-button" onClick={handleClear} style={{justifySelf:"center"}}>Clear Filters</button>
        </div>
    )
}

export default TaskFliter