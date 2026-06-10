import { createBrowserRouter } from "react-router";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";
import { SignUp } from "./pages/SignUp";
import { Register } from "./pages/Register";
import { Detail } from "./pages/Detail";
import { HomePage } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { AccountSettings } from "./pages/AccountSettings";
import { Privacy } from "./pages/Privacy";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/home",
    Component: HomePage,
  },
  {
    path: "/main",
    Component: Main,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/account-settings",
    Component: AccountSettings,
  },
  {
    path: "/privacy",
    Component: Privacy,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/ingredient/:id",
    Component: Detail,
  },
]);
