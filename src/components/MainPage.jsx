import React, { useState } from 'react';
import TaskInput from './TaskInput';
import Task from './Task';
import DeleteTask from './deleteTask'; 
import { useSelector, useDispatch } from 'react-redux';
import { addTask, removeTask, updateTask, reorderTasks } from './redux/taskSlice';

function MainPage() {
    const tasks = useSelector((state) => state.tasks.tasks);    const dispatch = useDispatch(); 
    const [deleteIndex, setDeleteIndex] = useState(null); 
    const [showDelete, setShowDelete] = useState(false); 

    function handleEditTask(index, updatedTask) {
        dispatch(updateTask({ index, task: updatedTask }));    }

    function handleAddTask(title, about) {
        const newTask = { title, about };
        dispatch(addTask(newTask));
    }

    function confirmDeleteTask(index) {
        setDeleteIndex(index);
        setShowDelete(true);
    }

    function handleDeleteConfirmed() {
        dispatch(removeTask(deleteIndex));
        setShowDelete(false);
        setDeleteIndex(null);
    }

    function handleDeleteCancelled() {
        setShowDelete(false);
        setDeleteIndex(null);
    }

    function handleDragStart(e, index) {
        e.dataTransfer.setData("text/plain", index);
        e.dataTransfer.effectAllowed = "move";
    }

    function handleDrop(e) {
        e.preventDefault();
        const draggedIndex = e.dataTransfer.getData("text/plain");
        const dropIndex = e.target.closest('.task-element')?.dataset.index;
        if (dropIndex !== undefined && draggedIndex !== dropIndex) {
            dispatch(reorderTasks({ oldIndex: Number(draggedIndex), newIndex: Number(dropIndex) }));
        }
    }

    function allowDrop(e) {
        e.preventDefault();  
    }

    return (
        <div className="page">
            <TaskInput onaddTask={handleAddTask} />
            {tasks.length > 0 ? (
                <div className="task-list" onDragOver={allowDrop} onDrop={handleDrop}>
                    {tasks.map((task, index) => (
                        <Task index={index} task={task} deleteTasks={confirmDeleteTask} editTask={handleEditTask} handleDragStart={handleDragStart}/>
                    ))}
                </div>
            ) : (
                <div className="main-container">
                    <div className="text-main-container">
                        <span>No tasks</span>
                    </div>
                </div>
            )}
            {showDelete && (
                <DeleteTask 
                    onConfirm={handleDeleteConfirmed}
                    onCancel={handleDeleteCancelled}
                />
            )}
        </div>
    );
}

export default MainPage;