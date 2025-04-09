import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"
import MenuIcon from "@mui/icons-material/Menu";

export default function TopBar({title ,showBack, onDrawerToggle}){
    const navigate = useNavigate();
    return (

        <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
            >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {showBack && <IconButton color="inherit" onClick={() => navigate(-1)} sx={{ mr: 1 }}>Go Back</IconButton>}
        </Toolbar>
      </AppBar>
    )
}