import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {Box,CssBaseline,Drawer, Toolbar} from "@mui/material";
import { DRAWER_WIDTH } from "../utils/consts";
import { getTitle } from "../utils/functions";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(prev => !prev);
  };
  const title = getTitle(location.pathname);
  const showBack = location.pathname !== "/";

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBar 
      title ={title} 
      showBack ={showBack} 
      onDrawerToggle={handleDrawerToggle}
      />
      <Box component="nav">
      <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block"},
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
      ><SideBar onDrawertoggle={handleDrawerToggle}/></Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "100%",
        }}
      >
        <Toolbar /> 
        <Outlet />
      </Box>
    </Box>
  );
};