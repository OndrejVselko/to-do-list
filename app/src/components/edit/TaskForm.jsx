import React, { useState, useEffect, useMemo } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    Checkbox,
    Button,
    Typography
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import csLocale from 'date-fns/locale/cs';
import ProjectAutocomplete from './ProjectAutocomplete.jsx';

export default function TaskProjectForm({
    selectedItem = null,
    onSubmit,
    data,
    setSelectedProject,
    mode
}) {
    const emptyValues = {
        type: 'task',
        name: '',
        date: null,
        category: '',
        project_id: null,
        priority: false,
        comment: ''
    };

    const [values, setValues] = useState(emptyValues);
    const [message, setMessage] = useState('');


    useEffect(() => {
        if (selectedItem) {
            setValues({
                type: selectedItem.type || 'task',
                name: selectedItem.name || '',
                date: selectedItem.date ? new Date(selectedItem.date) : null,
                category: selectedItem.category ?? '',
                project_id: selectedItem.project_id ?? null,
                priority: Boolean(selectedItem.priority),
                comment: selectedItem.comment || ''
            });
        } else {
            setValues(emptyValues);
        }
        setMessage('');
    }, [selectedItem]);

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleProjectSelect = (project) => {
        setValues(prev => ({
            ...prev,
            category: project?.name || '',
            project_id: project?.id || null
        }));
        setSelectedProject(project);
    };

    const filteredProjects = useMemo(() => {
        const today = new Date();
        today.setHours(0,0,0,0);
        return data.filter(item =>
            item.type === 'project' &&
            new Date(item.date) >= today
        );
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!values.name || !values.date) {
            setMessage('Název a datum jsou povinné.');
            return;
        }
        if (values.type === 'subtask' && !values.project_id) {
            setMessage('Prosím vyberte projekt.');
            return;
        }

        const payload = {
            ...values,
            date: values.date.toISOString()
        };

        try {
            if (onSubmit) await onSubmit(payload);

            if (mode === 'create') {
                setValues(emptyValues);
                setSelectedProject(null);
            }
            setMessage(
                mode === 'create'
                    ? 'Položka byla úspěšně přidána.'
                    : 'Změny byly úspěšně uloženy.'
            );
        } catch {
            setMessage('Nastala chyba při ukládání.');
        }
    };

    const inputStyles = {
        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
    };

    const labelStyles = {
        InputLabelProps: {
            sx: {
                color: 'var(--text_label)',
                '&.Mui-focused': { color: 'var(--yellow)' }
            }
        }
    };

    return (
        <Box
            className="bubble"
            id="task_form"
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, mt: '6vh' }}
        >
            <FormControl component="fieldset">
                <FormLabel sx={{
                    color: 'var(--text_color)',
                    '&.Mui-focused': { color: 'var(--text_color)' }
                }}>
                    <p style={{fontSize:'22px'}}>Typ položky</p>
                </FormLabel>
                <RadioGroup
                    row
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                >
                    {['task', 'project', 'subtask'].map(val => (
                        <FormControlLabel
                            key={val}
                            value={val}
                            control={<Radio sx={{ '&.Mui-checked': { color: 'var(--yellow)' } }} />}
                            label={
                                val === 'task'
                                    ? 'Úkol'
                                    : val === 'project'
                                        ? 'Projekt'
                                        : 'Podúkol'
                            }
                            sx={{ '& .MuiFormControlLabel-label': { color: 'var(--text_color)' } }}
                        />
                    ))}
                </RadioGroup>
            </FormControl>

            {values.type === 'subtask' && (
                <Box>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        Projekt *
                    </Typography>
                    <ProjectAutocomplete
                        data={filteredProjects}
                        onSelect={handleProjectSelect}
                        required
                    />
                </Box>
            )}

            <TextField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                required
                fullWidth
                InputProps={{ sx: inputStyles }}
                {...labelStyles}
                sx={{ input: { color: 'var(--text_color)' } }}
            />

            <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={csLocale}
            >
                <DatePicker
                    label="Datum"
                    disablePast
                    value={values.date}
                    onChange={(newDate) =>
                        setValues(prev => ({ ...prev, date: newDate }))
                    }
                    inputFormat="dd.MM.yyyy"
                    mask="__.__.____"
                    slotProps={{
                        textField: {
                            sx: {
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'var(--yellow)' },
                                    '&:hover fieldset': { borderColor: 'var(--yellow)' },
                                    '&.Mui-focused fieldset': { borderColor: 'var(--yellow)' }
                                },
                                '& .MuiInputBase-input': { color: 'var(--text_color)' },
                                '& .MuiInputLabel-root': { color: 'var(--yellow)' },
                                '& .MuiInputLabel-root.Mui-focused': { color: 'var(--yellow)' }
                            }
                        },
                        popper: {
                            sx: {
                                '& .MuiPaper-root': {
                                    backgroundColor: 'var(--background_primary)',
                                    border: '1px solid var(--yellow)',
                                    color: 'var(--text_color)'
                                }
                            }
                        },
                        day: {
                            sx: {
                                '&.Mui-selected, &.Mui-selected:hover': {
                                    backgroundColor: 'var(--yellow)',
                                    color: 'var(--background_primary)'
                                },
                                color: 'var(--text_color)'
                            }
                        },
                        actionBar: {
                            sx: {
                                '& .MuiButton-textPrimary': {
                                    color: 'var(--yellow)'
                                }
                            }
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            required
                            fullWidth
                        />
                    )}
                />
            </LocalizationProvider>

            <TextField
                label="Kategorie"
                name="category"
                value={values.category}
                onChange={handleChange}
                disabled={values.type === 'subtask'}
                fullWidth
                InputProps={{
                    sx: inputStyles,
                    '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--text_label)'
                    }
                }}
                InputLabelProps={{
                    sx: {
                        color: 'var(--text_label)',
                        '&.Mui-focused': { color: 'var(--yellow)' },
                        '&.Mui-disabled': { color: 'var(--text_label)' }
                    }
                }}
                sx={{ input: { color: 'var(--text_color)' } }}
            />

            <FormControlLabel
                control={
                    <Checkbox
                        name="priority"
                        checked={values.priority}
                        onChange={handleChange}
                        sx={{ '&.Mui-checked': { color: 'var(--yellow)' } }}
                    />
                }
                label="Priorita"
                sx={{ '& .MuiFormControlLabel-label': { color: 'var(--text_color)' } }}
            />

            <TextField
                label="Poznámka"
                name="comment"
                value={values.comment}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                InputProps={{ sx: inputStyles }}
                {...labelStyles}
                sx={{ textarea: { color: 'var(--text_color)' } }}
            />

            <Button
                type="submit"
                variant="outlined"
                disabled={!values.date}
                sx={{ borderColor: 'var(--yellow)', color: 'var(--yellow)' }}
            >
                <img
                    src="src/icons/save.png"
                    alt="save changes"
                    style={{ height: 25, width: 'auto' }}
                />
            </Button>

            {message && (
                <Typography variant="body2" sx={{ color: 'var(--text_color)', mt: 1 }}>
                    {message}
                </Typography>
            )}
        </Box>
    );
}
