import React, { useState } from 'react';
import TasksComboBox from './TasksComboBox.jsx';
import RemoveButton from './RemoveButton.jsx';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default function RemoveTask({ data, setData }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [confirmOpen, setConfirmOpen] = useState(false);

    // Otevře potvrzovací dialog
    const handleOpenConfirm = () => {
        if (selectedItem) {
            setConfirmOpen(true);
        }
    };

    // Zavře dialog bez akce
    const handleCloseConfirm = () => {
        setConfirmOpen(false);
    };

    // Potvrdí smazání
    const handleConfirmRemove = () => {
        setData(prev => {
            // nejprve ověříme, že položka existuje
            const exists = prev.some(item => item.id === selectedItem.id);
            if (!exists) {
                // pokud neexistuje, upozorníme a nebudeme nic mazat
                window.alert(`Položka s ID ${selectedItem.id} nebyla nalezena.`);
                return prev;
            }
            // pokud je vybrán projekt, smažeme projekt i jeho podúkoly
            if (selectedItem.type === 'project') {
                return prev.filter(item => {
                    if (item.type === 'subtask' && item.project_id === selectedItem.id) {
                        return false;
                    }
                    return item.id !== selectedItem.id;
                });
            }
            // Jinak smaž jen vybranou položku
            return prev.filter(item => item.id !== selectedItem.id);
        });

        // reset stavů
        setSelectedItem(null);
        setInputValue('');
        setConfirmOpen(false);
    };

    return (
        <>
            <div className="bubble" style={{ height: '120px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <TasksComboBox
                    data={data}
                    value={selectedItem}
                    inputValue={inputValue}
                    onSelect={setSelectedItem}
                    onInputChange={setInputValue}
                />
                <RemoveButton selectedItem={selectedItem} onRemove={handleOpenConfirm} />
            </div>

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
