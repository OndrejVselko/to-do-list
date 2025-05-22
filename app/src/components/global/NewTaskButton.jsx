import React, { useState } from 'react';
import NewTaskDialog from './NewTaskDialog';

export default function NewTaskButton({ data, setData }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreate = ({ name, category, comment, date, priority }) => {
        const newTask = {
            id: 999,
            type: 'task',
            name,
            date: date ? date.toISOString() : new Date().toISOString(),
            category,
            priority: priority ? 1 : 0,
            state: 0,
            project_id: null,
            comment,
        };
        setData(prev => [...prev, newTask]);
        handleClose();
    };

    return (
        <>
            <div
                id="new_task_button"
                className="corner_button"
                onClick={handleOpen}
                style={{ cursor: 'pointer' }}
            >
                <a href="#"><img src="src/icons/notes.png" alt="new task icon" /></a>
            </div>

            <NewTaskDialog
                open={open}
                onClose={handleClose}
                onCreate={handleCreate}
            />
        </>
    );
}
