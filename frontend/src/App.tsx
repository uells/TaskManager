import TaskCard from "./components/TaskCard";
import TaskBoard from "./components/TaskBoard";
import type { Task } from "./types/task";
import type { Tasks } from "./types/tasks";

function App() {
  const task1: Task = {
    id: 1,
    date_begin: "2026-04-06",
    date_fact_end: null,
    date_plan_end: "2026-04-10",
    category_id: 1,
    author: "Иванов А. Р.",
    name: "Проектирование интерфейса для заполнения технологий получения",
    description: "Разработать макеты экранов для модуля технологий",
    link: "https://figma.com/file/xA9kLmN3qwerty/design-system",
    channel: "Личное обращение",
    status: "Завершено",
    id_parent_task: null,
    category: { id: 1, name: "Проектирование" },
    users: [
      { id: 1, fio: "Ожигин А. Н.", deportament: "ИТ", contract_number: "ДГ-001" },
      { id: 2, fio: "Кравченко Д. А.", deportament: "ИТ", contract_number: "ДГ-002" },
      { id: 3, fio: "Иванов А. Р.", deportament: "Дизайн", contract_number: "ДГ-003" },
      { id: 4, fio: "Морозова А. С.", deportament: "Аналитика", contract_number: "ДГ-004" },
      { id: 5, fio: "Петров В. И.", deportament: "Разработка", contract_number: "ДГ-005" },
    ],
  };

  const tasks: Task[] = [task1, task1, task1];

  return <TaskBoard tasks={tasks}></TaskBoard>;
}

export default App;
