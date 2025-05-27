// src/components/Switching.jsx
import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
import TasksComboBox from './TasksComboBox.jsx';

/**
 * Switching component allows toggling between 'create' and 'edit' modes.
 * When in 'edit' mode, it selects an item and notifies the parent via onSelectItem callback.
 *
 * Props:
 * - data: array of task items
 * - onSelectItem: function(item) to pass the selected item back to parent
 * - onModeChange: function(mode) to notify parent about mode change
 */
export default function Switching({ data, onSelectItem, onModeChange }) {
    const [mode, setMode] = useState('create'); // 'create' | 'edit'
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
                mt: '6vh',           // drobné odsazení shora
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',  // horizontální vycentrování
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
