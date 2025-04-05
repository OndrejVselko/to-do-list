import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import {useEffect, useState} from "react";
import {ListItem} from "@mui/material";

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

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        };


        data.forEach(item => {
            const dateKey = formatDate(item.date);
            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }
            grouped[dateKey].push(item);
        });

        return grouped;
    };



    const groupedData = groupByDate(data)


    return (
        <div id="task_list" className="list">
            <List>
                {Object.entries(groupedData).map(([date, tasks], index) => (
                    <div key={date}>
                        <ListItem button onClick={() => handleClick(index)}>
                            <ListItemText primary={date} />
                            {openIndexes.includes(index) ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openIndexes.includes(index)} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {tasks.map((task) => (
                                    <ListItem key={task.id} sx={{ pl: 4 }}>
                                        <ListItemText primary={task.name} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </div>
                ))}
            </List>
        </div>
    );
}