import React, { useState, useMemo } from 'react';
import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FilterControls from './FilterControls.jsx';
import TasksBarChart from './TasksBarChart.jsx';
import TasksTable from './TaskTable.jsx';

export default function ViewSwitcher({ data }) {
    const [searchName, setSearchName] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterState, setFilterState] = useState('all');
    const [onlyPriority, setOnlyPriority] = useState(false);
    const [filterProject, setFilterProject] = useState(null);
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);

    const projectOptions = useMemo(
        () =>
            data
                .filter((item) => item.type === 'project')
                .map((proj) => ({ id: proj.id, name: proj.name })),
        [data]
    );

    const filteredData = useMemo(() => {
        return data.filter((item) => {
            if (searchName && !item.name.toLowerCase().includes(searchName.toLowerCase())) return false;
            if (filterType !== 'all' && item.type !== filterType) return false;
            if (filterState !== 'all') {
                const stateVal = parseInt(filterState, 10);
                if (item.state !== stateVal) return false;
            }
            if (onlyPriority && !item.priority) return false;
            if (filterProject) {
                if (item.type === 'subtask' && item.project_id !== filterProject.id) return false;
                if (item.type !== 'subtask') return false;
            }
            const itemDate = new Date(item.date);
            if (dateFrom && itemDate < dateFrom) return false;
            if (dateTo && itemDate > dateTo) return false;
            return true;
        });
    }, [data, searchName, filterType, filterState, onlyPriority, filterProject, dateFrom, dateTo]);

    const [view, setView] = useState('table');
    const handleViewChange = (_, newView) => {
        if (newView) setView(newView);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <ToggleButtonGroup
                    value={view}
                    exclusive
                    onChange={handleViewChange}
                    aria-label="view-switch"
                    sx={{
                        mt: 1,
                        '& .MuiToggleButton-root': {
                            color: 'var(--text_color)',
                            borderColor: 'var(--yellow)',
                            width: '80%',
                        },
                        '& .MuiToggleButton-root.Mui-selected': {
                            color: 'var(--yellow)',
                            borderColor: 'var(--yellow)',
                            backgroundColor: 'transparent',
                        },
                    }}
                >
                    <ToggleButton value="table" aria-label="table-view">
                        Tabulka
                    </ToggleButton>
                    <ToggleButton value="chart" aria-label="chart-view">
                        Graf
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {view === 'chart' ? (
                <TasksBarChart data={data} />
            ) : (
                <Box>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <FilterControls
                            searchName={searchName}
                            setSearchName={setSearchName}
                            filterType={filterType}
                            setFilterType={setFilterType}
                            filterState={filterState}
                            setFilterState={setFilterState}
                            onlyPriority={onlyPriority}
                            setOnlyPriority={setOnlyPriority}
                            filterProject={filterProject}
                            setFilterProject={setFilterProject}
                            projectOptions={projectOptions}
                            dateFrom={dateFrom}
                            setDateFrom={setDateFrom}
                            dateTo={dateTo}
                            setDateTo={setDateTo}
                        />
                    </LocalizationProvider>
                    <Box sx={{ mt: 2 }}>
                        <TasksTable data={filteredData} />
                    </Box>
                </Box>
            )}
        </Box>
    );
}
