import { Box, Button, Card, CardContent, CardMedia, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectItem } from "../redux/slices/clothesSlice";
import { getRecommendedItems } from "../utils/functions";

import shirtImg from "../assets/images/shirt.png";
import pantsImg from "../assets/images/pants.png";
import shoesImg from "../assets/images/shoes.png";
import { useState } from "react";
import NoResults from "../components/NoResults";
  
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
          alert("Set completed! Saving...");
          navigate("/");
        }
      };
      
  
    const getUniqueValues = (items, key) => [...new Set(items.map((item) => item[key]))];
  
    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Pick a {type}
        </Typography>
  
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <FormControl>
            <InputLabel>Color</InputLabel>
            <Select
              value={filters.color}
              onChange={(e) => setFilters((f) => ({ ...f, color: e.target.value }))}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="">All</MenuItem>
              {getUniqueValues(allItems, "color").map((color) => (
                <MenuItem key={color} value={color}>
                  {color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  
          <FormControl>
            <InputLabel>Size</InputLabel>
            <Select
              value={filters.size}
              onChange={(e) => setFilters((f) => ({ ...f, size: e.target.value }))}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="">All</MenuItem>
              {getUniqueValues(allItems, "size").map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
      </Box>
    );
  }
  