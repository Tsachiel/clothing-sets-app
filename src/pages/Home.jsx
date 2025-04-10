import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

export default function Home() {
  const navigate = useNavigate();

  const { data, loading, error } = useSelector((state) => state.clothes);

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
