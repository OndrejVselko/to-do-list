import { useSelection } from '../global/SelectionContext.jsx';
import React from 'react';
import { Button } from '@mui/material';

export default function TaskDetail({ data, setData }) {
    const { selectedItem, setSelectedItem } = useSelection();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const handleCompletition = () => {
        if (!selectedItem) return;

        setData(prev => {
            let newData = prev.map(item =>
                item.id === selectedItem.id ? { ...item, state: 1 } : item
            );
            if (selectedItem.type === 'subtask' && selectedItem.project_id != null) {
                const projectId = selectedItem.project_id;
                const subtasks = newData.filter(item =>
                    item.type === 'subtask' && item.project_id === projectId
                );
                const allDone = subtasks.length > 0 && subtasks.every(st => st.state === 1);
                if (allDone) {
                    newData = newData.map(item =>
                        item.id === projectId ? { ...item, state: 1 } : item
                    );
                }
            }

            return newData;
        });

        setSelectedItem(null);
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

    const renderDetail = () => (
        <div className="bubble">
            <div id="task_detail" className="list">
                <h2>
                    {Boolean(selectedItem.priority) && (
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
            </div>
        </div>
    );

    return renderDetail();
}
