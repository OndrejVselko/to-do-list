import React from 'react';
import {
    Stack,
    TextField,
    Autocomplete,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function FilterControls({
                                           searchName,
                                           setSearchName,
                                           filterType,
                                           setFilterType,
                                           filterState,
                                           setFilterState,
                                           onlyPriority,
                                           setOnlyPriority,
                                           filterProject,
                                           setFilterProject,
                                           projectOptions,
                                           dateFrom,
                                           setDateFrom,
                                           dateTo,
                                           setDateTo
                                       }) {
    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" mb={2}>
            <TextField
                label="Hledat podle názvu"
                variant="outlined"
                value={searchName}
                onChange={e => setSearchName(e.target.value)}
            />

            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                <InputLabel id="type-label">Typ</InputLabel>
                <Select
                    labelId="type-label"
                    value={filterType}
                    label="Typ"
                    variant="outlined"
                    onChange={e => setFilterType(e.target.value)}
                >
                    <MenuItem value="all">Vše</MenuItem>
                    <MenuItem value="task">Task</MenuItem>
                    <MenuItem value="project">Project</MenuItem>
                    <MenuItem value="subtask">Subtask</MenuItem>
                </Select>
            </FormControl>

            <Autocomplete
                sx={{ minWidth: 240 }}
                options={projectOptions}
                getOptionLabel={option => option.name}
                value={filterProject}
                onChange={(_, newValue) => setFilterProject(newValue)}
                renderInput={params => <TextField {...params} label="Projekt (subtask)" variant="outlined" />}
                clearOnEscape
            />

            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                <InputLabel id="state-label">Stav</InputLabel>
                <Select
                    labelId="state-label"
                    value={filterState}
                    label="Stav"
                    variant="outlined"
                    onChange={e => setFilterState(e.target.value)}
                >
                    <MenuItem value="all">Vše</MenuItem>
                    <MenuItem value="0">Neprovedené</MenuItem>
                    <MenuItem value="1">Provedené</MenuItem>
                </Select>
            </FormControl>

            <FormControlLabel
                control={<Checkbox checked={onlyPriority} onChange={e => setOnlyPriority(e.target.checked)} />}
                label="Pouze priorita"
            />

            <DatePicker
                label="Od"
                value={dateFrom}
                onChange={newValue => setDateFrom(newValue)}
                renderInput={params => <TextField {...params} />}
            />
            <DatePicker
                label="Do"
                value={dateTo}
                onChange={newValue => setDateTo(newValue)}
                renderInput={params => <TextField {...params} />}
            />
        </Stack>
    );
}
