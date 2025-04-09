export const getTitle = (path) => {
    if (path.includes("/picker")) return "Pick Clothing Item";
    if (path === "/saved") return "Saved Sets";
    return "Home";
  };