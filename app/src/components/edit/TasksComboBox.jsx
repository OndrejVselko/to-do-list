import React, { useMemo } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

/**
 * TasksComboBox
 * Autocomplete selector for tasks, projects, and subtasks.
 * @param {Array} data - Items with types 'task' | 'project' | 'subtask'
 * @param {Function} onSelect - Callback when an option is selected
 */
export default function TasksComboBox({ data, onSelect }) {
    // Build a lookup of project names by ID
    const projectMap = useMemo(
        () =>
            data
                .filter(item => item.type === 'project')
                .reduce((map, { id, name }) => ({ ...map, [id]: name }), {}),
        [data]
    );

    // Combine tasks, projects, and subtasks into one list
    const options = useMemo(() => {
        const tasks    = data.filter(item => item.type === 'task');
        const projects = data.filter(item => item.type === 'project');
        const subtasks = data
            .filter(item => item.type === 'subtask')
            .map(sub => ({
                ...sub,
                // add a display label for grouping
                group: sub.project_id ? projectMap[sub.project_id] : 'Bez projektu'
            }));

        return [...tasks, ...projects, ...subtasks];
    }, [data, projectMap]);

    return (
        <Autocomplete
            disablePortal
            options={options}
            groupBy={opt => {
                // Determine group title based on type
                switch (opt.type) {
                    case 'task':    return 'Běžné úkoly';
                    case 'project': return 'Projekty';
                    case 'subtask': return `Projekt: ${opt.group}`;
                    default:        return '';
                }
            }}
            getOptionLabel={opt => opt.name}
            onChange={(_, value) => onSelect(value)}
            sx={{
                flex: 1,
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--yellow) !important'
                }
            }}
            renderInput={params => (
                <TextField
                    {...params}
                    label="Vyber položku"
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow) !important' },
                        '& label':           { color: 'var(--text_label)' },
                        '& label.Mui-focused': { color: 'var(--yellow)' }
                    }}
                />
            )}
        />
    );
}
