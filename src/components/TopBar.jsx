import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"
import MenuIcon from "@mui/icons-material/Menu";
import { useRef } from "react";

export default function TopBar({title ,showBack, onDrawerToggle}){
    const navigate = useNavigate();
    const menuButtonRef = useRef(null);

    const handleClick = () => {
      menuButtonRef.current.blur();
      onDrawerToggle();
    };

    return (

        <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleClick}
            ref={menuButtonRef}
            sx={{ display: { sm: "none" } }}
            >
            <MenuIcon sx={{ outline: "none", "&:focus": { outline: "none" } }} />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {showBack && <IconButton color="inherit" onClick={() => navigate(-1)} sx={{ mr: 1 }}>Go Back</IconButton>}
        </Toolbar>
      </AppBar>
    )
}