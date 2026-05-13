import Pagination from "./Pagination";
import TaskBoard from "./TaskBoard";
import type { Task } from "../types/task";

function TaskPage() {
  const tasks: Task[] = [
    {
      id: 1,
      date_begin: "2026-04-06",
      date_fact_end: null,
      date_plan_end: "2026-04-15",
      category_id: 1,
      author: "Иванов А. Р.",
      name: "Проектирование интерфейса каталога ИАС ЦИМ",
      description: "Разработать макеты экранов каталога",
      link: "https://figma.com/file/xA9kLmN3qwerty/design-system",
      channel: "Личное обращение",
      status: "В работе",
      id_parent_task: null,
      category: { id: 1, name: "Проектирование" },
      users: [
        { id: 1, fio: "Ожигин А. Н.", deportament: "ИТ", contract_number: "ДГ-001" },
        { id: 2, fio: "Кравченко Д. А.", deportament: "ИТ", contract_number: "ДГ-002" },
      ],
    },
    {
      id: 2,
      date_begin: "2026-04-08",
      date_fact_end: "2026-04-18",
      date_plan_end: "2026-04-20",
      category_id: 2,
      author: "Петрова С. В.",
      name: "Наполнение UI kit ИАС ЦИМ",
      description: "Создать компоненты дизайн-системы",
      link: "https://notion.so/team/ui-kit-iass",
      channel: "Почта",
      status: "Завершено",
      id_parent_task: null,
      category: { id: 2, name: "UI/UX" },
      users: [{ id: 3, fio: "Иванов А. Р.", deportament: "Дизайн", contract_number: "ДГ-003" }],
    },
    {
      id: 3,
      date_begin: "2026-04-10",
      date_fact_end: null,
      date_plan_end: "2026-05-01",
      category_id: 3,
      author: "Сидоров М. П.",
      name: "Учёт правок и реализация на страницах макетов",
      description: "Внести правки от рабочей группы",
      link: null,
      channel: "Telegram",
      status: "В работе",
      id_parent_task: 1,
      category: { id: 3, name: "Аналитика" },
      users: [
        { id: 4, fio: "Морозова А. С.", deportament: "Аналитика", contract_number: "ДГ-004" },
        { id: 5, fio: "Петров В. И.", deportament: "Разработка", contract_number: "ДГ-005" },
      ],
    },
    {
      id: 4,
      date_begin: "2026-04-12",
      date_fact_end: null,
      date_plan_end: "2026-04-25",
      category_id: 1,
      author: "ПЦК",
      name: "Подготовка материалов в ВКС с рабочей группой",
      description: "Презентация и материалы для встречи",
      link: "https://drive.google.com/folder/abc123",
      channel: "Личное обращение",
      status: "Заблокировано",
      id_parent_task: null,
      category: { id: 1, name: "Проектирование" },
      users: [{ id: 1, fio: "Ожигин А. Н.", deportament: "ИТ", contract_number: "ДГ-001" }],
    },
    {
      id: 5,
      date_begin: "2026-04-15",
      date_fact_end: null,
      date_plan_end: "2026-04-30",
      category_id: 4,
      author: "Кравченко Д. А.",
      name: "Проектирование промежуточной страницы реестров",
      description: "Дизайн перехода между разделами",
      link: "https://figma.com/file/registers-flow",
      channel: "Email",
      status: "На проверке",
      id_parent_task: null,
      category: { id: 4, name: "Тестирование" },
      users: [
        { id: 2, fio: "Кравченко Д. А.", deportament: "ИТ", contract_number: "ДГ-002" },
        { id: 3, fio: "Иванов А. Р.", deportament: "Дизайн", contract_number: "ДГ-003" },
        { id: 4, fio: "Морозова А. С.", deportament: "Аналитика", contract_number: "ДГ-004" },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <div className="h-30 mx-8 my-4 bg-gray-200 shrink-0"></div>
      <TaskBoard tasks={tasks}></TaskBoard>
      <Pagination />
    </div>
  );
}

export default TaskPage;
