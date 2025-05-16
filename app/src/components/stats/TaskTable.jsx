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

    // Vytvoříme mapu projektů pro subtask
    const projectsMap = data
        .filter((item) => item.type === 'project')
        .reduce((acc, item) => {
            acc[item.id] = item.name;
            return acc;
        }, {});

    // Definujeme sloupce, včetně překladu typu
    const columns = [
        {
            field: 'typeLabel',
            headerName: 'Typ',
            flex: 1,
            minWidth: 120,
        },
        { field: 'name', headerName: 'Název', flex: 2, minWidth: 150 },
        {
            field: 'date',
            headerName: 'Datum',
            flex: 1,
            minWidth: 120,
            cellClassName: (params) => {
                const dateObj = new Date(params.row.rawDate);
                const isOverdue = params.row.state === 0 && dateObj < new Date();
                if (params.row.state === 1) return 'state-1-cell';
                if (isOverdue) return 'state-overdue-cell';
                return 'state-0-cell';
            },
        },
        { field: 'category', headerName: 'Kategorie', flex: 1, minWidth: 140 },
    ];

    // Připravíme řádky s typeLabel a projectName
    const rows = data
        .filter((r) => r.type === 'task' || r.type === 'project' || r.type === 'subtask')
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((r) => {
            let typeLabel;
            if (r.type === 'project') typeLabel = 'Projekt';
            else if (r.type === 'task') typeLabel = 'Úkol';
            else if (r.type === 'subtask') {
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
                height: 500,
                width: '100%',
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
                    '& .state-0-cell': { color: 'var(--text-color)' },
                    '& .state-1-cell': { color: '#7af67a' },
                    '& .state-overdue-cell': { color: '#ff3939' },
                }}
            />
        </Box>
    );
}
