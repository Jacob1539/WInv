import '../App.css';
import {NavLink} from 'react-router-dom';

export default function Navbar() {
  return (
    <ul className="unavbar">
      <li className="navbar"><NavLink to="/">Home</NavLink></li>
      <li className="navbar"><NavLink to="/quick-add">Quick Add</NavLink></li>
    </ul>
  )
}