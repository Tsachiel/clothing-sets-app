import { useSelector, useDispatch } from "react-redux";
import { Box, Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { deleteSet } from "../redux/slices/clothesSlice";

export default function SavedSets() {
  const savedSets = useSelector((state) => state.clothes.savedSets);
  const dispatch = useDispatch();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Saved Sets
      </Typography>

      {savedSets.length === 0 ? (
        <Typography>No sets saved yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {savedSets.map((set) => (
            <Grid key={set.id}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1">
                    Set created on: {new Date(set.savedAt).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Duration: {set.duration || "?"} seconds
                  </Typography>
                  {["shirt", "pants", "shoes"].map((type) => (
                    <Typography key={type} variant="body2">
                      {type}: {set[type]?.brand} / {set[type]?.size} / {set[type]?.color}
                    </Typography>
                  ))}
                  <Button
                    color="error"
                    onClick={() => dispatch(deleteSet(set.id))}
                    sx={{ mt: 1 }}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
