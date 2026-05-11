import TaskPage from "./components/TaskPage";
import LoginPage from "./components/LoginPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/" element={<TaskPage />}></Route>
    </Routes>
  );
}

export default App;
