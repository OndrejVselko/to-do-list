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
    const groupByDate = (data) => {
        const grouped = {};



        data.forEach(item => {
            if (item.type === "project"){
                grouped[item.id]=[];
            }
            if (item.type === "subtask"){
                console.log("Subtask" + item.id)
                //grouped[item.project_id].push(item);
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
    const groupedData = groupByDate(data)


    const { setSelectedItem } = useSelection();


    return (
        <div id="task_list" className="bubble">
            <div className="list">
                <h3>Úkoly:</h3>
                <List>
                    {Object.entries(groupedData).map(([id, tasks], index) => (
                        <div key={id}>
                            <ListItem button onClick={() => handleClick(index)}>
                                <ListItemText primary={name + ", " + id}/>
                                {openIndexes.includes(index) ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openIndexes.includes(index)} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {tasks.map((task) => (
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



