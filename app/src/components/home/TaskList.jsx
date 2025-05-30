import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ListItem, Typography } from '@mui/material';
import { useSelection } from '../global/SelectionContext.jsx';

export default function TaskList({ data }) {
    const [openIndexes, setOpenIndexes] = useState([]);
    const { setSelectedItem } = useSelection();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filtered = data
        .filter(item => item.type === 'task' && item.state === 0)
        .filter(item => new Date(item.date) >= today);

    const groupByDate = items => {
        const grouped = {};
        const fmt = dateString => {
            const d = new Date(dateString);
            const dd = String(d.getDate()).padStart(2, '0');
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const yyyy = d.getFullYear();
            return `${dd}.${mm}.${yyyy}`;
        };
        grouped['Důležité'] = [];
        items.forEach(item => {
            if (item.priority) {
                grouped['Důležité'].push(item);
            } else {
                const key = fmt(item.date);
                if (!grouped[key]) grouped[key] = [];
                grouped[key].push(item);
            }
        });
        if (grouped['Důležité'].length === 0) delete grouped['Důležité'];
        return grouped;
    };

    const sorted = [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date));
    const groupedData = groupByDate(sorted);

    const handleClick = idx =>
        setOpenIndexes(prev =>
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        );

    const clickableItemSx = {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'var(--background_secondary)'
        }
    };

    return (
        <div id="task_list" className="bubble">
            <div className="list">
                <h3>Úkoly:</h3>
                {Object.entries(groupedData).length === 0 ? (
                    <Typography sx={{ textAlign: 'center', mt: 2, color: 'var(--text_color)' }}>
                        Aktuálně nemáte žádné úkoly
                    </Typography>
                ) : (
                    <List>
                        {Object.entries(groupedData).map(([date, tasks], idx) => (
                            <div key={date}>
                                <ListItem
                                    button
                                    onClick={() => handleClick(idx)}
                                    sx={clickableItemSx}
                                >
                                    <ListItemText
                                        primary={
                                            <>
                                                {date === 'Důležité' && (
                                                    <img
                                                        src="src/icons/alert.png"
                                                        alt="important_icon"
                                                        style={{ width: 16, marginRight: 8 }}
                                                    />
                                                )}
                                                {date}
                                            </>
                                        }
                                    />
                                    {openIndexes.includes(idx) ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={openIndexes.includes(idx)} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {tasks.map(task => (
                                            <ListItem
                                                key={task.id}
                                                onClick={() => setSelectedItem(task)}
                                                sx={{ pl: 4, ...clickableItemSx }}
                                            >
                                                <ListItemText primary={task.name} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            </div>
                        ))}
                    </List>
                )}
            </div>
        </div>
    );
}
