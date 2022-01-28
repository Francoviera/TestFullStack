import logo from './logo.svg';
import './App.css';
import Home from "./views/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Birthdays from './views/Bithdays';
import Header from "./components/Header";


function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/cumpleanios" element={<Birthdays/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
