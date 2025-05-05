/* Edit.jsx */
import React, { useEffect, useState } from 'react';
import RemoveTask from './RemoveTask.jsx';

export default function Edit() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(fetchedData => setData(fetchedData))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <RemoveTask data={data} setData={setData} />
            <ShowData data={data} />
        </>
    );
}


function ShowData({data}){
    return <div style={{borderTop: "2px solid red", marginTop: "10px",}}>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
}