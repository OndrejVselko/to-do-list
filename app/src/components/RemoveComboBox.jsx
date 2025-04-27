import React, { useMemo } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function CustomOrderComboBox({ data }) {
    // Vytvoření mapy projektů podle jejich id
    const projectMap = useMemo(() => {
        const projects = data.filter(item => item.type === 'project');
        return projects.reduce((map, project) => {
            map[project.id] = project.name;  // Mapujeme id projektu na jeho name
            return map;
        }, {});
    }, [data]);

    const orderedOptions = useMemo(() => {
        const tasks = data.filter(item => item.type === 'task'); // Běžné úkoly
        const projects = data.filter(item => item.type === 'project'); // Projekty
        const subtasks = data.filter(item => item.type === 'subtask'); // Subtasky

        // Seskupení subtasků podle project_id
        const groupedSubtasks = subtasks.reduce((groups, subtask) => {
            const groupKey = subtask.project_id || 'no_project';  // Pokud nemá project_id, bude v "no_project"
            if (!groups[groupKey]) groups[groupKey] = [];
            groups[groupKey].push(subtask);
            return groups;
        }, {});

        // Kombinace všech úkolů (tasks, projekty, subtasky)
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
                if (option.type === 'task') return 'Běžné úkoly'; // Pro běžné úkoly
                if (option.type === 'project') return 'Projekty'; // Pro projekty
                if (option.type === 'subtask') {
                    const projectName = option.project_id ? projectMap[option.project_id] : 'Bez projektu'; // Název projektu pro subtasky
                    return `Projekt: ${projectName}`;  // Skupina pro subtasky
                }
                return '';
            }}
            getOptionLabel={option => option.name}
            renderInput={params => <TextField {...params} label="Vyber položku" />}
        />
    );
}
