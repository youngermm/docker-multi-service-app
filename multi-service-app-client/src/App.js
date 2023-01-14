import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FibCalc from './fib-calc';
import aboutPage from './about-page';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Link to="/">Calculator</Link>
          <Link to="/about">About</Link>
        </header>

        <div>
          <Routes>
            <Route exact path="/" element={<FibCalc></FibCalc>}/>
            <Route exact path="/about" element={aboutPage()}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
