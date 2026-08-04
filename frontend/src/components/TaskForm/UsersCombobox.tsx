import { useEffect, useState } from "react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "../ui/combobox";
import type { User } from "@/types/user";
import { shortenFullName } from "@/utils/users";
import { getUsers } from "@/api/users";
import { useApi } from "@/hooks/useApi";
import { ApiError } from "@/api/client";

type Props = {
  value: number[];
  onChange: (ids: number[]) => void;
};

function UsersCombobox({ value, onChange }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { authRequest } = useApi();
  useEffect(() => {
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

  const anchor = useComboboxAnchor();
  return (
    <Combobox
      multiple
      items={users}
      itemToStringLabel={(user) => user.fio}
      value={users.filter((u) => value.includes(u.id))}
      onValueChange={(selected: User[]) => onChange(selected.map((u) => u.id))}
    >
      <ComboboxChips ref={anchor} className="w-full">
        <ComboboxValue>
          {(selected: User[]) => (
            <>
              {selected.map((user) => (
                <ComboboxChip key={user.id}>{shortenFullName(user.fio)}</ComboboxChip>
              ))}
              <ComboboxChipsInput
                placeholder={value.length === 0 ? "Добавить исполнителя..." : ""}
              />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent className="min-w-70">
        {error && <div className="p-2 text-xs text-red-500 border-b">{error}</div>}
        <ComboboxEmpty>Исполнитель не найден</ComboboxEmpty>
        <ComboboxList>
          {(user: User) => (
            <ComboboxItem key={user.id} value={user}>
              {shortenFullName(user.fio)}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export default UsersCombobox;
