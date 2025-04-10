import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Typography, Paper } from "@mui/material";

export default function Home() {
  const navigate = useNavigate();
  const { data, loading, error, savedSets } = useSelector((state) => state.clothes);

  const count = {
    shoes: data.shoes.length,
    pants: data.pants.length,
    shirts: data.shirts.length,
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Welcome to Clothing Sets</Typography>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <>
          <Typography>Shirts: {count.shirts}</Typography>
          <Typography>Pants: {count.pants}</Typography>
          <Typography>Shoes: {count.shoes}</Typography>

          <Box
            component={Paper}
            elevation={3}
            sx={{
              mt: 4,
              mb: 2,
              py: 2,
              px: 3,
              display: "inline-block",
              textAlign: "center",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              You have {savedSets.length} saved {savedSets.length === 1 ? "set" : "sets"}
            </Typography>
            <Button variant="outlined" onClick={() => navigate("/saved")}>
              Go to Saved Sets
            </Button>
          </Box>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/picker/shirt")}
            >
              Pick Shirt
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/picker/pants")}
            >
              Pick Pants
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/picker/shoes")}
            >
              Pick Shoes
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
