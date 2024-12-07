/* Enums in TypeScript create reverse mappings (i.e., both string-to-number and number-to-string). */
export enum Category {
  FOOD,
  RENT,
  BILLS,
  SPORT,
  HOBBIES
}

export const categories = Object.keys(Category)
  .filter((key) => isNaN(Number(key))) // Filter out numeric keys (reverse mappings)
  .map((key, index) => ({
    id: index,
    name: key
  }))
