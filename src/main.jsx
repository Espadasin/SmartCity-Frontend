//React Config
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
//

//Auth
import auth from "./services/auth.js";
//

//Import Pages
import Map from "./pages/map/map.jsx";
import Home from "./pages/home/home.jsx";
import Admin from "./pages/admin/admin.jsx";
import Login from "./pages/login/login.jsx";
import Info from "./pages/info/info.jsx";
//

function App(){
  let [isLogged, setIsLogged] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/map",
      element: <Map />
    },
    {
      path: "/info",
      element: <Info />
    },
    {
      path: "/loginAdmin",
      element: <Login setIsLogged={setIsLogged}/> 
    },
    {
      path: "/admin",
      element: isLogged ? <Admin /> : <Navigate to="/loginAdmin" />
    },
  ]);

  return <RouterProvider router={router} />
}

createRoot(document.getElementById("root")).render(
  <App />
);
