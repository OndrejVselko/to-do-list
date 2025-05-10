import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton, Button, Box } from '@mui/material';
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
            // Notify parent about cleared selection
            if (onSelectItem) onSelectItem(null);
            // Notify parent about mode change
            if (onModeChange) onModeChange(newMode);
        }
    };

    const handleSelect = (item) => {
        setSelectedItem(item);
        if (onSelectItem) onSelectItem(item);
    };

    return (
        <div className="bubble" style={{ height: '120px', display: 'block', gap: '10px', alignItems: 'center' }}>
            <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={handleModeChange}
                aria-label="mode"
                sx={{
                    '& .MuiToggleButton-root': {
                        color: 'var(--text_color)',
                        borderColor: 'var(--yellow)',
                        width: '80%',
                    },
                    '& .Mui-selected': {
                        color: 'var(--yellow)',
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
                <TasksComboBox
                    data={data}
                    onSelect={handleSelect}
                />
            )}
        </div>
    );
}
