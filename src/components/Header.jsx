import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom';
import useTaskStore from '../store/appStore';
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ITEM_HEIGHT = 48;

const Header = () => {
  const { dark } = useTaskStore(
    (state) => ({
      dark: state.dark
    })
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [value, setValue] = React.useState('Task Board');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setValue(event.target.innerText);
    setAnchorEl(null);
  };
  const handleCloseMenu = (event) => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className={`header ${dark ? "header-dark" : ""}`}>
        <Link to="/" style={{ textDecoration: 'none', color: "aliceblue" }} onClick={handleClose}> Task Board </Link>
        <Link to="/deleted" style={{ textDecoration: 'none', color: "aliceblue" }} onClick={handleClose}>Deleted tasks </Link>
      </div>

      <div
        className={`header ${dark ? "header-dark" : ""}`}
        id='header-mobile'
      >
        <div>{value}</div>
        <div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            style = {{
              color:"white"
            }}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button"
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
                backgroundColor: dark?"#053040":"white",
              }
            }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: dark?"white":"black",width: "100%", height: "100%" }}>
              <MenuItem
                onClick={handleClose}
              >
                Task Board
              </MenuItem>
            </Link>
            <Link to="/deleted" style={{ textDecoration: 'none', color: dark?"white":"black",width: "100%", height: "100%" }}>
              <MenuItem
                onClick={handleClose}
              >
                Deleted tasks
              </MenuItem>
            </Link>
          </Menu>
        </div>
      </div>
    </>
  )
}

export default Header