import { createStore, StoreOptions } from "vuex";
import toggleCart from "./modules/toggleCart";
import cartProducts from "./modules/cartProducts";
import bookmarksProducts from "./modules/bookmarksProducts";
import products from "./modules/products";

interface ToggleCartState {
  toggleCart: boolean;
}

interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  iconOrder: string;
  iconFavorite: string;
}

interface CartProductsState {
  cartProducts: Product[];
  orderIsProcessed: boolean;
}

interface BookmarksProductsState {
  bookmarksProducts: Product[];
}

interface ProductsState {
  products: Product[];
  originalProducts: OriginalProducts[];
}

interface OriginalProducts {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  iconOrder: string;
  iconFavorite: string;
}

export interface RootState {
  toggleCart: ToggleCartState;
  cartProducts: CartProductsState;
  bookmarksProducts: BookmarksProductsState;
  products: ProductsState;
}

const storeOptions: StoreOptions<RootState> = {
  modules: {
    toggleCart,
    cartProducts,
    bookmarksProducts,
    products,
  },
};

export default createStore(storeOptions);
