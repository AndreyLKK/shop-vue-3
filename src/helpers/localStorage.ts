export const saveToLocalStorage = (key: string, data: Product[]) => {
  return localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = (key: string): Product[] | [] => {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as Product[]) : [];
};

interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  iconOrder: string;
  iconFavorite: string;
}


