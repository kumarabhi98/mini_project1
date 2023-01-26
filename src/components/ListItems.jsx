import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useTaskStore from '../store/appStore';
import { Draggable } from 'react-beautiful-dnd';
import EditIcon from '@mui/icons-material/Edit';
import { taskStatus } from '../utils/OtherUtils';
import { getDays } from '../utils/HelperFunctions';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "40%",
    minWidth: "500px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxWidth: "600px"
};


const ListItems = (props) => {
    const { removeTask, updateTask, dark } = useTaskStore((state) => ({
        removeTask: state.removeTask,
        updateTask: state.updateTask,
        dark: state.dark
    }));

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [updateOpen, setUpdateOpen] = React.useState(false);
    const handleUpdateOpen = () => setUpdateOpen(true);
    const handleUpdateClose = () => setUpdateOpen(false);

    const [name, setName] = useState(props.task.name_);
    const [assignee, setAssignee] = useState(props.task.assignee);
    const [point, setPoint] = useState(props.task.story_points);
    const [priority, setPriority] = useState(props.task.priority);
    const [status, setStatus] = useState(props.task.status);

    const [nameError, setNameError] = useState(false);
    const [assigneeError, setAssigneeError] = useState(false);
    const [pointError, setPointError] = useState(false);

    const deletetask = () => { removeTask(props.task.taskId); }

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangePriority = (event) => {
        setPriority(event.target.value);
    };

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };

    const handleChangeAssignee = (event) => {
        setAssignee(event.target.value);
    };

    const handleChangePoint = (event) => {
        setPoint(event.target.value);
    };

    const handleUpdateSubmit = () => {
        let count = 0;
        if (name === '') { setNameError(true); count++; }
        if (assignee === '') { setAssigneeError(true); count++; }
        if (point === '') { setPointError(true); count++; }

        if (count > 0) return;

        updateTask(props.task.taskId, name, priority, status, assignee, point);

        setNameError(false); setAssigneeError(false); setPointError(false);
        handleUpdateClose();
        props.setOpen(true);
        setTimeout(() => { props.setOpen(false) }, 2000);
    }

    return (
        <Draggable draggableId={`${props.task.taskId}`} index={props.index}>
            {(provided, snapshot) => (
                <div
                    className={`List-items ${snapshot.isDragging ? "drag" : ""} ${(props.task.status !== "Completed" && getDays(props.task.date) >= parseInt(props.task.story_points)) ? "due-task" : ""} ${dark? "List-items-dark" : ""}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <p className='items-info'>
                        {`${props.task.name_}`}
                        <p style={{fontSize:"small", marginTop:"5px"}}>
                            <p>{`Assigned by: ${props.task.assignee}`}</p>
                            <p>{`Priority: ${props.task.priority}`}</p>
                        </p>
                    </p>
                    <EditIcon sx={{ mr: 1, ml: 1, color: "rgb(31, 52, 77)" }} onClick={handleUpdateOpen} />
                    <DeleteIcon sx={{ mr: 1, ml: 1, color: "rgb(31, 52, 77)" }} onClick={handleOpen} />
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography
                                id="modal-modal-title" variant="h6" component="h2"
                                sx={{ display: "flex", justifyContent: "center" }
                                }>
                                {`Delete ${props.task.name_}?`}
                            </Typography>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: "10px" }}>
                                <Button variant="contained" href="#contained-buttons" onClick={handleClose}>
                                    close
                                </Button>
                                <Button variant="contained" href="#contained-buttons" onClick={deletetask}>
                                    Delete
                                </Button>
                            </Box>
                        </Box>
                    </Modal>

                    <Modal
                        open={updateOpen}
                        onClose={handleUpdateClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style2} >
                            <Box sx={{ display: "flex", flexWrap:"wrap" ,flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                <Typography id="modal-modal-description" sx={{ mt: 1, width: "25%" }}> Task name : </Typography>
                                <TextField style={{ flex: "1" }} error={nameError} label="Name" id="fullWidth" size='small' value={name} onChange={handleChangeName} />
                            </Box>
                            <Box sx={{ marginTop: "8px", marginBottom: "8px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                <Typography id="modal-modal-description" sx={{ mt: 1, width: "25%" }} > Set Priority : </Typography>
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
                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                <Typography id="modal-modal-description" sx={{ mt: 1, width: "25%" }}> Assignee : </Typography>
                                <TextField style={{ flex: "1" }} error={assigneeError} label="Assignee" id="fullWidth" size='small' onChange={handleChangeAssignee} value={assignee} />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginTop: '10px', marginBottom: '10px' }}>
                                <Typography id="modal-modal-description" sx={{ width: "25%" }}> Story Points : </Typography>
                                <TextField id="outlined-basic" error={pointError} label="Story Points " variant="outlined" size='small' onChange={handleChangePoint} value={point} />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                <Typography id="modal-modal-description" sx={{ mt: 1, width: "25%" }}> Status : </Typography>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl sx={{ minWidth: 120 }} size="small">
                                        <InputLabel id="demo-select-small">Status</InputLabel>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={status}
                                            label="status"
                                            onChange={handleChangeStatus}
                                        >
                                            {
                                                taskStatus.map((status) => {
                                                    return <MenuItem value={status} key={status}>{status}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: "10px" }}>

                                <Button variant="contained" href="#contained-buttons" onClick={handleUpdateClose}>
                                    Close
                                </Button>
                                <Button variant="contained" href="#contained-buttons" onClick={handleUpdateSubmit} >
                                    Update
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                </div>
            )}
        </Draggable>
    )
}

export default ListItems