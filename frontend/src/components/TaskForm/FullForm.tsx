import { PanelRightClose } from "lucide-react";
import { TASK_CHANNELS, type TaskChannel, type TaskCreate } from "../../types/task";
import { useState } from "react";
import SectionCard from "../SectionCard";
import FormField from "./FormField";
import StatusSelector from "./StatusSelector";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Props = {
  onClose: () => void;
};

function FullForm({ onClose }: Props) {
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
          <div className="grid grid-cols-2 gap-x-2">
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
              В работе
            </FormField>
          </div>
        </SectionCard>
      </form>
    </aside>
  );
}

export default FullForm;
