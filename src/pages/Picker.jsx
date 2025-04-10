import { Box, Button, Card, CardContent, CardMedia, Snackbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectItem, saveCurrentSet, resetCurrentSet } from "../redux/slices/clothesSlice";
import { getRecommendedItems } from "../utils/functions";

import shirtImg from "../assets/images/shirt.png";
import pantsImg from "../assets/images/pants.png";
import shoesImg from "../assets/images/shoes.png";
import { useEffect, useState } from "react";
import NoResults from "../components/NoResults";
import Categorydropdown from "../components/Categorydropdown";

const typeToImage = {
  shirt: shirtImg,
  pants: pantsImg,
  shoes: shoesImg,
};

export default function Picker() {
    const { type } = useParams(); // "shirt", "pants", "shoes"
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const typeMap = {
    shirt: "shirts",
    pants: "pants",
    shoes: "shoes",
  };

  const allItems = useSelector((state) => state.clothes.data[typeMap[type]]);
  const currentSet = useSelector((state) => state.clothes.currentSet);

  const [filters, setFilters] = useState({ color: "", size: "" });
  const [timePassed, setTimePassed] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTimePassed((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => navigate("/"), 1500);
      return () => clearTimeout(timeout);
    }
  }, [showAlert]);

  const recommended = getRecommendedItems(currentSet, allItems, type).filter((item) => {
    if (filters.color && item.color !== filters.color) return false;
    if (filters.size && item.size !== filters.size) return false;
    return true;
  });

  const handleSelect = (item) => {
    dispatch(selectItem({ type, item }));

    const updatedSet = {
      ...currentSet,
      [type]: item,
    };

    const missingTypes = ["shirt", "pants", "shoes"].filter((t) => !updatedSet[t]);
    if (missingTypes.length > 0) {
      navigate(`/picker/${missingTypes[0]}`);
    } else {
      dispatch(saveCurrentSet({ duration: timePassed }));
      dispatch(resetCurrentSet());
      setShowAlert(true);
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Pick a {type}
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Categorydropdown label={"Color"} allItems={allItems} value={filters.color} onSelect={(e) => setFilters((f) => ({ ...f, color: e.target.value }))} />
        <Categorydropdown label={"Size"} allItems={allItems} value={filters.size} onSelect={(e) => setFilters((f) => ({ ...f, size: e.target.value }))} />
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {recommended.length > 0 ? (
          recommended.map((item) => (
            <Card key={item.id} sx={{ width: 200 }}>
              <CardMedia
                component="img"
                height="120"
                image={typeToImage[type]}
                alt={`${type} image`}
              />
              <CardContent>
                <Typography variant="subtitle1">{item.brand}</Typography>
                <Typography variant="body2">Color: {item.color}</Typography>
                <Typography variant="body2">Size: {item.size}</Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={() => handleSelect(item)}
                  fullWidth
                >
                  Select
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <NoResults />
        )}
      </Box>
      <Snackbar
        open={showAlert}
        message="Set saved successfully!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}
