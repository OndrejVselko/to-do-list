import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ListItem } from '@mui/material';
import { useSelection } from '../global/SelectionContext.jsx';

export default function ProjectList({ data }) {
    const [openIndexes, setOpenIndexes] = useState([]);
    const { setSelectedItem } = useSelection();

    const handleClick = idx =>
        setOpenIndexes(prev =>
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        );

    const groupByProject = items => {
        const grouped = {};
        // only projects with state === 0
        items
            .filter(item => item.type === 'project' && item.state === 0)
            .forEach(proj => {
                grouped[proj.id] = { name: proj.name, items: [] };
            });
        items
            .filter(item => item.type === 'subtask')
            .forEach(sub => {
                if (grouped[sub.project_id]) grouped[sub.project_id].items.push(sub);
            });
        return grouped;
    };

    const formatDate = dateString => {
        const d = new Date(dateString);
        return d.toLocaleDateString('cs-CZ');
    };

    const groupedData = groupByProject(data);

    return (
        <div id="project_list" className="bubble">
            <div className="list">
                <h3>Projekty:</h3>
                <List>
                    {Object.entries(groupedData).map(([projId, { name, items }], idx) => (
                        <div key={projId}>
                            <ListItem button onClick={() => handleClick(idx)}>
                                <ListItemText primary={name} />
                                {openIndexes.includes(idx) ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openIndexes.includes(idx)} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {items.map(task => (
                                        <ListItem key={task.id} sx={{ pl: 4 }} onClick={() => setSelectedItem(task)}>
                                            <ListItemText
                                                primary={
                                                    <>
                                                        {task.state === 1 ? (
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
                                                        {`${task.name} - ${formatDate(task.date)}`}
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
            </div>
        </div>
    );
}
