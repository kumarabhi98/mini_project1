import React, {useState} from 'react'
import '../App.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import useTaskStore from '../store/appStore';

function TaskFliter() {
    const [task,setTask] = useState("");
    const [assignee,setAssignee] = useState("");

    const {setFilterTask,setFilterAssignee} = useTaskStore((state) =>({
        setFilterTask: state.setFilterTask,
        setFilterAssignee: state.setFilterAssignee
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
        <div className='task-fliter'>
            <div className='task-fliter-input'>
                <Box
                    sx={{
                        width: "47%",
                        maxWidth: '100%',
                    }}
                >
                    <TextField fullWidth label="Search for a Task" id="fullWidth" onChange={handleTask} 
                    value={task} style={{backgroundColor:"white", borderRadius:"5px"}}
                    />
                </Box>
                <Box
                    sx={{
                        width: "47%",
                        maxWidth: '100%',
                    }}
                >
                    <TextField fullWidth label="filter by assignee" id="fullWidth" onChange={handleAssignee} 
                    value={assignee} style={{backgroundColor:"white", borderRadius: "5px"}}
                    />
                </Box>
            </div>
            <button className="taskBoard-button" onClick={handleClear}>Clear Filters</button>
        </div>
    )
}

export default TaskFliter