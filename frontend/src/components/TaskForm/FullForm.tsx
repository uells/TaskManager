import { PanelRightClose } from "lucide-react";
import { TASK_CHANNELS, type TaskChannel, type TaskCreate } from "../../types/task";
import { useState } from "react";
import SectionCard from "../ui/SectionCard";
import FormField from "./FormField";
import StatusSelector from "./StatusSelector";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import CategoryCombobox from "./CategoryCombobox";
import { parseISO } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import DateSinglePicker from "./DateSinglePicker";
import AuthorCombobox from "./AuthorCombobox";
import UsersCombobox from "./UsersCombobox";
import { Input } from "../ui/input";
import DateRangePicker from "./DateRangePicker";
import DateTrigger from "./DateTrigger";
import { formatDayMonth } from "@/utils/date";
import { useApi } from "@/hooks/useApi";
import { createTask } from "@/api/tasks";
import { ApiError } from "@/api/client";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

type Rule = {
  field: keyof TaskCreate;
  message: string;
};

const VALIDATION_RULES: Rule[] = [
  { field: "description", message: "Незаполнено описание" },
  { field: "author", message: "Незаполнен автор" },
  { field: "date_begin", message: "Незаполнена дата начала" },
  { field: "date_plan_end", message: "Незаполнена плановая дата" },
  { field: "status", message: "Незаполнен статус" },
  { field: "channel", message: "Незаполнен канал запроса" },
  { field: "category_id", message: "Не выбрана категория" },
];

const EMPTY_FORM: TaskCreate = {
  name: "",
  description: "",
  author: "",
  date_begin: "",
  date_plan_end: null,
  date_fact_end: null,
  status: "Не начато",
  channel: "Мессенджер",
  category_id: 0,
  user_ids: [],
  link: "",
  id_parent_task: null,
};

function FullForm({ onClose, onSuccess }: Props) {
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState<TaskCreate>(EMPTY_FORM);
  const { authRequest } = useApi();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    try {
      const invalid = VALIDATION_RULES.find((rule) => !formData[rule.field]);
      if (invalid) {
        setError(invalid.message);
        return;
      }
      if (formData.user_ids.length === 0) {
        setError("Не выбраны исполнители");
        return;
      }

      await createTask(formData, authRequest);
      setFormData(EMPTY_FORM);
      setChecked(false);
      onSuccess();
    } catch (e) {
      if (e instanceof ApiError) {
        setError(e.message);
      } else {
        setError("Не удалось добавить задачу");
      }
    }
  };

  return (
    <aside className="h-screen shadow-md flex flex-col border-l border-gray-100 w-100">
      <header className="flex justify-between items-center gap-x-4 py-2 px-4 border-b border-gray-100">
        <h2 className="text-gray-500 text-sm uppercase font-medium tracking-wider">Создание</h2>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer text-gray-500 p-1 rounded-md hover:shadow-sm transition-all"
        >
          <PanelRightClose size={20} />
        </button>
      </header>

      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col flex-1 min-h-0">
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-y-4 scrollbar-thin scrollbar-thumb-gray-300">
          <SectionCard>
            <FormField label="Описание" htmlFor="description" required>
              <textarea
                placeholder="О чем задача?"
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                id="description"
                className="text-gray-900 text-sm font-normal outline-none
            resize-none scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
              />
            </FormField>
          </SectionCard>
          <SectionCard>
            <FormField label="Статус" required>
              <StatusSelector
                value={formData.status}
                onChange={(status) => setFormData({ ...formData, status })}
              />
            </FormField>
            <FormField label="Канал" required>
              <Select
                value={formData.channel}
                onValueChange={(channel) =>
                  setFormData({ ...formData, channel: channel as TaskChannel })
                }
              >
                <SelectTrigger id="channel" className="w-full">
                  <SelectValue placeholder="Выберите канал" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {TASK_CHANNELS.map((channel) => (
                    <SelectItem key={channel} value={channel}>
                      {channel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Категория" required>
              <CategoryCombobox
                onChange={(category_id) => setFormData({ ...formData, category_id })}
                categoryId={formData.category_id}
              />
            </FormField>
          </SectionCard>
          <SectionCard>
            <FormField label="Сроки" required>
              <div className="flex gap-x-2">
                <DateRangePicker
                  from={formData.date_begin}
                  to={formData.date_plan_end}
                  onChange={({ from, to }) => {
                    setFormData({
                      ...formData,
                      date_begin: from ?? "",
                      date_plan_end: to,
                      date_fact_end: checked ? to : formData.date_fact_end,
                    });
                  }}
                >
                  <DateTrigger title="Начало" value={formatDayMonth(formData.date_begin)} />
                </DateRangePicker>

                <DateSinglePicker
                  dateFromForm={formData.date_plan_end}
                  onChange={(date) => {
                    setFormData({
                      ...formData,
                      date_plan_end: date,
                      date_fact_end: checked ? date : formData.date_fact_end,
                    });
                  }}
                  disabledHandle={(date) => {
                    return formData.date_begin ? date < parseISO(formData.date_begin) : false;
                  }}
                >
                  <DateTrigger title="План" value={formatDayMonth(formData.date_plan_end)} />
                </DateSinglePicker>

                <DateSinglePicker
                  dateFromForm={formData.date_fact_end}
                  onChange={(date) => {
                    setFormData({
                      ...formData,
                      date_fact_end: date,
                      date_plan_end: checked ? date : formData.date_plan_end,
                    });
                  }}
                  disabledHandle={(date) => {
                    return formData.date_begin ? date < parseISO(formData.date_begin) : false;
                  }}
                >
                  <DateTrigger title="Факт" value={formatDayMonth(formData.date_fact_end)} />
                </DateSinglePicker>
              </div>
              <div className="mt-2 flex gap-2">
                <Checkbox
                  checked={checked}
                  onCheckedChange={(value) => {
                    const isChecked = value === true;
                    setChecked(isChecked);
                    if (isChecked) {
                      setFormData({ ...formData, date_fact_end: formData.date_plan_end });
                    }
                  }}
                />
                <span className="text-gray-500 text-xs font-normal">
                  Фактическая дата совпадает с плановой
                </span>
              </div>
            </FormField>
          </SectionCard>
          <SectionCard>
            <FormField label="Автор" required>
              <AuthorCombobox
                value={formData.author}
                onChange={(author) => setFormData({ ...formData, author })}
              />
            </FormField>
            <FormField label="Исполнители" required>
              <UsersCombobox
                value={formData.user_ids}
                onChange={(users: number[]) => setFormData({ ...formData, user_ids: users })}
              />
            </FormField>
            <FormField label="Артефакт">
              <Input
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="Вставьте ссылку..."
              />
            </FormField>
          </SectionCard>
        </div>

        <div className="h-16 px-3 relative flex flex-col justify-center gap-y-2 items-start border-t border-gray-100">
          {error && <p className="text-red-500 text-sm absolute text-left -top-7 l-0">{error}</p>}
          <button
            onClick={handleSubmit}
            className="w-full cursor-pointer bg-gray-900 text-white font-semibold rounded-md p-2 hover:bg-gray-800 active:bg-gray-700 transition-colors"
          >
            + Создать задачу
          </button>
        </div>

        {/* <SectionCard>
          <div className="w-full">
            <pre className="text-xs p-2 bg-gray-50">{JSON.stringify(formData, null, 2)}</pre>
          </div>
        </SectionCard> */}
      </form>
    </aside>
  );
}

export default FullForm;
