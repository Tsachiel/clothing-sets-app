import { Box, Typography } from "@mui/material";
import noResultsImg from "../assets/images/no-results.png";

export default function NoResults(){
    return (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <img src={noResultsImg} alt="No results" width={200} />
          <Typography>No matching items found.</Typography>
        </Box>
    )
}