import React from 'react';
import Button from '@mui/material/Button';

export default function RemoveButton({ selectedItem, onRemove }) {
    return (
        <Button
            sx={{height: '50px', width: '7vw'}}
            id="remove_button"
            variant="outlined"
            onClick={onRemove}
            disabled={!selectedItem}
        >
            <img src="src/icons/trash.png" alt="remove_task" />
        </Button>
    );
}