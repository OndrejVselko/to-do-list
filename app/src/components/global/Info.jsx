import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function InfoDialog({ open, onClose, title = 'Informace', children }) {
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="info-dialog-title"
                PaperProps={{
                    sx: {
                        backgroundColor: 'var(--background_primary)',
                        border: '1px solid var(--yellow)',
                        borderRadius: 2,
                        color: "var(--text_color)",
                    }
                }}>
            <DialogTitle id="info-dialog-title">{title}</DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} sx={{color: "var(--yellow)"}}>
                    Zavřít
                </Button>
            </DialogActions>
        </Dialog>
    );
}