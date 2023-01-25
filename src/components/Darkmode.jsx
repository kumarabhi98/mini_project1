import React from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import useTaskStore from '../store/appStore';
import '../App.css'

const Darkmode = () => {
    let { dark, toggleDark } = useTaskStore((state) => ({
        dark: state.dark,
        toggleDark: state.toggleDark
    }));
    const toggle = ()=> toggleDark();
    
    return (
        <div className={dark?"lightmode":"darkmode"} onClick={toggle}>
            {
                dark ? <LightModeIcon />: <DarkModeIcon />
            }
        </div>
    )
}

export default Darkmode