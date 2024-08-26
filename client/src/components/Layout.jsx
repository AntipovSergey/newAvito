import { Outlet } from "react-router-dom";
import NavBar from "./ui/NavBar";
import Loader from "./HOCs/Loader";

export default function Layout({ user, logoutHandler }) {
  return (
    <>
      <Loader isLoading={user.status === "fetching"}>
        <NavBar user={user} logoutHandler={logoutHandler} />
        <Outlet />
      </Loader>
    </>
  );
}