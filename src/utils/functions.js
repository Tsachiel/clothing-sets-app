import { colorMap, sizeRules } from "./consts";

export const getTitle = (path) => {
    if (path.includes("/picker")) return "Pick Clothing Item";
    if (path === "/saved") return "Saved Sets";
    return "Home";
  };

  export const getRecommendedItems = (currentSet, allItems, targetType) => {
    const sourceType = Object.keys(currentSet).find((key) => currentSet[key]);
    if (!sourceType) return allItems;
  
    const sourceItem = currentSet[sourceType];
    const sizeFn = sizeRules[sourceType]?.[`to${capitalize(targetType)}`];
    const matchingSizes = sizeFn ? sizeFn(sourceItem.size) : null;
  
    const matchingColors = colorMap[sourceItem.color] || [];
  
    return allItems.filter(
      (item) =>
        item.type === targetType &&
        (!matchingSizes || matchingSizes.includes(item.size)) &&
        matchingColors.includes(item.color)
    );
  };
  
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);