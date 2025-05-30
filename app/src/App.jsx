import './App.css';
import Navbar from "./components/global/Navbar.jsx";
import ThemeButton from "./components/global/ThemeButton.jsx";
import AccountButton from "./components/global/AccountButton.jsx";
import NewTaskButton from "./components/global/NewTaskButton.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import Edit from "./components/edit/Edit.jsx";
import Stats from "./components/stats/Stats.jsx";
import { useEffect, useState } from "react";
import '@fontsource/roboto/400.css';
import InfoButton from "./components/global/InfoButton.jsx";

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        document.body.setAttribute("theme", "dark");

        fetch('/data.json')
            .then(res => res.json())
            .then(fetched => setData(fetched))
            .catch(err => console.error('Error fetching data:', err));
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <ThemeButton />
            <AccountButton />
            <InfoButton/>
            <NewTaskButton data={data} setData={setData}/>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home data={data} setData={setData} />} />
                    <Route path="/edit" element={<Edit data={data} setData={setData} />} />
                    <Route path="/stats" element={<Stats data={data} />} />
                </Routes>
            </div>
        </>
    );
}

export default App;