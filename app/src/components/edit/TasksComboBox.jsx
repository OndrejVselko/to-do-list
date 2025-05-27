import React, { useMemo } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

/**
 * TasksComboBox
 * Autocomplete selector for tasks, projects, and subtasks.
 * Only shows:
 *  - tasks & projects with state === 0 and date >= today
 *  - all subtasks (regardless of state/date)
 *
 * @param {Array} data - Items with types 'task' | 'project' | 'subtask'
 * @param {Function} onSelect - Callback when an option is selected
 */
export default function TasksComboBox({ data, onSelect }) {
    // Current date/time for filtering
    const now = useMemo(() => new Date(), []);

    // Build a lookup of project names by ID
    const projectMap = useMemo(
        () =>
            data
                .filter(item => item.type === 'project')
                .reduce((map, { id, name }) => {
                    map[id] = name;
                    return map;
                }, {}),
        [data]
    );

    // Combine & filter tasks, projects, and subtasks into one list
    const options = useMemo(() => {
        // Only tasks with state 0 and non-expired date
        const tasks = data.filter(
            item =>
                item.type === 'task' &&
                item.state === 0 &&
                new Date(item.date) >= now
        );

        // Only projects with state 0 and non-expired date
        const projects = data.filter(
            item =>
                item.type === 'project' &&
                item.state === 0 &&
                new Date(item.date) >= now
        );

        // All subtasks, but annotate group name
        const subtasks = data
            .filter(item => item.type === 'subtask')
            .map(sub => ({
                ...sub,
                group: sub.project_id != null ? projectMap[sub.project_id] : 'Bez projektu'
            }));

        return [...tasks, ...projects, ...subtasks];
    }, [data, projectMap, now]);

    return (
        <Autocomplete
            disablePortal
            options={options}
            groupBy={opt => {
                switch (opt.type) {
                    case 'task':
                        return 'Běžné úkoly';
                    case 'project':
                        return 'Projekty';
                    case 'subtask':
                        return `Projekt: ${opt.group}`;
                    default:
                        return '';
                }
            }}
            getOptionLabel={opt => opt.name}
            onChange={(_, value) => onSelect(value)}
            sx={{
                width: '90%',
                ml: '5%',
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--yellow) !important'
                },
                '& .MuiAutocomplete-inputRoot .MuiAutocomplete-input': {
                    color: 'var(--text_color)'
                }
            }}
            renderInput={params => (
                <TextField
                    {...params}
                    label="Vyber položku"
                    variant="outlined"
                    InputLabelProps={{
                        sx: {
                            color: 'var(--text_label)',
                            '&.Mui-focused': {
                                color: 'var(--yellow)'
                            }
                        }
                    }}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--yellow) !important'
                        },
                        '& label': { color: 'var(--text_label)' },
                        '& label.Mui-focused': { color: 'var(--yellow)' },
                        input: { color: 'var(--text_color)' }
                    }}
                />
            )}
        />
    );
}
