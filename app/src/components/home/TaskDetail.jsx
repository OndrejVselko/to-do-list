import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelection } from '../global/SelectionContext.jsx';
import { Button } from '@mui/material';

export default function TaskDetail({ data, setData, setEdited }) {
    const { selectedItem, setSelectedItem } = useSelection();
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const handleCompletition = () => {
        if (!selectedItem) return;

        setData(prev =>
            prev.map(item =>
                item.id === selectedItem.id
                    ? { ...item, state: 1 }
                    : item
            ).map(item => {
                // pokud je subtask a všechny subtasks hotové, označ projekt také hotovým
                if (
                    selectedItem.type === 'subtask' &&
                    selectedItem.project_id != null
                ) {
                    const projectId = selectedItem.project_id;
                    const subtasks = prev.filter(
                        st => st.type === 'subtask' && st.project_id === projectId
                    );
                    const allDone = subtasks.length > 0 && subtasks.every(st => st.state === 1);
                    return item.id === projectId && allDone
                        ? { ...item, state: 1 }
                        : item;
                }
                return item;
            })
        );

        setSelectedItem(null);
    };

    const handleEditation = () => {
        if (!selectedItem) return;

        // 1) uložím vybraný item do App.js
        setEdited(selectedItem);
        // 2) vymažu výběr
        setSelectedItem(null);
        // 3) přejdu na edit page
        navigate('/edit');
    };

    if (!selectedItem) {
        return (
            <div className="bubble">
                <div id="task_detail">
                    <h2>Vyberte úkol</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="bubble">
            <div id="task_detail" className="list">
                <h2>
                    {selectedItem.priority && (
                        <img
                            src="src/icons/alert.png"
                            alt="important_icon"
                            style={{ width: 16, marginRight: 8, verticalAlign: 'middle' }}
                        />
                    )}
                    {selectedItem.name}
                    {selectedItem.type === 'subtask' && (
                        selectedItem.state === 1 ? (
                            <img
                                src="src/icons/done.png"
                                alt="done_icon"
                                style={{ width: 16, marginLeft: 8, verticalAlign: 'middle' }}
                            />
                        ) : (
                            <img
                                src="src/icons/undone.png"
                                alt="undone_icon"
                                style={{ width: 16, marginLeft: 8, verticalAlign: 'middle' }}
                            />
                        )
                    )}
                </h2>

                <h3>Do {formatDate(selectedItem.date)}</h3>
                <h3>
                    {selectedItem.type === 'subtask' ? 'Projekt: ' : 'Štítek: '}
                    {selectedItem.category || 'Bez štítku'}
                </h3>
                <p>{selectedItem.comment}</p>

                <Button
                    onClick={handleCompletition}
                    variant="outlined"
                    sx={{
                        borderColor: 'var(--yellow)',
                        color: 'var(--yellow)',
                        '&:hover': { borderColor: 'var(--yellow)' },
                    }}
                >
                    Splnit úkol
                </Button>

                <Button
                    onClick={handleEditation}
                    variant="outlined"
                    sx={{
                        borderColor: 'var(--yellow)',
                        color: 'var(--yellow)',
                        marginLeft: '10px',
                        '&:hover': { borderColor: 'var(--yellow)' },
                    }}
                >
                    Upravit
                </Button>
            </div>
        </div>
    );
}
