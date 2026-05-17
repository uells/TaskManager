import { PanelRightClose } from "lucide-react";
import { TASK_CHANNELS, type TaskChannel, type TaskCreate } from "../../types/task";
import { useState } from "react";
import SectionCard from "../ui/SectionCard";
import FormField from "./FormField";
import StatusSelector from "./StatusSelector";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useAuth } from "../auth/AuthContext";
import CategoryCombobox from "./CategoryCombobox";
import { parseISO } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import DateRangeButton from "./DateRangeButton";
import DateButton from "./DateButton";

type Props = {
  onClose: () => void;
};

function FullForm({ onClose }: Props) {
  const [checked, setChecked] = useState(false);
  const { token } = useAuth();
  const [formData, setFormData] = useState<TaskCreate>({
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
    link: null,
    id_parent_task: null,
  });

  return (
    <aside
      className="h-screen overflow-y-auto scrollbar-thin w-100
        scrollbar-thumb-gray-300 scrollbar-track-transparent border-l border-gray-100"
    >
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

      <form onSubmit={(e) => e.preventDefault()} className="p-3 flex flex-col gap-y-4">
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
              <DateRangeButton
                dateBegin={formData.date_begin}
                datePlanEnd={formData.date_plan_end}
                onChange={({ from, to }) => {
                  setFormData({
                    ...formData,
                    date_begin: from ?? "",
                    date_plan_end: to,
                    date_fact_end: checked ? to : formData.date_fact_end,
                  });
                }}
              />

              <DateButton
                title="План"
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
              />

              <DateButton
                title="Факт"
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
              />
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
          <div className="w-full">
            <pre className="text-xs p-2 bg-gray-50">{JSON.stringify(formData, null, 2)}</pre>
          </div>
        </SectionCard>
      </form>
    </aside>
  );
}

export default FullForm;
