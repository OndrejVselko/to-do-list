import React, { useState, useEffect } from 'react';
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
        priority: false,
        comment: ''
    };

    const [values, setValues] = useState(emptyValues);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (selectedItem) {
            const dateVal = selectedItem.date
                ? selectedItem.date.split('T')[0]
                : '';
            setValues({
                type: selectedItem.type || 'task',
                name: selectedItem.name || '',
                date: dateVal,
                category: selectedItem.category ?? '',
                priority: Boolean(selectedItem.priority),
                comment: selectedItem.comment || ''
            });
        } else {
            setValues(emptyValues);
        }
    }, [selectedItem]);

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleProjectSelect = (selectedProject) => {
        setValues(prev => ({
            ...prev,
            category: selectedProject?.name || ''
        }));
        setSelectedProject(selectedProject);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...values,
            date: values.date ? new Date(values.date).toISOString() : null
        };
        try {
            if (onSubmit) {
                await onSubmit(payload);
            } else {
                console.log('submit payload:', payload);
            }
            setMessage(mode === 'create'
                ? 'Položka byla úspěšně přidána.'
                : 'Změny byly úspěšně uloženy.'
            );
        } catch (error) {
            console.error(error);
            setMessage('Nastala chyba při ukládání.');
        }
    };

    // společné props pro všechny TextField labely
    const labelFocusProps = {
        InputLabelProps: {
            sx: {
                color: 'var(--text_label)',
                '&.Mui-focused': {
                    color: 'var(--yellow)'
                }
            }
        }
    };

    return (
        <Box className="bubble" id="task_form"
             component="form"
             onSubmit={handleSubmit}
             sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, mt: '6vh' }} // přidané mt:2 pro odsazení shora
        >
            <FormControl component="fieldset">
                <FormLabel component="legend" className="mui_input" sx={{ color: 'var(--text_color)' }}>
                    Typ položky
                </FormLabel>
                <RadioGroup
                    row
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                >
                    <FormControlLabel
                        value="task"
                        control={<Radio sx={{ '&.Mui-checked': { color: 'var(--yellow)' } }} />}
                        label="Task"
                    />
                    <FormControlLabel
                        value="project"
                        control={<Radio sx={{ '&.Mui-checked': { color: 'var(--yellow)' } }} />}
                        label="Project"
                    />
                    <FormControlLabel
                        value="subtask"
                        control={<Radio sx={{ '&.Mui-checked': { color: 'var(--yellow)' } }} />}
                        label="Podúkol"
                    />
                </RadioGroup>
            </FormControl>

            {values.type === 'subtask' && (
                <Box>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>Projekt</Typography>
                    <ProjectAutocomplete
                        data={data}
                        onSelect={handleProjectSelect}
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
                {...labelFocusProps}
                InputProps={{
                    sx: {
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
                    }
                }}
                sx={{ input: { color: 'var(--text_color)' } }}
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Datum"
                    disablePast
                    value={values.date ? new Date(values.date) : null}
                    onChange={(newValue) => {
                        const isoDate = newValue ? newValue.toISOString().split('T')[0] : '';
                        setValues(prev => ({ ...prev, date: isoDate }));
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            required
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                                sx: {
                                    color: 'var(--text_label)',
                                    '&.Mui-focused': { color: 'var(--yellow)' }
                                }
                            }}
                            InputProps={{
                                ...params.InputProps,
                                sx: {
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
                                }
                            }}
                            sx={{ input: { color: 'var(--text_color)' } }}
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
                InputLabelProps={{
                    sx: {
                        color: 'var(--text_label)',
                        '&.Mui-focused': { color: 'var(--yellow)' },
                        '&.Mui-disabled': { color: 'var(--text_label)' }
                    }
                }}
                InputProps={{
                    sx: {
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
                        '&.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--text_label)' },
                        '& .MuiInputBase-input.Mui-disabled': { color: 'var(--text_label)' },
                    }
                }}
                sx={{ input: { color: 'var(--text_color)' } }}
            />

            <FormControlLabel
                control={<Checkbox name="priority" checked={values.priority} onChange={handleChange} sx={{ '&.Mui-checked': { color: 'var(--yellow)' } }} />}
                label="Priorita"
            />

            <TextField
                label="Komentář"
                name="comment"
                value={values.comment}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                InputLabelProps={{
                    sx: {
                        color: 'var(--text_label)',
                        '&.Mui-focused': { color: 'var(--yellow)' }
                    }
                }}
                InputProps={{
                    sx: {
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--yellow)' },
                    }
                }}
                sx={{ textarea: { color: 'var(--text_color)' } }}
            />

            <Button
                type="submit"
                variant="outlined"
                sx={{
                    borderColor: 'var(--yellow)',
                    color: 'var(--yellow)',
                    '&:hover': { borderColor: 'var(--yellow)' }
                }}
            >
                <img src="src/icons/save.png" alt="save changes" style={{ height: 25, width: 'auto' }} />
            </Button>

            {message && (
                <Typography variant="body2" sx={{ color: 'var(--text_color)', mt: 1 }}>
                    {message}
                </Typography>
            )}
        </Box>
    );
}
