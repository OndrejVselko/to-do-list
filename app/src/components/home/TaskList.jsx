import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ListItem } from '@mui/material';
import { useSelection } from '../global/SelectionContext.jsx';

export default function TaskList({ data }) {
    const [openIndexes, setOpenIndexes] = useState([]);
    const { setSelectedItem } = useSelection();

    // Group tasks by date or priority
    const groupByDate = (items) => {
        const grouped = {};
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        };
        grouped['Důležité'] = [];
        items.filter(item => item.type === 'task').forEach(item => {
            if (item.priority) {
                grouped['Důležité'].push(item);
            } else {
                const key = formatDate(item.date);
                if (!grouped[key]) grouped[key] = [];
                grouped[key].push(item);
            }
        });
        if (grouped['Důležité'].length === 0) delete grouped['Důležité'];
        return grouped;
    };

    // Sort data by date without mutating props
    const sortedItems = [...data].filter(item => item.type === 'task')
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    const groupedData = groupByDate(sortedItems);

    const handleClick = (index) => {
        setOpenIndexes(prev => prev.includes(index)
            ? prev.filter(i => i !== index)
            : [...prev, index]
        );
    };

    return (
        <div id="task_list" className="bubble">
            <div className="list">
                <h3>Úkoly:</h3>
                <List>
                    {Object.entries(groupedData).map(([date, tasks], idx) => (
                        <div key={date}>
                            <ListItem button onClick={() => handleClick(idx)}>
                                <ListItemText primary={
                                    <>
                                        {date === 'Důležité' && (
                                            <img src="src/icons/alert.png" alt="important_icon" style={{ width: '16px', marginRight: 8 }} />
                                        )}
                                        {date}
                                    </>
                                } />
                                {openIndexes.includes(idx) ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openIndexes.includes(idx)} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {tasks.map(task => (
                                        <ListItem key={task.id} sx={{ pl: 4 }} onClick={() => setSelectedItem(task)}>
                                            <ListItemText primary={task.name} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </div>
                    ))}
                </List>
            </div>
        </div>
    );
}