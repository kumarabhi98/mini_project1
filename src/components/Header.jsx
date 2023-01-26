import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom';
import useTaskStore from '../store/appStore';

const Header = () => {
  const {dark } = useTaskStore(
    (state) => ({
      dark: state.dark
    })
  );
  return (
    <div className={`header ${dark ? "header-dark":""}`}>
        <Link to="/" style={{ textDecoration: 'none', color: "aliceblue"}}> Task Board </Link>
        <Link to="/deleted" style={{ textDecoration: 'none', color: "aliceblue" }}>Deleted tasks </Link>
    </div>
  )
}

export default Header