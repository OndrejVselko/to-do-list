import TaskList from "./TaskList.jsx";
import TaskDetail from "./TaskDetail.jsx";
import ProjectList from "./ProjectList.jsx";
import { SelectionProvider } from '../global/SelectionContext.jsx';

export default function Home({ data, setData, setEdited }) {
    return (
        <SelectionProvider>
            <div id="home_body">
                <TaskList data={data} />

                <TaskDetail data={data} setData={setData} setEdited={setEdited}/>

                <ProjectList data={data} />
            </div>
        </SelectionProvider>
    );
}
