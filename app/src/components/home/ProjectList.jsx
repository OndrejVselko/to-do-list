// src/components/ProjectList.jsx
import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ListItem, Typography } from '@mui/material';
import { useSelection } from '../global/SelectionContext.jsx';

export default function ProjectList({ data }) {
    const [openIndexes, setOpenIndexes] = useState([]);
    const { setSelectedItem } = useSelection();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Vyberem projekty s date >= dnes
    const projects = data
        .filter(item => item.type === 'project' && item.state === 0)
        .filter(item => new Date(item.date) >= today);

    const grouped = {};
    projects.forEach(proj => {
        grouped[proj.id] = { name: proj.name, items: [] };
    });
    data
        .filter(item => item.type === 'subtask')
        .forEach(sub => {
            if (grouped[sub.project_id]) {
                grouped[sub.project_id].items.push(sub);
            }
        });

    const handleClick = idx =>
        setOpenIndexes(prev =>
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        );

    const formatDate = dateString => {
        const d = new Date(dateString);
        return d.toLocaleDateString('cs-CZ');
    };

    const clickableItemSx = {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'var(--background_secondary)'
        }
    };

    const entries = Object.entries(grouped);

    return (
        <div id="project_list" className="bubble">
            <div className="list">
                <h3>Projekty:</h3>
                {entries.length === 0 ? (
                    <Typography sx={{ textAlign: 'center', mt: 2, color: 'var(--text_color)' }}>
                        Aktuálně nemáte žádné projekty
                    </Typography>
                ) : (
                    <List>
                        {entries.map(([projId, { name, items }], idx) => (
                            <div key={projId}>
                                <ListItem
                                    button
                                    onClick={() => handleClick(idx)}
                                    sx={clickableItemSx}
                                >
                                    <ListItemText primary={name} />
                                    {openIndexes.includes(idx) ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={openIndexes.includes(idx)} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {items.map(sub => (
                                            <ListItem
                                                key={sub.id}
                                                onClick={() => setSelectedItem(sub)}
                                                sx={{ pl: 4, ...clickableItemSx }}
                                            >
                                                <ListItemText
                                                    primary={
                                                        <>
                                                            {sub.state === 1 ? (
                                                                <img
                                                                    src="src/icons/done.png"
                                                                    alt="done_icon"
                                                                    style={{ width: 16, marginRight: 8, verticalAlign: 'middle' }}
                                                                />
                                                            ) : (
                                                                <img
                                                                    src="src/icons/undone.png"
                                                                    alt="undone_icon"
                                                                    style={{ width: 16, marginRight: 8, verticalAlign: 'middle' }}
                                                                />
                                                            )}
                                                            {`${sub.name} – ${formatDate(sub.date)}`}
                                                        </>
                                                    }
                                                />
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
