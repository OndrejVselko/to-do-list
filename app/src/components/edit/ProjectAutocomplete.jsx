import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

export default function ProjectAutocomplete({ data, onSelect }) {
    const projectItems = data.filter(item => item.type === 'project');

    return (
        <Autocomplete
            options={projectItems}
            getOptionLabel={(option) => option.name || ''}
            onChange={(event, value) => onSelect(value)}
            fullWidth
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Vyber projekt"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                        ...params.InputLabelProps,
                        sx: { color: 'var(--text_label)' }
                    }}
                    InputProps={{
                        ...params.InputProps,
                        sx: {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--yellow)',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--yellow)',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--yellow)',
                            },
                            '& input': {
                                color: 'var(--text_color)',
                            },
                        }
                    }}
                />
            )}
        />

    );
}