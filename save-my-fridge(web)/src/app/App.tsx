import { RouterProvider } from "react-router";
import { router } from "./routes";
import { IngredientProvider } from "./context/IngredientContext";
import { UserProvider } from "./context/UserContext";

export default function App() {
  return (
    <UserProvider>
      <IngredientProvider>
        <RouterProvider router={router} />
      </IngredientProvider>
    </UserProvider>
  );
}
