export const DRAWER_WIDTH = 240;
export const CLOTHES_API = "https://f32cf30e-6939-45f6-b650-40d5b43dc7f1.mock.pstmn.io/clothes";
export const S = "S";
export const M = "M";
export const L = "L";
export const XL = "XL";
export const XXL = "XXL";
export const BLACK = "black";
export const WHITE = "white";
export const RED = "red";
export const BLUE = "blue";
export const PINK = "pink";
export const GREEN = "green";
export const GRAY = "gray";

//matching sizes according to the ones that were picked
export const sizeRules = {
    shoes: {
      toShirt: (size) => {
        if (size >= 45) return [XL, XXL];
        if (size >= 42) return [L, XL];
        return [S, M];
      },
      toPants: (size) => {
        if (size >= 45) return [44, 46, 48];
        if (size >= 42) return [42, 44];
        return [30, 32, 34];
      },
    },
    pants: {
      toShirt: (size) => {
        if (size >= 44) return [XL, XXL];
        if (size >= 40) return [M, L];
        return [S, M];
      },
      toShoes: (size) => {
        if (size >= 44) return [45, 46];
        if (size >= 40) return [42, 43];
        return [37, 39];
      },
    },
    shirt: {
      toPants: (size) => {
        if ([XL, XXL].includes(size)) return [42, 44, 46];
        if ([L, M].includes(size)) return [38, 40, 42];
        return [30, 32, 34];
      },
      toShoes: (size) => {
        if ([XL, XXL].includes(size)) return [44, 46];
        if ([L, M].includes(size)) return [40, 42];
        return [37, 39];
      },
    },
  };
  
  //matching colors to each color that is picked
export const colorMap = {
    black: [WHITE, GRAY, RED],
    white: [BLACK, BLUE, PINK],
    red: [WHITE, BLACK],
    blue: [WHITE, GRAY],
    pink: [GRAY, WHITE],
    green: [WHITE, BLACK],
    gray: [BLUE, BLACK],
};