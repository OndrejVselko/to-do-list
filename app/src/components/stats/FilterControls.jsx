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
    Checkbox,
    Box
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
    const commonInputLabelProps = {
        InputLabelProps: {
            sx: {
                color: 'var(--text_label)',
                '&.Mui-focused': {
                    color: 'var(--yellow)'
                }
            }
        }
    };

    const commonInputProps = {
        InputProps: {
            sx: {
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
            }
        },
        sx: { input: { color: 'var(--text_color)' } }
    };

    const selectSx = {
        color: 'var(--text_color)',
        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
    };

    const labelFocusedSx = {
        sx: {
            color: 'var(--text_label)',
            '&.Mui-focused': { color: 'var(--yellow)' }
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" mb={2}>

                {/* TextField */}
                <TextField
                    label="Hledat podle názvu"
                    variant="outlined"
                    value={searchName}
                    onChange={e => setSearchName(e.target.value)}
                    required
                    {...commonInputLabelProps}
                    {...commonInputProps}
                />

                {/* Type Select */}
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                    <InputLabel id="type-label" {...labelFocusedSx}>Typ</InputLabel>
                    <Select
                        labelId="type-label"
                        value={filterType}
                        label="Typ"
                        onChange={e => setFilterType(e.target.value)}
                        sx={selectSx}
                    >
                        <MenuItem value="all">Vše</MenuItem>
                        <MenuItem value="task">Task</MenuItem>
                        <MenuItem value="project">Project</MenuItem>
                        <MenuItem value="subtask">Subtask</MenuItem>
                    </Select>
                </FormControl>

                {/* Autocomplete */}
                <Autocomplete
                    sx={{
                        minWidth: 240,
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
                        '& .MuiInputBase-input': { color: 'var(--text_color)' },
                        '& .MuiInputLabel-root': {
                            color: 'var(--text_label)',
                            '&.Mui-focused': { color: 'var(--yellow)' }
                        }
                    }}
                    options={projectOptions}
                    getOptionLabel={option => option.name}
                    value={filterProject}
                    onChange={(_, newValue) => setFilterProject(newValue)}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label="Projekt (subtask)"
                            variant="outlined"
                        />
                    )}
                    clearOnEscape
                />

                {/* State Select */}
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                    <InputLabel id="state-label" {...labelFocusedSx}>Stav</InputLabel>
                    <Select
                        labelId="state-label"
                        value={filterState}
                        label="Stav"
                        onChange={e => setFilterState(e.target.value)}
                        sx={selectSx}
                    >
                        <MenuItem value="all">Vše</MenuItem>
                        <MenuItem value="0">Neprovedené</MenuItem>
                        <MenuItem value="1">Provedené</MenuItem>
                    </Select>
                </FormControl>

                {/* Checkbox */}
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={onlyPriority}
                            onChange={e => setOnlyPriority(e.target.checked)}
                            sx={{
                                color: 'var(--yellow)',
                                '&.Mui-checked': { color: 'var(--yellow)' }
                            }}
                        />
                    }
                    label="Pouze priorita"
                />

                {/* Date Pickers */}
                <DatePicker
                    label="Od"
                    value={dateFrom}
                    onChange={newValue => setDateFrom(newValue)}
                    renderInput={params => (
                        <TextField
                            {...params}
                            variant="outlined"
                            {...commonInputLabelProps}
                            {...commonInputProps}
                        />
                    )}
                />
                <DatePicker
                    label="Do"
                    value={dateTo}
                    onChange={newValue => setDateTo(newValue)}
                    renderInput={params => (
                        <TextField
                            {...params}
                            variant="outlined"
                            {...commonInputLabelProps}
                            {...commonInputProps}
                        />
                    )}
                />

            </Stack>
        </Box>
    );
}
