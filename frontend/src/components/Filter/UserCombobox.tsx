import { ApiError } from "@/api/client";
import { getUsers } from "@/api/users";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useApi } from "@/hooks/useApi";
import type { User } from "@/types/user";
import { shortenFullName } from "@/utils/users";
import { useEffect, useState } from "react";

type Props = {
  userId: number | null;
  onChange: (id: number | null) => void;
};

export function UserCombobox({ userId, onChange }: Props) {
  const { authRequest } = useApi();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Монтирование...");
    const load = async () => {
      try {
        const users = await getUsers(authRequest);
        setUsers(users);
      } catch (e) {
        if (e instanceof ApiError) {
          setError(e.message);
        } else {
          setError("Ошибка сети");
        }
      }
    };
    load();
  }, []);
  return (
    <Combobox
      items={users}
      value={users.find((u) => u.id == userId) ?? null}
      itemToStringLabel={(user) => shortenFullName(user.fio)}
      onValueChange={(user: User | null) => onChange(user?.id ?? null)}
    >
      <ComboboxInput placeholder="Исполнитель" showClear />
      <ComboboxContent>
        {error && <div className="p-2 text-xs text-red-500 border-b">{error}</div>}
        <ComboboxEmpty>Не найдено</ComboboxEmpty>
        <ComboboxList>
          {(user) => (
            <ComboboxItem key={user.id} value={user}>
              {shortenFullName(user.fio)}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
