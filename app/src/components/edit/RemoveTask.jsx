// src/components/RemoveTask.jsx
import React, { useState } from 'react';
import TasksComboBox from './TasksComboBox.jsx';
import RemoveButton from './RemoveButton.jsx';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

export default function RemoveTask({ data, setData }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleOpenConfirm = () => {
        if (selectedItem) {
            setConfirmOpen(true);
        }
    };

    const handleCloseConfirm = () => {
        setConfirmOpen(false);
    };

    const handleConfirmRemove = () => {
        setData(prev => {
            const exists = prev.some(item => item.id === selectedItem.id);
            if (!exists) {
                window.alert(`Položka s ID ${selectedItem.id} nebyla nalezena.`);
                return prev;
            }
            if (selectedItem.type === 'project') {
                return prev.filter(item => {
                    if (item.type === 'subtask' && item.project_id === selectedItem.id) {
                        return false;
                    }
                    return item.id !== selectedItem.id;
                });
            }
            return prev.filter(item => item.id !== selectedItem.id);
        });

        setSelectedItem(null);
        setInputValue('');
        setConfirmOpen(false);
    };

    return (
        <>
            <Box
                className="bubble"
                sx={{
                    height: '150px',
                    mt: '6vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginRight: '4vw',
                }}
            >
                <Box sx={{ width: '80%', mt: 1 }}>
                    <TasksComboBox
                        data={data}
                        value={selectedItem}
                        inputValue={inputValue}
                        onSelect={setSelectedItem}
                        onInputChange={setInputValue}
                    />
                </Box>
                <Box sx={{ mt: 2 }}>
                    <RemoveButton selectedItem={selectedItem} onRemove={handleOpenConfirm} />
                </Box>
            </Box>

            <Dialog
                open={confirmOpen}
                onClose={handleCloseConfirm}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
            >
                <DialogTitle id="confirm-dialog-title">
                    Opravdu si přejete odstranit {selectedItem?.type === 'project' ? 'projekt a jeho podúkoly' : 'úkol'}?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-dialog-description">
                        {selectedItem && (
                            <>
                                Určitě chcete odstranit <strong>{selectedItem.name}</strong>
                                {selectedItem.type === 'project' ? ' i všechny jeho podúkoly' : ''}?
                            </>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirm}>Zrušit</Button>
                    <Button onClick={handleConfirmRemove} autoFocus>
                        Odstranit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
