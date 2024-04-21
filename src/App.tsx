import { Routes, Route, Navigate } from "react-router-dom";
import {
  Login,
  HomePage,
  CatalogPage,
  AllBooks,
  Notifications,
  Requests,
  Reports,
  History,
  MainLayout,
} from "./routes/routes";
import { Toaster } from "react-hot-toast";
import { useLoadUserQuery } from "./redux/features/api/apiSlice";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Loader from "./components/Loader";

const App = () => {
  const { isLoading } = useLoadUserQuery({});
  const { user } = useSelector((state: RootState) => state.auth);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={user ? <MainLayout /> : <Navigate to="/" />}
        >
          <Route
            index
            element={
              user?.role === ("STUDENT" as string) ? <HomePage /> : <AllBooks />
            }
          />
          <Route path="all-books" element={<AllBooks />} />
          <Route path="requests" element={<Requests />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="history" element={<History />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
