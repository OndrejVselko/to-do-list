import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import RemoveTask from './RemoveTask.jsx';
import Switching from './Switching.jsx';
import TaskForm from './TaskForm.jsx';

export default function Edit({ data, setData, edited, setEdited }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [mode, setMode] = useState('create');
    const [selectedProject, setSelectedProject] = useState(null);
    const [showData, setShowData] = useState(false);

    // Pokud přijde nový "edited" objekt, nastavíme ho do selectedItem a změníme režim na 'edit'
    useEffect(() => {
        if (edited) {
            setSelectedItem(edited);
            setMode('edit');
            // Pokud je subtask, vybereme i projekt
            if (edited.type === 'subtask') {
                const project = data.find(item => item.id === edited.project_id) || null;
                setSelectedProject(project);
            }
            setEdited(null);
        }
    }, [edited, data]);

    const handleForm = (formData) => {
        if (mode === 'create') {
            const maxId = data.reduce((max, item) => (item.id > max ? item.id : max), 0);
            let projectId = null;
            if (selectedProject && formData.type === 'subtask') {
                projectId = selectedProject.id;
            }
            setData(prevData => [
                ...prevData,
                { id: maxId + 1, ...formData, state: 0, project_id: projectId }
            ]);
        } else {
            setData(prevData =>
                prevData.map(item =>
                    item.id === selectedItem.id
                        ? {
                            ...item,
                            ...formData,
                            project_id: formData.project_id !== undefined ? formData.project_id : item.project_id,
                            state: formData.state !== undefined ? formData.state : item.state
                        }
                        : item
                )
            );
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '2rem',
                    width: '100%',
                    padding: '1rem',
                    boxSizing: 'border-box',
                    position: 'relative'
                }}
            >
                <Switching
                    data={data}
                    onSelectItem={setSelectedItem}
                    onModeChange={setMode}
                />

                <TaskForm
                    selectedItem={selectedItem}
                    onSubmit={handleForm}
                    data={data}
                    setSelectedProject={setSelectedProject}
                    mode={mode}
                />

                <RemoveTask
                    data={data}
                    setData={setData}
                />

                <Box sx={{ position: 'absolute', top: 'calc(100vh - 100px)', left: '75px' }}>
                    <Button
                        variant="outlined"
                        onClick={() => setShowData(prev => !prev)}
                        sx={{
                            borderColor: 'var(--yellow)',
                            color: 'var(--yellow)',
                            '&:hover': {
                                borderColor: 'var(--yellow)',
                                backgroundColor: 'rgba(255, 235, 59, 0.1)'
                            }
                        }}
                    >
                        {showData ? 'Skrýt data' : 'Zobrazit data'}
                    </Button>
                </Box>
            </Box>

            {showData && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '100vh',
                        left: 0,
                        width: '100%',
                        borderTop: '2px solid red',
                        backgroundColor: 'var(--background)',
                        padding: 2,
                        boxSizing: 'border-box'
                    }}
                >
                    <pre style={{ color: 'var(--text_color)' }}>
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </Box>
            )}
        </>
    );
}
