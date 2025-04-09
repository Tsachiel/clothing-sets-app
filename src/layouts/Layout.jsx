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

  const drawer = <SideBar onDrawertoggle={handleDrawerToggle}/>;

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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
        >{drawer}</Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
          open
        >{drawer}</Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <Toolbar /> 
        <Outlet />
      </Box>
    </Box>
  );
};