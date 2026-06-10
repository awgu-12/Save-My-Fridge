import { createContext, useContext, useState, ReactNode } from "react";

export type Ingredient = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  expiryDate: string; // YYYY-MM-DD
  storage: "냉장" | "냉동";
  memo: string;
};

type IngredientContextType = {
  ingredients: Ingredient[];
  addIngredient: (ingredient: Omit<Ingredient, "id">) => void;
  updateIngredient: (id: string, updates: Partial<Ingredient>) => void;
  deleteIngredient: (id: string) => void;
};

const IngredientContext = createContext<IngredientContextType | undefined>(undefined);

// System Date is 2026-04-29
const initialData: Ingredient[] = [
  { id: "1", name: "우유 1L", category: "유제품", quantity: 1, expiryDate: "2026-05-02", storage: "냉장", memo: "" },
  { id: "2", name: "다짐육", category: "육류", quantity: 2, expiryDate: "2026-04-30", storage: "냉동", memo: "볶음밥용" },
  { id: "3", name: "양상추", category: "채소", quantity: 1, expiryDate: "2026-04-28", storage: "냉장", memo: "샐러드용" },
  { id: "4", name: "계란 30구", category: "기타", quantity: 1, expiryDate: "2026-05-15", storage: "냉장", memo: "" },
];

export function IngredientProvider({ children }: { children: ReactNode }) {
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialData);

  const addIngredient = (ingredient: Omit<Ingredient, "id">) => {
    const newIngredient = { ...ingredient, id: Date.now().toString() };
    setIngredients((prev) => [newIngredient, ...prev]);
  };

  const updateIngredient = (id: string, updates: Partial<Ingredient>) => {
    setIngredients((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteIngredient = (id: string) => {
    setIngredients((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <IngredientContext.Provider
      value={{ ingredients, addIngredient, updateIngredient, deleteIngredient }}
    >
      {children}
    </IngredientContext.Provider>
  );
}

export function useIngredients() {
  const context = useContext(IngredientContext);
  if (!context) {
    throw new Error("useIngredients must be used within an IngredientProvider");
  }
  return context;
}
