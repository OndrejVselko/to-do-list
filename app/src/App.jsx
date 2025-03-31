import './App.css'
import Navbar from "./components/Navbar.jsx";
import ThemeButton from "./components/ThemeButton.jsx";
import AccountButton from "./components/AccountButton.jsx";
import NewTaskButton from "./components/NewTaskButton.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home.jsx";
import Edit from "./components/Edit.jsx";
import Stats from "./components/Stats.jsx";

function App() {
  return (
      <>
        < Navbar></Navbar>
        <ThemeButton></ThemeButton>
        <AccountButton></AccountButton>
        <NewTaskButton></NewTaskButton>
          <div className="container">
              <Routes>
                  <Route path="/" element={<Home/>}></Route>
                  <Route path="/edit" element={<Edit/>}></Route>
                  <Route path="/stats" element={<Stats/>}></Route>
              </Routes>
          </div>
      </>
  );
}
export default App
