import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import Profile from "./pages/Profile/Profile";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

const App = () => {
  const [authUser] = useAuthState(auth);

  return (
    <PageLayout>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!authUser ? <Auth /> : <Navigate to="/" />}
        />
        <Route
          path="/:username"
          // element={authUser ? <Profile /> : <Navigate to="/auth" />}
          element={<Profile />}
        />
      </Routes>
    </PageLayout>
  );
};

export default App;
