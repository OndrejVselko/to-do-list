 import TaskList from "./TaskList.jsx";
 import TaskDetail from "./TaskDetail.jsx";
 import ProjectList from "./ProjectList.jsx";
 import { SelectionProvider } from '../global/SelectionContext.jsx';
export default function Home(){
    return(
        <SelectionProvider>
            <div id="home_body">
                <TaskList></TaskList>
                <TaskDetail></TaskDetail>
                <ProjectList></ProjectList>
            </div>
        </SelectionProvider>
    );
}