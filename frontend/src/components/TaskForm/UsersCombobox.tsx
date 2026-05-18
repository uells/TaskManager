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
import { useAuth } from "../auth/AuthContext";

type Props = {
  value: number[];
  onChange: (ids: number[]) => void;
};

function shortenFullName(fullName: string): string {
  const parted = fullName.split(" ");
  if (parted.length === 0) {
    return "";
  }
  if (parted.length === 1) {
    return parted[0];
  }
  if (parted.length === 2) {
    const family = parted[0];
    const name = parted[1][0] + ".";
    return family + " " + name;
  }

  const family = parted[0];
  const name = parted[1][0] + ".";
  const patronymic = parted[2][0] + ".";
  return family + " " + name + " " + patronymic;
}

function UsersCombobox({ value, onChange }: Props) {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/user", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
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
