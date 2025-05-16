import React, { useState, useMemo } from 'react';
import { Box, TextField, Autocomplete, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Stack } from '@mui/material';
import TasksTable from './TaskTable.jsx';

export default function Stats({ data }) {
    // Filter state
    const [searchName, setSearchName] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterState, setFilterState] = useState('all');
    const [onlyPriority, setOnlyPriority] = useState(false);
    const [filterProject, setFilterProject] = useState(null);

    // Compute unique projects for subtask filtering
    const projectOptions = useMemo(() => {
        return data
            .filter((item) => item.type === 'project')
            .map((proj) => ({ id: proj.id, name: proj.name }));
    }, [data]);

    // Compute filtered data
    const filteredData = useMemo(() => {
        return data.filter((item) => {
            // Filter by name
            if (searchName && !item.name.toLowerCase().includes(searchName.toLowerCase())) {
                return false;
            }
            // Filter by type
            if (filterType !== 'all' && item.type !== filterType) {
                return false;
            }
            // Filter by state
            if (filterState !== 'all') {
                const stateVal = parseInt(filterState, 10);
                if (item.state !== stateVal) {
                    return false;
                }
            }
            // Filter only priority
            if (onlyPriority && !item.priority) {
                return false;
            }
            // Filter by project for subtasks
            if (filterProject) {
                if (item.type === 'subtask') {
                    if (item.project_id !== filterProject.id) {
                        return false;
                    }
                } else {
                    // Hide non-subtasks when project is selected
                    return false;
                }
            }

            return true;
        });
    }, [data, searchName, filterType, filterState, onlyPriority, filterProject]);

    return (
        <Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" mb={2}>
                <TextField
                    label="Hledat podle názvu"
                    variant="outlined"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />

                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                    <InputLabel id="type-label">Typ</InputLabel>
                    <Select
                        labelId="type-label"
                        value={filterType}
                        label="Typ"
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <MenuItem value="all">Vše</MenuItem>
                        <MenuItem value="task">Task</MenuItem>
                        <MenuItem value="project">Project</MenuItem>
                        <MenuItem value="subtask">Subtask</MenuItem>
                    </Select>
                </FormControl>

                {/* Autocomplete for project filter (subtasks) */}
                <Autocomplete
                    sx={{ minWidth: 240 }}
                    options={projectOptions}
                    getOptionLabel={(option) => option.name}
                    value={filterProject}
                    onChange={(_, newValue) => setFilterProject(newValue)}
                    renderInput={(params) => (
                        <TextField {...params} label="Projekt (subtask)" variant="outlined" />
                    )}
                    clearOnEscape
                />

                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                    <InputLabel id="state-label">Stav</InputLabel>
                    <Select
                        labelId="state-label"
                        value={filterState}
                        label="Stav"
                        onChange={(e) => setFilterState(e.target.value)}
                    >
                        <MenuItem value="all">Vše</MenuItem>
                        <MenuItem value="0">Neprovedené</MenuItem>
                        <MenuItem value="1">Provedené</MenuItem>
                    </Select>
                </FormControl>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={onlyPriority}
                            onChange={(e) => setOnlyPriority(e.target.checked)}
                        />
                    }
                    label="Pouze priorita"
                />
            </Stack>

            <TasksTable data={filteredData} />
        </Box>
    );
}
