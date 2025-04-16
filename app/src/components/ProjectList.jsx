import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {useEffect, useState} from "react";
import {ListItem} from "@mui/material";
import {useSelection} from './SelectionContext';

export default function TaskList() {
    const [openIndexes, setOpenIndexes] = useState([]);

    const handleClick = (index) => {
        setOpenIndexes((prev) => {
            if (prev.includes(index)) {
                return prev.filter(i => i !== index);
            }
            return [...prev, index];
        });
    };

    const
        [data, setData] = useState(null);

    useEffect(() => {
        fetch('/data.json')
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    /*Takes data from .json file and group them
    * grouped structure: dictionary - key is id, value is object with name and array of items (subtasks)
    * first foreach creates keys, second fills their values*/
    const groupByProject = (data) => {
        const grouped = {};

        data.forEach(item => {
            if (item.type === "project") {
                grouped[item.id] = {
                    name: item.name,
                    items: []
                };
            }
        });

        data.forEach(item => {
            if (item.type === "subtask") {
                const group = grouped[item.project_id];
                if (group) {
                    group.items.push(item);
                }
            }
        });
        console.log(grouped);
        return grouped;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    data.sort((a, b) => new Date(a.date) - new Date(b.date));
    const groupedData = groupByProject(data)


    const { setSelectedItem } = useSelection();


    return (
        <div id="task_list" className="bubble">
            <div className="list">
                <h3>Úkoly:</h3>
                <List>
                    {Object.entries(groupedData).map(([projectId, { name, items }], index) => (
                        <div key={projectId}>
                            <ListItem button onClick={() => handleClick(index)}>
                                <ListItemText primary={name} />
                                {openIndexes.includes(index) ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openIndexes.includes(index)} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {items.map((task) => (
                                        <ListItem key={task.id} sx={{ pl: 4 }} onClick={() => setSelectedItem(task)}>
                                            <ListItemText primary={
                                                <>
                                                    {task.state === 1 ? (
                                                        <img src="src/icons/done.png" alt="done_icon" style={{ width: "16px", height: "auto", marginRight: "8px", verticalAlign: "middle" }} />
                                                    ) : (
                                                        <img src="src/icons/undone.png" alt="undone_icon" style={{ width: "16px", height: "auto", marginRight: "8px", verticalAlign: "middle" }} />
                                                    )}
                                                    {task.name + " - " + formatDate(task.date)}
                                                </>
                                            } />
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



