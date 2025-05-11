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
import ProjectAutocomplete from "./ProjectAutocomplete.jsx";

export default function TaskProjectForm({ selectedItem = null, onSubmit, data, setSelectedProject, mode}) {
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
        // Aktualizujeme hodnotu pro kategorii, když je vybrán projekt
        setValues(prev => ({
            ...prev,
            category: selectedProject?.name || ''  // pokud je vybrán projekt, nastavíme jeho název jako kategorii
        }));
        setSelectedProject(selectedProject);  // nastavíme projekt do stavu
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
            if (mode === 'create') {
                setMessage('Položka byla úspěšně přidána.');
            } else if(mode === 'edit'){
                setMessage('Změny byly úspěšně uloženy.');
            }
        } catch (error) {
            console.error(error);
            setMessage('Nastala chyba při ukládání.');
        }
    };

    return (
        <Box className={"bubble"} id="task_form"
             component="form"
             onSubmit={handleSubmit}
             sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}
        >
            <FormControl component="fieldset">
                <FormLabel component="legend" className={"mui_input"} sx={{ color: 'var(--text_color)' }}>
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
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        Projekt
                    </Typography>
                    <ProjectAutocomplete
                        data={data}
                        onSelect={handleProjectSelect}  // předáme funkci pro zpracování vybraného projektu
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
                InputLabelProps={{
                    sx: { color: 'var(--text_label)' }
                }}
                InputProps={{
                    sx: {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--yellow)', // základní barva ohraničení
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--yellow)', // barva ohraničení při hoveru
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--yellow)', // barva ohraničení při focusu
                        },
                    }
                }}
                sx={{
                    input: { color: 'var(--text_color)' }
                }}
            />

            <TextField
                label="Datum"
                name="date"
                type="date"
                value={values.date}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                    sx: { color: 'var(--text_color)' }
                }}
                InputProps={{
                    sx: {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--yellow)', // základní barva ohraničení
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--yellow)', // barva ohraničení při hoveru
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--yellow)', // barva ohraničení při focusu
                        },
                    }
                }}
                sx={{
                    input: { color: 'var(--text_color)' }
                }}
                required
                fullWidth
            />

            <TextField
                label="Kategorie"
                name="category"
                value={values.category}
                onChange={handleChange}
                disabled={values.type === 'subtask'}
                fullWidth
                InputLabelProps={{
                    sx: {
                        color: 'var(--text_label)',       // běžná barva labelu
                        '&.Mui-disabled': {
                            color: 'var(--text_label)',        // label červený, když je disabled
                        },
                    }
                }}
                InputProps={{
                    sx: {
                        // outline ve všech běžných stavech žluté
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--yellow)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--yellow)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--yellow)',
                        },
                        // outline červené, když je disabled
                        '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--text_label)',
                        },
                        // text uvnitř červený, když je disabled
                        '& .MuiInputBase-input.Mui-disabled': {
                            color: 'var(--text_label)',
                        },
                    }
                }}
                sx={{
                    // normální barva textu
                    input: {
                        color: 'var(--text_color)',
                    },
                    '& .MuiInputBase-root.Mui-disabled .MuiInputBase-input': {
                        color: 'red',
                    },
                }}
            />



            <FormControlLabel
                control={
                    <Checkbox
                        name="priority"
                        checked={values.priority}
                        onChange={handleChange}
                        sx={{
                            '&.Mui-checked': {
                                color: 'var(--yellow)', // Změna barvy checkboxu při zaškrtnutí
                            },
                        }}
                    />
                }
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
                    sx: { color: 'var(--text_label)' }
                }}
                InputProps={{
                    sx: {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--yellow)', // Základní barva ohraničení
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--yellow)', // Barva ohraničení při hoveru
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--yellow)', // Barva ohraničení při focusu
                        },
                    }
                }}
                sx={{
                    textarea: { color: 'var(--text_color)' }
                }}
            />

            <Button
                type="submit"
                variant="outlined" // Nastavíme variant na outlined
                sx={{
                    borderColor: 'var(--yellow)', // Barva borderu
                    color: 'var(--yellow)', // Barva textu
                    '&:hover': {
                        borderColor: 'var(--yellow)', // Barva borderu při hoveru
                    },
                }}
            >
                <img src="src/icons/save.png" alt="save changes" style={{height: '25px', width: "auto"}}/>
            </Button>
            {message && (
                <Typography variant="body2" sx={{ color: 'var(--text_color)', mt: 1 }}>
                    {message}
                </Typography>
            )}
        </Box>
    );
}
