import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/home/Home";
import Services from "./pages/services/Services";
import Service from "./pages/service/Service";
import Orders from "./pages/orders/Orders";
import MyServices from "./pages/myServices/MyServices";
import AddService from "./pages/addServices/AddService";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import "./app.scss";

function App() {
  const queryClient = new QueryClient();
  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "/service/:id",
          element: <Service />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/myservices",
          element: <MyServices />,
        },
        {
          path: "/addservice",
          element: <AddService />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/success",
          element: <Success />,
        },
        {
          path: "/pay/:id",
          element: <Pay />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
