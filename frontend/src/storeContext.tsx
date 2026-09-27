import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products as defaultProducts, type Product } from "./products";
import { store as defaultStore } from "./storeConfig";

export type StoreConfig = typeof defaultStore;

type StoreContextValue = {
  products: Product[];
  store: StoreConfig;
  setProducts: (products: Product[]) => void;
  setStore: (store: StoreConfig) => void;
  resetStore: () => void;
};

const STORAGE_KEY = "4n-dev-ecommerce-template-v1";

const StoreContext = createContext<StoreContextValue | null>(null);

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { products: defaultProducts, store: defaultStore };
    const parsed = JSON.parse(raw);
    return {
      products: Array.isArray(parsed.products) ? parsed.products : defaultProducts,
      store: { ...defaultStore, ...(parsed.store || {}) },
    };
  } catch {
    return { products: defaultProducts, store: defaultStore };
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const initial = useMemo(loadData, []);
  const [products, setProducts] = useState<Product[]>(initial.products);
  const [store, setStore] = useState<StoreConfig>(initial.store);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ products, store }));
    } catch {
      // The storefront remains usable if browser storage is unavailable.
    }
  }, [products, store]);

  const value = useMemo(() => ({
    products,
    store,
    setProducts,
    setStore,
    resetStore: () => {
      setProducts(defaultProducts);
      setStore(defaultStore);
    },
  }), [products, store]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
