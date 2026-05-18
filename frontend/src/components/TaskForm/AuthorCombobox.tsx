import { useEffect, useState } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { useAuth } from "../auth/AuthContext";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function AuthorCombobox({ value, onChange }: Props) {
  const { token } = useAuth();
  const [authors, setAuthors] = useState<string[]>([]);
  //   const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(
        `http://localhost:8000/api/v1/task/authors?limit=10&search=${encodeURIComponent(value)}`,
        { headers: { Authorization: "Bearer " + token } },
      )
        .then((res) => res.json())
        .then((data) => setAuthors(data));
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <Combobox
      items={authors}
      value={value || null}
      onValueChange={(picked: string | null) => onChange(picked ?? "")}
      inputValue={value}
      onInputValueChange={(value: string) => onChange(value ?? "")}
    >
      <ComboboxInput placeholder="Начните вводить..." />
      <ComboboxContent>
        <ComboboxEmpty>Не найдено</ComboboxEmpty>
        <ComboboxList>
          {(author: string) => (
            <ComboboxItem key={author} value={author}>
              {author}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export default AuthorCombobox;
