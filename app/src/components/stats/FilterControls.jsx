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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import csLocale from 'date-fns/locale/cs';

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
    const commonStyles = {
        InputLabelProps: {
            sx: {
                color: 'var(--text_label)',
                '&.Mui-focused': {
                    color: 'var(--yellow)'
                }
            }
        },
        InputProps: {
            sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--yellow)'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--yellow)'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--yellow)'
                },
                '& input': {
                    color: 'var(--text_color)'
                },
                '& .MuiPickersInputBase-root': {
                    color: 'var(--text_color)'
                },
                '& .MuiPickersInputBase-root.Mui-focused': {
                    color: 'var(--text_color)'
                },
                '& .MuiPickersSectionList-root': {
                    color: 'var(--text_color)'
                },
                '& .MuiPickersSectionList-root .MuiTypography-root': {
                    color: 'var(--text_color)'
                }
            }
        },
        sx: {
            color: 'var(--text_color)'
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={csLocale}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" mb={2}>

                    {/* Vyhledávání podle názvu */}
                    <TextField
                        label="Hledat podle názvu"
                        variant="outlined"
                        value={searchName}
                        onChange={e => setSearchName(e.target.value)}
                        InputLabelProps={commonStyles.InputLabelProps}
                        InputProps={commonStyles.InputProps}
                        sx={commonStyles.sx}
                    />

                    {/* Filtr typu */}
                    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                        <InputLabel id="type-label" {...commonStyles.InputLabelProps}>Typ</InputLabel>
                        <Select
                            labelId="type-label"
                            value={filterType}
                            label="Typ"
                            onChange={e => setFilterType(e.target.value)}
                            sx={{
                                ...commonStyles.sx,
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' }
                            }}
                        >
                            <MenuItem value="all">Vše</MenuItem>
                            <MenuItem value="task">Úkol</MenuItem>
                            <MenuItem value="project">Projekt</MenuItem>
                            <MenuItem value="subtask">Podúkol</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Filtr projektu pro podúkoly */}
                    <Autocomplete
                        options={projectOptions}
                        getOptionLabel={o => o.name}
                        value={filterProject}
                        onChange={(_, v) => setFilterProject(v)}
                        clearOnEscape
                        renderInput={params => (
                            <TextField
                                {...params}
                                label="Projekt (subtask)"
                                variant="outlined"
                                InputLabelProps={commonStyles.InputLabelProps}
                                InputProps={commonStyles.InputProps}
                                sx={{ ...commonStyles.sx, minWidth: 240 }}
                            />
                        )}
                    />

                    {/* Filtr stavu */}
                    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                        <InputLabel id="state-label" {...commonStyles.InputLabelProps}>Stav</InputLabel>
                        <Select
                            labelId="state-label"
                            value={filterState}
                            label="Stav"
                            onChange={e => setFilterState(e.target.value)}
                            sx={{
                                ...commonStyles.sx,
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' }
                            }}
                        >
                            <MenuItem value="all">Vše</MenuItem>
                            <MenuItem value="0">Neprovedené</MenuItem>
                            <MenuItem value="1">Provedené</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Pouze priorita */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={onlyPriority}
                                onChange={e => setOnlyPriority(e.target.checked)}
                                sx={{ color: 'var(--yellow)', '&.Mui-checked': { color: 'var(--yellow)' } }}
                            />
                        }
                        label="Pouze priorita"
                    />

                    {/* Datum Od */}
                    <DatePicker
                        label="Od"
                        value={dateFrom}
                        onChange={newValue => setDateFrom(newValue)}
                        inputFormat="dd.MM.yyyy"
                        mask="__.__.____"
                        slotProps={{
                            field: {
                                clearable: true,
                                onClear: () => setDateFrom(null),
                                ...commonStyles.InputLabelProps,
                                ...commonStyles.InputProps
                            }
                        }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                sx={commonStyles.sx}
                            />
                        )}
                    />

                    {/* Datum Do */}
                    <DatePicker
                        label="Do"
                        value={dateTo}
                        onChange={newValue => setDateTo(newValue)}
                        inputFormat="dd.MM.yyyy"
                        mask="__.__.____"
                        slotProps={{
                            field: {
                                clearable: true,
                                onClear: () => setDateTo(null),
                                ...commonStyles.InputLabelProps,
                                ...commonStyles.InputProps
                            }
                        }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                sx={commonStyles.sx}
                            />
                        )}
                    />

                </Stack>
            </Box>
        </LocalizationProvider>
    );
}
