import React, { useState } from 'react'
import '../App.css'
import List from './List'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TaskFliter from './TaskFliter';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useTaskStore from '../store/appStore';
import { taskStatus } from '../utils/OtherUtils';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    fontSize:"2px",
};

const TaskBoard : React.FC = () => {
    const addTask = useTaskStore((state) => state.addTask)

    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);

    const [name, setName] = useState<string>("");
    const [assignee, setAssignee] = useState<string>("");
    const [point, setPoint] = useState<string>("");
    const [priority, setPriority] = useState<string>('P0');
    const [status, setStatus] = useState<string>('Todo');

    const [nameError, setNameError] = useState<boolean>(false);
    const [assigneeError, setAssigneeError] = useState<boolean>(false);
    const [pointError, setPointError] = useState<boolean>(false);


    const handleChangePriority = (event:any) => {
        setPriority(event.target.value);
    };

    const handleChangeStatus = (event:any) => {
        setStatus(event.target.value);
    };

    const handleChangeName = (event:any) => {
        setName(event.target.value);
    };

    const handleChangeAssignee = (event:any) => {
        setAssignee(event.target.value);
    };

    const handleChangePoint = (event:any) => {
        setPoint(event.target.value);
    };

    const handleClose = () => {
        setNameError(false); setAssigneeError(false); setPointError(false);
        setName('');
        setAssignee('');
        setPoint('')
        setPriority("P0")
        setStatus('Todo');
        setOpen(false);
    }

    const handleSubmit = () => {
        let count = 0;
        if (name === '') { setNameError(true); count++; }
        if (assignee === '') { setAssigneeError(true); count++; }
        if (point === '') { setPointError(true); count++; }

        if (count > 0) return;

        addTask({
            taskId: Math.ceil(Math.random() * 1000000),
            name_: name,
            priority: priority,
            assignee: assignee,
            story_points: point,
            status: status,
            date: new Date().getTime()
        });
        setNameError(false); setAssigneeError(false); setPointError(false);
        setName('');
        setAssignee('');
        setPoint('')
        setPriority("P0")
        setStatus('Todo');
        handleClose();
    }


    return (
        <div id='taskBoard'>
            <div className='create-task'>
                <button className='taskBoard-button' onClick={handleOpen}>Create Task</button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box  sx={style} className="Modal-box">
                        <Box sx={{ display: "flex" ,flexDirection: "row", alignItems: "center", justifyContent: "flex-start",width:"100%" }}>
                            <Typography className='Modal-typo' id="modal-modal-description" sx={{ mt: 1, width: "25%" }}> Task name : </Typography>
                            <TextField error={nameError} style={{flex:"1"}} label="Name" id="fullWidth" size='small' onChange={handleChangeName} value={name} />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", width:"100%", marginTop:"8px",marginBottom:"8px" }}>
                            <Typography className='Modal-typo' id="modal-modal-description" sx={{ mt: 1, width: "25%" }}> Set Priority : </Typography>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl sx={{ minWidth: 120 }} size="small">
                                    <InputLabel id="demo-select-small">Priority</InputLabel>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={priority}
                                        label="Priority"
                                        onChange={handleChangePriority}
                                    >
                                        <MenuItem value={"P0"}>P0</MenuItem>
                                        <MenuItem value={"P1"}>P1</MenuItem>
                                        <MenuItem value={"P2"}>P2</MenuItem>
                                        <MenuItem value={"P3"}>P3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box sx={{ width:"100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                            <Typography className='Modal-typo' id="modal-modal-description" sx={{ mt: 1, width: "25%" }}> Assignee : </Typography>
                            <TextField error={assigneeError} style={{flex:"1"}} fullWidth label="Assignee" id="fullWidth" size='small' onChange={handleChangeAssignee} value={assignee} />
                        </Box>
                        <Box sx={{ width:"100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginTop: '10px', marginBottom: '10px' }}>
                            <Typography className='Modal-typo' id="modal-modal-description" sx={{ mt: 1, width: "25%" }}> Story Points : </Typography>
                            <TextField error={pointError} type="number" id="outlined-basic" label="Story Points " variant="outlined" size='small' onChange={handleChangePoint} value={point} />
                        </Box>
                        <Box sx={{ width:"100%", marginTop:"8px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                            <Typography className='Modal-typo' id="modal-modal-description" sx={{ mt: 1, width: "25%" }}> Status : </Typography>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl sx={{minWidth: 120 }} size="small">
                                    <InputLabel id="demo-select-small">Status</InputLabel>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={status}
                                        label="status"
                                        onChange={handleChangeStatus}
                                    >
                                        {
                                            taskStatus.map((status:string) =>{
                                                return <MenuItem value={status} key={status}>{status}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexWrap:"wrap" ,justifyContent: "space-between", marginTop: "20px",mb:"5px" }}>

                            <Button variant="contained" href="#contained-buttons" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="contained" href="#contained-buttons" onClick={handleSubmit} >
                                Add Task
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
            <TaskFliter />

            <div className='task'>
                {
                    taskStatus.map((status:string)=>{
                        return <List heading = {`${status}`} key={status}/>
                    })
                }
            </div>
        </div>
    )
}

export default TaskBoard