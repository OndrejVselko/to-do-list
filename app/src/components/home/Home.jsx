import TaskList from "./TaskList.jsx";
import TaskDetail from "./TaskDetail.jsx";
import ProjectList from "./ProjectList.jsx";
import { SelectionProvider } from '../global/SelectionContext.jsx';

// Home now accepts `data` prop from App and passes it to TaskList and ProjectList
export default function Home({ data }) {
    return (
        <SelectionProvider>
            <div id="home_body">
                {/* Read-only data passed to TaskList */}
                <TaskList data={data} />

                {/* TaskDetail can remain unaltered or accept data if needed */}
                <TaskDetail />

                {/* Read-only data passed to ProjectList */}
                <ProjectList data={data} />
            </div>
        </SelectionProvider>
    );
}
