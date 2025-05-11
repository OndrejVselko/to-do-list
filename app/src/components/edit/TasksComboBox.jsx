import React, { useMemo } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function TasksComboBox({ data, onSelect }) {
    const projectMap = useMemo(() => {
        const projects = data.filter(item => item.type === 'project');
        return projects.reduce((map, project) => {
            map[project.id] = project.name;
            return map;
        }, {});
    }, [data]);

    const orderedOptions = useMemo(() => {
        const tasks = data.filter(item => item.type === 'task');
        const projects = data.filter(item => item.type === 'project');
        const subtasks = data.filter(item => item.type === 'subtask');

        const groupedSubtasks = subtasks.reduce((groups, subtask) => {
            const key = subtask.project_id || 'no_project';
            if (!groups[key]) groups[key] = [];
            groups[key].push(subtask);
            return groups;
        }, {});

        return [
            ...tasks,
            ...projects,
            ...Object.values(groupedSubtasks).flat()
        ];
    }, [data]);

    return (
        <Autocomplete
            disablePortal
            options={orderedOptions}
            groupBy={option => {
                if (option.type === 'task') return 'Běžné úkoly';
                if (option.type === 'project') return 'Projekty';
                if (option.type === 'subtask') {
                    const name = option.project_id
                        ? projectMap[option.project_id]
                        : 'Bez projektu';
                    return `Projekt: ${name}`;
                }
                return '';
            }}
            getOptionLabel={option => option.name}
            onChange={(e, value) => onSelect(value)}
            sx={{
                flex: 1,
                // Barva textu v poli i v dropdownu
                '& .MuiInputBase-input, & .MuiAutocomplete-option': {
                    color: 'var(--text_color)',
                },
                // Ohraničení fieldsetu vždy žluté
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--yellow) !important',
                },
            }}
            renderInput={params => (
                <TextField
                    {...params}
                    label="Vyber položku"
                    variant="outlined"
                    sx={{
                        // Ohraničení i v labelu a helper textu
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--yellow) !important',
                        },
                        '& label': {
                            color: 'var(--text_label)',
                        },
                        '& .MuiFormHelperText-root': {
                            color: 'var(--text_color)',
                        },
                    }}
                />
            )}
        />
    );
}
