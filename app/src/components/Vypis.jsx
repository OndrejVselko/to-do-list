import React, { useState, useEffect } from 'react';
export default function PrintData() {
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
    return (
        <div>
            <h1>Seznam úkolů</h1>
            <ul>
                {data.map(task => (
                    <li key={task.id}>
                        <strong>{task.name}</strong>
                        <br />
                        Datum: {new Date(task.date).toLocaleDateString("cs-CZ")}
                        <br />
                        Kategorie: {task.category || "Nezařazeno"}
                        <br />
                        Priorita: {task.priority ? "Ano" : "Ne"}
                        <br />
                        Opakuje se: {task.repetition ? "Ano" : "Ne"}
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
}
