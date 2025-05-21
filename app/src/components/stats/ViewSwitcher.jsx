import React, { useState, useMemo } from 'react';
import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FilterControls from './FilterControls.jsx';
import TasksBarChart from './TasksBarChart.jsx';
import TasksTable from './TaskTable.jsx';

export default function ViewSwitcher({ data }) {
    // filter state
    const [searchName, setSearchName] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterState, setFilterState] = useState('all');
    const [onlyPriority, setOnlyPriority] = useState(false);
    const [filterProject, setFilterProject] = useState(null);
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);

    // project options for filter
    const projectOptions = useMemo(
        () => data
            .filter(item => item.type === 'project')
            .map(proj => ({ id: proj.id, name: proj.name })),
        [data]
    );

    // filtered data
    const filteredData = useMemo(() => {
        return data.filter(item => {
            if (searchName && !item.name.toLowerCase().includes(searchName.toLowerCase())) return false;
            if (filterType !== 'all' && item.type !== filterType) return false;
            if (filterState !== 'all') {
                const stateVal = parseInt(filterState, 10);
                if (item.state !== stateVal) return false;
            }
            if (onlyPriority && !item.priority) return false;
            if (filterProject) {
                if (item.type === 'subtask') {
                    if (item.project_id !== filterProject.id) return false;
                } else {
                    return false;
                }
            }
            const itemDate = new Date(item.date);
            if (dateFrom && itemDate < dateFrom) return false;
            if (dateTo && itemDate > dateTo) return false;
            return true;
        });
    }, [data, searchName, filterType, filterState, onlyPriority, filterProject, dateFrom, dateTo]);

    // view state
    const [view, setView] = useState('table'); // 'chart' | 'table'
    const handleViewChange = (_, newView) => {
        if (newView) setView(newView);
    };

    return (
        <Box>
            <ToggleButtonGroup
                value={view}
                exclusive
                onChange={handleViewChange}
                aria-label="view-switch"
                sx={{ mb: 2 }}
            >
                <ToggleButton value="table" aria-label="chart">Tabulka</ToggleButton>
                <ToggleButton value="chart" aria-label="table">Graf</ToggleButton>
            </ToggleButtonGroup>

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
                    <TasksTable data={filteredData} />
                </Box>
            )}
        </Box>
    );
}