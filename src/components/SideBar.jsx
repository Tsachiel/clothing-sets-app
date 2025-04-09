import { Box, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function SideBar({onDrawertoggle}){
    return (
    <Box onClick={onDrawertoggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Clothing Sets
      </Typography>
      <Divider />
      <List>
        <ListItem button="true" component={NavLink} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button="true" component={NavLink} to="/picker/shirt">
          <ListItemText primary="Pick Item" />
        </ListItem>
        <ListItem button="true" component={NavLink} to="/saved">
          <ListItemText primary="Saved Sets" />
        </ListItem>
      </List>
    </Box>
    )
}