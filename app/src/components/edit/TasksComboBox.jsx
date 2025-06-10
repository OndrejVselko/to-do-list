import React, { useMemo, useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function TasksComboBox({ data, onSelect, selectedItem }) {
    const [value, setValue] = useState(null);

    const todayMidnight = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d.getTime();
    }, []);

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

    const options = useMemo(() => {
        const isOnOrAfterToday = dateStr => {
            const d = new Date(dateStr);
            d.setHours(0, 0, 0, 0);
            return d.getTime() >= todayMidnight;
        };

        const tasks = data.filter(
            item =>
                item.type === 'task' &&
                item.state === 0 &&
                isOnOrAfterToday(item.date)
        );

        const projects = data.filter(
            item =>
                item.type === 'project' &&
                item.state === 0 &&
                isOnOrAfterToday(item.date)
        );

        const subtasks = data
            .filter(item => item.type === 'subtask')
            .map(sub => ({
                ...sub,
                group:
                    sub.project_id != null
                        ? projectMap[sub.project_id] || 'Neznámý projekt'
                        : 'Bez projektu'
            }));

        return [...tasks, ...projects, ...subtasks];
    }, [data, projectMap, todayMidnight]);

    // Set the default value when selectedItem changes
    useEffect(() => {
        if (selectedItem) {
            // Find the item in options that matches the selectedItem
            const defaultValue = options.find(option => option.id === selectedItem.id);
            setValue(defaultValue || null);
        } else {
            setValue(null);
        }
    }, [selectedItem, options]);

    const handleChange = (_, newValue) => {
        setValue(newValue);
        onSelect(newValue);
    };

    return (
        <Autocomplete
            disablePortal
            options={options}
            value={value}
            groupBy={opt => {
                if (opt.type === 'task') return 'Běžné úkoly';
                if (opt.type === 'project') return 'Projekty';
                return `Podúkoly projektu: ${opt.group}`;
            }}
            getOptionLabel={opt => opt.name}
            onChange={handleChange}
            isOptionEqualToValue={(option, value) => option.id === value.id}
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
                            '&.Mui-focused': { color: 'var(--yellow)' }
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