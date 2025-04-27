import * as React from 'react';
import Button from '@mui/material/Button';

export default function OutlinedButtons() {
    return (
        <Button id="remove_button" variant="outlined"
                onClick={() => {
                    alert('clicked');
                }}

        ><img src="src/icons/trash.png" alt="remove_task"/></Button>
    );
}