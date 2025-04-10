import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getUniqueValues } from "../utils/functions";

export default function Categorydropdown({allItems, value, onSelect, label}){

    return (
        <FormControl>
                  <InputLabel>{label}</InputLabel>
                  <Select
                    value={value}
                    onChange={(e) => onSelect(e)}
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
    )
}