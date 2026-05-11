import { useState } from "react";
import { LogIn } from "lucide-react";

function LoginPage() {
  const [mode, setMode] = useState("login");
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
            className="py-2 px-4 rounded-md border border-gray-200 shadow-sm focus:outline-none min-w-80"
            type="password"
            id="password"
            required
            autoComplete="current-password"
            placeholder="Введите пароль"
          />
        </div>
        <button
          className={`cursor-pointer p-2 shadow-sm text-base font-semibold
           hover:bg-amber-200 transition-all duration-500 rounded-sm w-fit flex items-center gap-2 m-auto`}
        >
          Войти <LogIn size={18} />
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
