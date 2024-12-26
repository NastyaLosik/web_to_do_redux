import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        removeTask: (state, action) => {
            state.tasks.splice(action.payload, 1);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        updateTask: (state, action) => {
            const { index, task } = action.payload;
            if (state.tasks[index]) {
                state.tasks[index] = task;
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },
        reorderTasks: (state, action) => {
            const { oldIndex, newIndex } = action.payload;
            const [movedTask] = state.tasks.splice(oldIndex, 1);
            state.tasks.splice(newIndex, 0, movedTask);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
    },
});

export const { addTask, removeTask, updateTask, reorderTasks } = taskSlice.actions;

export default taskSlice.reducer;