import './App.css';
import Header from './components/Header';
import TaskBoard from './components/TaskBoard'
import { Route, Routes } from 'react-router-dom';
import Deleted from './components/Deleted';
import { DragDropContext } from 'react-beautiful-dnd';
import useTaskStore from './store/appStore';

function App() {
  const updateStatus = useTaskStore((state) => state.updateStatus);
  const onDragEnd = (result) => {
    const destination = result.destination;
    const source = result.source;
    const draggableId = parseInt(result.draggableId);
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return;
    updateStatus(draggableId,destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Header />
        <Routes>
          <Route path='/' element={<TaskBoard />} />
          <Route path='/deleted' element={<Deleted />} />
        </Routes>
      </div>
    </DragDropContext>
  );
}

export default App;
