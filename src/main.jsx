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
import Main from "./pages/home/home.jsx";
import Feedback from "./pages/feedback/feedback.jsx";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import User from "./pages/user/user.jsx";
//

function App(){
  let [isLogged, setIsLogged] = useState(false);
  let [userData, setUserData] = useState({})

  async function isAuth(){
    const response = await auth.get('/isUserAuth', {headers : {'x-access-token': `Bearer ${localStorage.getItem('token')}`}})

    // if(response.data){
    //   setIsLogged(true);
    //   setUserData(response.data)
    // }

    console.log("teste")
    setIsLogged(true);
    
  }

  useEffect(() => {
    isAuth();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isLogged ?  <Main setIsLogged={setIsLogged} /> : <Navigate to="/login" />
    },
    {
      path: "/login",
      element: !isLogged ? <Login setIsLogged={setIsLogged} /> : <Navigate to="/" />
    },
    {
      path: "/feedback",
      element: isLogged ?  <Main isLogged={isLogged} /> : <Navigate to="/login" />
    },
    {
      path: "/register",
      element: !isLogged ? <Register /> : <Navigate to="/" />
    },
    {
      path: "/user",
      element: isLogged ?  <User userData={userData} setIsLogged={setIsLogged} /> : <Navigate to="/login" />
    }
  ]);

  return <RouterProvider router={router} />
}

createRoot(document.getElementById("root")).render(
  <App />
);
