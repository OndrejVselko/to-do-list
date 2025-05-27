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
import ProjectAutocomplete from "./ProjectAutocomplete.jsx";

export default function TaskProjectForm({ selectedItem = null, onSubmit, data, setSelectedProject, mode }) {
    const emptyValues = {
        type: 'task',
        name: '',
        date: '',
        category: '',
        project_id: null,
        priority: false,
        comment: ''
    };

    const [values, setValues] = useState(emptyValues);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (selectedItem) {
            const dateVal = selectedItem.date ? selectedItem.date.split('T')[0] : '';
            setValues({
                type: selectedItem.type || 'task',
                name: selectedItem.name || '',
                date: dateVal,
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
        setValues(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleProjectSelect = (selectedProjectObj) => {
        setValues(prev => ({
            ...prev,
            category: selectedProjectObj?.name || '',
            project_id: selectedProjectObj?.id || null
        }));
        setSelectedProject(selectedProjectObj);
    };

    const filteredProjects = useMemo(() => {
        const today = new Date();
        today.setHours(0,0,0,0);
        return data.filter(item => item.type === 'project' && new Date(item.date) >= today);
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
        const payload = { ...values, date: values.date ? new Date(values.date).toISOString() : null };
        try {
            if (onSubmit) await onSubmit(payload);
            setMessage(mode === 'create' ? 'Položka byla úspěšně přidána.' : 'Změny byly úspěšně uloženy.');
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
            sx: { color: 'var(--text_label)', '&.Mui-focused': { color: 'var(--yellow)' } }
        }
    };

    return (
        <Box className="bubble" id="task_form" component="form" onSubmit={handleSubmit}
             sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, mt: '6vh' }}>

            <FormControl component="fieldset">
                <FormLabel className="mui_input" sx={{ color: 'var(--text_color)', '&.Mui-focused': { color: 'var(--text_color)' }, '&.Mui-focused\:not(&)' : {} }}>Typ položky</FormLabel>
                <RadioGroup row name="type" value={values.type} onChange={handleChange}>
                    {['task','project','subtask'].map(val => (
                        <FormControlLabel
                            key={val}
                            value={val}
                            control={<Radio sx={{ '&.Mui-checked': { color: 'var(--yellow)' } }} />}
                            label={val === 'subtask' ? 'Podúkol' : val.charAt(0).toUpperCase()+val.slice(1)}
                            sx={{ '& .MuiFormControlLabel-label': { color: 'var(--text_color)' } }}
                        />
                    ))}
                </RadioGroup>
            </FormControl>

            {values.type === 'subtask' && (
                <Box>
                    <Typography variant="subtitle1" sx={{ mb: 1,  }}>Projekt *</Typography>
                    <ProjectAutocomplete data={filteredProjects} onSelect={handleProjectSelect} required />
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

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Datum"
                    disablePast
                    value={values.date ? new Date(values.date) : null}
                    onChange={(newValue) => setValues(prev => ({
                        ...prev,
                        date: newValue ? newValue.toISOString().split('T')[0] : ''
                    }))}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            required
                            fullWidth
                            InputProps={{ ...params.InputProps, sx: inputStyles }}
                            InputLabelProps={{ shrink: true, sx: { color: 'var(--text_label)', '&.Mui-focused': { color: 'var(--yellow)' } } }}
                            sx={{ input: { color: 'var(--text_color)' } }}
                        />
                    )}
                />
            </LocalizationProvider>

            <TextField
                label="Kategorie"
                name="category"
                value={values.category}
                disabled={values.type === 'subtask'}
                fullWidth
                InputProps={{ sx: inputStyles, '&.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--text_label)' } }}
                InputLabelProps={{ sx: { color: 'var(--text_label)', '&.Mui-focused': { color: 'var(--yellow)' }, '&.Mui-disabled': { color: 'var(--text_label)' } } }}
                sx={{ input: { color: 'var(--text_color)' } }}
            />

            <FormControlLabel
                control={<Checkbox name="priority" checked={values.priority} onChange={handleChange} sx={{ '&.Mui-checked': { color: 'var(--yellow)' } }} />}
                label="Priorita"
                sx={{ '& .MuiFormControlLabel-label': { color: 'var(--text_color)' } }}
            />

            <TextField
                label="Komentář"
                name="comment"
                value={values.comment}
                onChange={handleChange}
                multiline rows={4} fullWidth
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
                <img src="src/icons/save.png" alt="save changes" style={{ height: 25, width: 'auto' }} />
            </Button>

            {message && <Typography variant="body2" sx={{ color: 'var(--text_color)', mt: 1 }}>{message}</Typography>}
        </Box>
    );
}
