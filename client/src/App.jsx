import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRouter from "./components/HOCs/ProtectedRouter";
import Layout from "./components/Layout";
import MainPage from "./components/pages/MainPage";
import SignUpPage from "./components/pages/SignUpPage";
import SignInPage from "./components/pages/SignInPage";
import { useEffect, useState } from "react";
import axiosInstance from "./api/axiosInstance";
import useUser from "./hooks/useUser";
import CategoryItemsPage from "./components/pages/CategoryItemsPage";
import AddItemPage from "./components/pages/AddItemPage";

function App() {
  const { user, logoutHandler, signInHandler, signUpHandler } =
    useUser();
  const [items, setItems] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axiosInstance("/categories").then(({ data }) => setCategories(data));
  }, []);

  useEffect(() => {
    axiosInstance("/items").then((items) => setItems(items.data));
  }, []);

  const editHandler = async (e) => {
    e.preventDefault();
    try {
      const formdata = Object.fromEntries(new FormData(e.target));
      const response = await axiosInstance.patch(
        `/items/${modalContent?.id}`,
        formdata
      );

      if (response.status === 200) {
        const newData = await axiosInstance(`/items/${modalContent?.id}`);

        setItems((prev) =>
          prev.map((el) => (el.id === modalContent?.id ? newData.data : el))
        );
        e.target.reset();
        setModalContent(null);
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  const deleteHandler = (id) => {
    try {
      axiosInstance.delete(`/items/${id}`);
      setItems((prev) => prev.filter((el) => el.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout user={user} logoutHandler={logoutHandler} />,
      children: [
        {
          path: "/",
          element: (
            <MainPage
              user={user}
              items={items}
              setItems={setItems}
              setModalContent={setModalContent}
              editHandler={editHandler}
              modalContent={modalContent}
              deleteHandler={deleteHandler}
            />
          ),
        },
        {
          path: "/category/:id",
          element: <CategoryItemsPage user={user} />,
        },
        {
          path: "/user",
          element: (
            <ProtectedRouter
              isAllowed={user.status === "logged"}
              redirectTo={"/"}
            >
              ,
              <AddItemPage setItems={setItems} categories={categories} />
            </ProtectedRouter>
          ),
        },
        {
          element: (
            <ProtectedRouter
              isAllowed={user.status !== "logged"}
              redirectTo={"/"}
            />
          ),
          children: [
            {
              path: "/auth/signup",
              element: <SignUpPage signUpHandler={signUpHandler} />,
            },
            {
              path: "/auth/signin",
              element: <SignInPage signInHandler={signInHandler} />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
