import { useState } from "react";
import { LogIn } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "@/api/auth";
import { ApiError } from "@/api/client";

function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState("login");
  const [inputs, setInputs] = useState({ login: "", password: "" });
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  if (token) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async () => {
    try {
      const accessToken = await login(inputs.login, inputs.password);
      setToken(accessToken);
      navigate("/");
    } catch (e) {
      if (e instanceof ApiError) {
        setError(e.message);
      } else {
        setError("Ошибка сети");
      }
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-y-5">
      <h1 className="text-2xl text-gray-700 font-bold text-center">Добро пожаловать!</h1>
      <div className="p-8 flex flex-col gap-y-4 shadow-sm rounded-sm text-gray-700">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setMode("login")}
            className={`cursor-pointer p-2 shadow-sm text-base font-semibold
           hover:bg-amber-200 transition-all duration-500 rounded-sm ${mode === "login" ? "bg-amber-200" : ""}`}
          >
            Вход
          </button>
          <button
            onClick={() => setMode("registration")}
            className={`cursor-pointer p-2 shadow-sm text-base font-semibold
           hover:bg-amber-200 transition-all duration-500 rounded-sm ${mode === "registration" ? "bg-amber-200" : ""}`}
          >
            Регистрация
          </button>
        </div>
        <div className="flex flex-col gap-y-2 text-base font-semibold">
          <label htmlFor="username">Логин</label>
          <input
            value={inputs.login}
            onChange={(e) => setInputs({ ...inputs, login: e.target.value })}
            className="py-2 px-4 rounded-md border border-gray-200 shadow-sm focus:outline-none min-w-80"
            type="text"
            id="username"
            required
            autoComplete="username"
            placeholder="Введите логин"
          />
        </div>
        <div className="flex flex-col gap-y-2 text-base font-semibold">
          <label htmlFor="password">Пароль</label>
          <input
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            className="py-2 px-4 rounded-md border border-gray-200 shadow-sm focus:outline-none min-w-80"
            type="password"
            id="password"
            required
            autoComplete="current-password"
            placeholder="Введите пароль"
          />
        </div>
        <button
          onClick={handleSubmit}
          className={`cursor-pointer p-2 shadow-sm text-base font-semibold
           hover:bg-amber-200 transition-all duration-500 rounded-sm w-fit flex items-center gap-2 m-auto`}
        >
          Войти <LogIn size={18} />
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
