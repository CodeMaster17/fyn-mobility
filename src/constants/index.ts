export interface Item {
  id: number;
  text: string;
}

export const initialItems: Item[] = [
  { id: 1, text: "Item 1" },
  { id: 2, text: "Item 2" },
  { id: 3, text: "Item 3" },
  { id: 4, text: "Item 4" },
];

export const IMAGE_API =
  "https://jsonplaceholder.typicode.com/photos?_limit=9&_page=";
