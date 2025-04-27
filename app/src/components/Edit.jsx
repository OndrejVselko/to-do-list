import RemoveTask from "./RemoveTask.jsx";
import {useEffect, useState} from "react";
import * as React from "react";

export default function Edit(){
    //loading data for editing page
    const [data, setData] = useState(null);
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


    return(
        <RemoveTask data={data}/>
    );
}