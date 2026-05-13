import TaskPage from "./components/TaskPage";
import LoginPage from "./components/LoginPage";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <TaskPage />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

export default App;
