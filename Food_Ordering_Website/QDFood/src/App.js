import react,{lazy,Suspense, useState} from "react";
import reactDOM from "react-dom/client";
import Body from "./components/Body";
import Header from "./components/Header";
import Error from "./components/Error";

import { createBrowserRouter, RouterProvider,Outlet } from "react-router-dom";
import ShimmerUi from "./components/ShimmerUi";

                            //Chunking or Lazy loading
const Contact=lazy(()=>import("./components/Contact"));
const About =lazy(()=>import("./components/About"));
const RestaurantMenu=lazy(()=>import("./components/RestaurantMenu"));
import userContext from "./utils/userContext.js";
const AppComponent = () => {
  const [userName,setUserName]=useState("Aniruddh semalty")
  return (
    <userContext.Provider value={{loggedInUser:userName,setUserName}}>
    <div>
      <Header />
      <Outlet/>  {/*Outlet componenet is replaced by children routes*/}
    </div>
    </userContext.Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppComponent />,
    children: [
      {
        path:"/",
        element:<Body/>
      },
      {
        path: "/about",
        element:<Suspense fallback={<h1>Loading...</h1>}> <About /></Suspense>,
      },
      {
        path: "/contact",
        element:<Suspense fallback={<h1>Loading...</h1>}> <Contact /></Suspense>,
      },
      {
        path:"/restaurant/:resid",
        element:<Suspense fallback={<ShimmerUi />}><RestaurantMenu/></Suspense>
      }
    ],
    errorElement: <Error />,
  }
]);

const root = reactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
