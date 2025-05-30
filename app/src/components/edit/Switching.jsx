import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
import TasksComboBox from './TasksComboBox.jsx';

export default function Switching({ data, onSelectItem, onModeChange }) {
    const [mode, setMode] = useState('create');
    const [selectedItem, setSelectedItem] = useState(null);

    const handleModeChange = (event, newMode) => {
        if (newMode) {
            setMode(newMode);
            setSelectedItem(null);
            if (onSelectItem) onSelectItem(null);
            if (onModeChange) onModeChange(newMode);
        }
    };

    const handleSelect = (item) => {
        setSelectedItem(item);
        if (onSelectItem) onSelectItem(item);
    };

    return (
        <Box
            className="bubble"
            sx={{
                height: '150px',
                mt: '6vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginLeft: '4vw',
            }}
        >
            <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={handleModeChange}
                aria-label="mode"
                sx={{
                    mt: 1,
                    '& .MuiToggleButton-root': {
                        color: 'var(--text_color)',
                        borderColor: 'var(--yellow)',
                    },
                    '& .MuiToggleButton-root.Mui-selected': {
                        color: 'var(--yellow)',
                        backgroundColor: 'transparent',
                    },
                }}
            >
                <ToggleButton value="create" aria-label="create">
                    Vytvořit
                </ToggleButton>
                <ToggleButton value="edit" aria-label="edit">
                    Upravit
                </ToggleButton>
            </ToggleButtonGroup>

            {mode === 'edit' && (
                <Box sx={{ width: '80%', mt: 2 }}>
                    <TasksComboBox
                        data={data}
                        onSelect={handleSelect}
                    />
                </Box>
            )}
        </Box>
    );
}
