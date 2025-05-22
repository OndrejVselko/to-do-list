// src/components/NewTaskDialog.jsx
import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function NewTaskDialog({ open, onClose, onCreate }) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [comment, setComment] = useState('');
    const [date, setDate] = useState(null);
    const [priority, setPriority] = useState(false);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isValid =
        name.trim() !== '' &&
        date instanceof Date &&
        (() => {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0);
            return d >= today;
        })();

    const handleSubmit = () => {
        onCreate({ name, category, comment, date, priority });
        onClose();
    };

    // Common sx for outline fields, including date input background
    const outlineStyles = {
        '& .MuiOutlinedInput-root': {
            backgroundColor: 'var(--background_primary)',
            '& fieldset': { borderColor: 'var(--yellow)' },
            '&:hover fieldset': { borderColor: 'var(--yellow)' },
            '&.Mui-focused fieldset': { borderColor: 'var(--yellow)' },
        },
        '& .MuiInputLabel-root': { color: 'var(--text_label)' },
        '& .MuiInputBase-input': { color: 'var(--text_color)' },
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    backgroundColor: 'var(--background_primary)',
                    border: '1px solid var(--yellow)',
                    borderRadius: 2,
                }
            }}
        >
            <DialogTitle sx={{ color: 'var(--text_color)' }}>
                Vytvořit úkol
            </DialogTitle>
            <DialogContent sx={{ color: 'var(--text_color)' }}>
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    label="Název úkolu"
                    fullWidth
                    value={name}
                    onChange={e => setName(e.target.value)}
                    variant="outlined"
                    sx={outlineStyles}
                />
                <TextField
                    margin="dense"
                    label="Kategorie"
                    fullWidth
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    variant="outlined"
                    sx={outlineStyles}
                />
                <TextField
                    margin="dense"
                    label="Poznámka"
                    fullWidth
                    multiline
                    rows={3}
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    variant="outlined"
                    sx={outlineStyles}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        required
                        label="Datum"
                        value={date}
                        onChange={setDate}
                        disablePast
                        slotProps={{
                            textField: { sx: outlineStyles },
                            popper: {
                                sx: {
                                    '& .MuiPaper-root': {
                                        backgroundColor: 'var(--background_primary)',
                                        border: '1px solid var(--yellow)',
                                        color: 'var(--text_color)',
                                    }
                                }
                            },
                            day: {
                                sx: {
                                    '&.Mui-selected, &.Mui-selected:hover': {
                                        backgroundColor: 'var(--yellow)',
                                        color: 'var(--background_primary)',
                                    },
                                    color: 'var(--text_color)',
                                }
                            },
                            actionBar: {
                                sx: {
                                    '& .MuiButton-textPrimary': { color: 'var(--yellow)' }
                                }
                            }
                        }}
                    />
                </LocalizationProvider>
                <FormControlLabel
                    sx={{ '& .MuiFormControlLabel-label': { color: 'var(--text_color)' } }}
                    control={
                        <Checkbox
                            checked={priority}
                            onChange={e => setPriority(e.target.checked)}
                            sx={{
                                color: 'var(--yellow)',
                                '&.Mui-checked': { color: 'var(--yellow)' },
                            }}
                        />
                    }
                    label="Prioritní"
                />
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        borderColor: 'var(--yellow)',
                        color: 'var(--text_color)',
                        '&:hover': { borderColor: 'var(--yellow)' },
                        '&:active': { borderColor: 'var(--yellow)' },
                    }}
                >
                    Zrušit
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="outlined"
                    disabled={!isValid}
                    sx={{
                        borderColor: 'var(--yellow)',
                        color: 'var(--text_color)',
                        '&:hover': { borderColor: 'var(--yellow)' },
                        '&:active': { borderColor: 'var(--yellow)' },
                    }}
                >
                    Vytvořit
                </Button>
            </DialogActions>
        </Dialog>
    );
}
