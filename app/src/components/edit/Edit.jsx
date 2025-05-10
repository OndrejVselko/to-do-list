import React, {useState} from 'react';
import RemoveTask from './RemoveTask.jsx';
import Switching from "./Switching.jsx";
import TaskForm from "./TaskForm.jsx";

export default function Edit({ data, setData }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [mode, setMode] = useState('create');
    const [selectedProject, setSelectedProject] = useState(null);

    const handleForm = (formData) => {
        console.log(selectedProject);
        if(mode==="create"){
            console.log('Přidávám: ', formData);
            const maxId = data.reduce((max, item) => (item.id > max ? item.id : max), 0);
            let projectId = null;
            if(selectedProject && formData.type === "subtask"){
                projectId = selectedProject.id;
            }
            setData(prevData => [
                ...prevData,
                {id: maxId + 1, ...formData, state: 0, selectedProject: projectId}  // Přidání nového objektu do pole s unikátním ID
            ]);
        }
        else if(mode==="edit"){
            console.log('Edituji: ', formData);
            console.log('formData.id:', selectedItem.id);
            setData(prev => prev.filter(item => item.id !== selectedItem.id));
            setData(prevData => [
                ...prevData,
                {id: selectedItem.id, ...formData}
            ]);
        }
    };

    // data + setData are passed from App
    return (
        <div style={{display: 'inline-flex', width: '100%'}}>
            <Switching  data={data}
                        onSelectItem={setSelectedItem}
                        onModeChange={setMode} />
            <TaskForm selectedItem={selectedItem} onSubmit={handleForm} data={data} setSelectedProject={setSelectedProject}/>
            <RemoveTask data={data} setData={setData} />

            <ShowData data={data}/>
        </div>
    );
}

function ShowData({ data }) {
    return (
        <div style={{ borderTop: "2px solid red", marginTop: "100vh", left: '0px', position: 'absolute'}}>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}




