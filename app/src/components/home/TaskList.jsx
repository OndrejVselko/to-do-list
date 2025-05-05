import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {useEffect, useState} from "react";
import {ListItem} from "@mui/material";
import {useSelection} from '../global/SelectionContext.jsx';

export default function TaskList() {
    const [openIndexes, setOpenIndexes] = useState([]);

    // function for multiple open
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

    //function for loading data
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

    //function for grouping task by their importance and date
    const groupByDate = (data) => {
        const grouped = {};

        //formating date
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        };

        grouped["Důležité"] = [];
        data.forEach(item => {
            if (item.type === "task") {
                const dateKey = formatDate(item.date);

                if (item.priority) {
                    grouped["Důležité"].push(item);
                }
                else {
                    if (!grouped[dateKey]) {
                        grouped[dateKey] = [];
                    }
                    grouped[dateKey].push(item);
                }
            }

        });
        if (grouped["Důležité"].length === 0) {
            delete grouped["Důležité"];
        }
        return grouped;
    };

    //sorting by date
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
    const groupedData = groupByDate(data)


    const { setSelectedItem } = useSelection();


    return (
        <div id="task_list" className="bubble">
            <div className="list">
                <h3>Úkoly:</h3>
                <List>
                    {Object.entries(groupedData).map(([date, tasks], index) => (
                        <div key={date}>
                            <ListItem button onClick={() => handleClick(index)}>
                                <ListItemText primary={
                                    <>
                                        {date === "Důležité" && (
                                            <img src="src/icons/alert.png" alt="important_icon" style={{ width: "16px", height: "auto", marginRight: "8px", verticalAlign: "middle" }}/>
                                        )}
                                        {date}
                                    </>
                                }/>
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



