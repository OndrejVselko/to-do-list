import TasksTable from "./TaskTable.jsx";

export default function Stats({data}){
    return(
        <>
            <h1>Stats</h1>
            <TasksTable data={data}/>
        </>
    );
}