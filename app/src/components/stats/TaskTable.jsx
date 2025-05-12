import React from 'react';

const css = `
.table-container {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-family: sans-serif;
}
.table-header th {
  background-color: #f1f1f1;
  font-weight: bold;
  padding: 8px 16px;
  border: 1px solid #ddd;
  text-align: left;
}
.table-row:hover {
  background-color: #fafafa;
}
.table-cell {
  padding: 8px 16px;
  border: 1px solid #ddd;
}
.state-0 {
  color: black;
}
.state-1 {
  color: green;
}
.state-overdue {
  color: red;
}
`;

export default function TasksTable({ data }) {
    const formatDate = iso => {
        const d = new Date(iso);
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        return `${dd}.${mm}.${yyyy}`;
    };

    const now = new Date();
    const rows = data
        .filter(r => r.type === 'task' || r.type === 'project')
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map(r => {
            const d = new Date(r.date);
            const isOverdue = r.state === 0 && d < now;
            const cls =
                r.state === 1 ? 'state-1'
                    : isOverdue ? 'state-overdue'
                        : 'state-0';
            return {
                id: r.id,
                type: r.type,
                name: r.name,
                date: formatDate(r.date),
                category: r.category || 'Bez kategorie',
                cls
            };
        });

    return (
        <>
            <style>{css}</style>
            <table className="table-container">
                <thead className="table-header">
                <tr>
                    <th>Typ</th>
                    <th>Název</th>
                    <th>Datum</th>
                    <th>Kategorie</th>
                </tr>
                </thead>
                <tbody>
                {rows.map(row => (
                    <tr key={row.id} className={`table-row ${row.cls}`}>
                        <td className="table-cell">{row.type}</td>
                        <td className="table-cell">{row.name}</td>
                        <td className="table-cell">{row.date}</td>
                        <td className="table-cell">{row.category}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}
