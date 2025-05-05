import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

export default function ProjectAutocomplete({ data, onSelect }) {
    // Filtrovat projekty
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
                        // zachovám všechny původní props a jen přidám sx
                        ...params.InputLabelProps,
                        sx: { color: 'var(--text_label)' }
                    }}
                    InputProps={{
                        // zachovám všechny původní props (endAdornment apod.) a jen přidám sx
                        ...params.InputProps,
                        sx: {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--yellow)',      // žlutý rámeček
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--yellow)',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--yellow)',
                            },
                            '& input': {
                                color: 'var(--text_color)',             // bílý text v poli
                            },
                        }
                    }}
                />
            )}
        />

    );
}