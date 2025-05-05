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

function App() {
    // Lifting state up: data + setter
    const [data, setData] = useState(null);

    useEffect(() => {
        // Apply theme
        document.body.setAttribute("theme", "dark");

        // Fetch once on mount
        fetch('/data.json')
            .then(res => res.json())
            .then(fetched => setData(fetched))
            .catch(err => console.error('Error fetching data:', err));
    }, []);

    // Show loading until data is ready
    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <ThemeButton />
            <AccountButton />
            <NewTaskButton />
            <div className="container">
                <Routes>
                    {/* Pass data + setter to routes */}
                    <Route path="/" element={<Home data={data} setData={setData} />} />
                    <Route path="/edit" element={<Edit data={data} setData={setData} />} />
                    <Route path="/stats" element={<Stats data={data} />} />
                </Routes>
            </div>
        </>
    );
}

export default App;