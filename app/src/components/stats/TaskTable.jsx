import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

export default function TasksGrid({ data }) {
    const formatDate = (iso) => {
        const d = new Date(iso);
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        return `${dd}.${mm}.${yyyy}`;
    };

    const now = new Date();


    const projectsMap = data
        .filter((item) => item.type === 'project')
        .reduce((acc, item) => {
            acc[item.id] = item.name;
            return acc;
        }, {});


    const columns = [
        { field: 'typeLabel', headerName: 'Typ', flex: 0.2 },       // 20%
        { field: 'name',      headerName: 'Název', flex: 0.5, minWidth: 200 }, // 50%
        {
            field: 'date',     headerName: 'Datum', flex: 0.1,    // 10%
            cellClassName: (params) => {
                const dateObj = new Date(params.row.rawDate);
                const isOverdue = params.row.state === 0 && dateObj < now;
                if (params.row.state === 1) return 'state-1-cell';
                if (isOverdue) return 'state-overdue-cell';
                return 'state-0-cell';
            },
        },
        { field: 'category',   headerName: 'Kategorie', flex: 0.2 }  // 20%
    ];

    const rows = data
        .filter((r) => ['task', 'project', 'subtask'].includes(r.type))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((r) => {
            let typeLabel;
            if (r.type === 'project') typeLabel = 'Projekt';
            else if (r.type === 'task') typeLabel = 'Úkol';
            else {
                const projName = projectsMap[r.project_id] || 'Neznámý projekt';
                typeLabel = `Podúkol / ${projName}`;
            }
            return {
                id: r.id,
                typeLabel,
                name: r.name,
                date: formatDate(r.date),
                rawDate: r.date,
                state: r.state,
                category: r.category || 'Bez kategorie',
            };
        });

    return (
        <Box
            sx={{
                height: '60vh',
                width: '80vw',
                mx: 'auto',
                overflow: 'hidden',
                '& *::-webkit-scrollbar': { width: '8px', height: '8px' },
                '& *::-webkit-scrollbar-track': { background: 'var(--background_primary)', borderRadius: '15px' },
                '& *::-webkit-scrollbar-thumb': { backgroundColor: 'var(--yellow)', borderRadius: '15px 0 0 15px', border: '1px solid var(--yellow)' },
                '& *::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' },
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--background_secondary) var(--background_primary)',
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 20]}
                disableRowSelectionOnClick
                disableColumnMenu
                sx={{
                    border: '2px solid var(--yellow)',
                    color: 'var(--text_color)',
                    borderRadius: '15px',
                    '& .MuiDataGrid-cell': { border: 'none' },
                    '& .MuiDataGrid-columnSeparator': { display: 'none' },
                    '& .MuiDataGrid-columnHeader': { backgroundColor: 'var(--background_primary) !important' },
                    '& .MuiDataGrid-footerContainer': { backgroundColor: 'var(--background_primary)', borderTop: 'none' },
                    '& .MuiDataGrid-footerContainer .MuiTablePagination-root': { color: 'var(--yellow)' },
                    '& .MuiDataGrid-footerContainer .MuiSvgIcon-root': { color: 'var(--yellow)' },
                    '& .MuiDataGrid-row': { backgroundColor: 'var(--background_primary)', borderBottom: '1px solid var(--yellow)' },
                    '& .MuiDataGrid-row:hover': { backgroundColor: 'var(--background_secondary)' },
                    '& .state-0-cell': { color: 'var(--text_color)' },
                    '& .state-1-cell': { color: 'var(--text_green)' },
                    '& .state-overdue-cell': { color: 'var(--text_red)' },
                    '& .MuiDataGrid-virtualScroller': { backgroundColor: 'var(--background_primary)' },
                }}
            />
        </Box>
    );
}
