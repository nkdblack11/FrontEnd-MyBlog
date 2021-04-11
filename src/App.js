import './App.css';
import React from 'react'
import Page from './pages';
import AppBar from './components/AppBar';
import {BrowserRouter as Router,} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <AppBar/>
                <Page/>
            </Router>
        </div>

    );
}

export default App;
