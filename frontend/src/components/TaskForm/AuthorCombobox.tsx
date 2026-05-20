import { useEffect, useState } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { useApi } from "@/hooks/useApi";
import { getAuthors } from "@/api/users";
import { ApiError } from "@/api/client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function AuthorCombobox({ value, onChange }: Props) {
  const [authors, setAuthors] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { authRequest } = useApi();
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const authors = await getAuthors(value, authRequest);
        setAuthors(authors);
      } catch (e) {
        if (e instanceof ApiError) {
          setError(e.message);
        } else {
          setError("Ошибка сети");
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <Combobox
      items={authors}
      value={value || null}
      onValueChange={(picked: string | null) => onChange(picked ?? "")}
      inputValue={value}
      onInputValueChange={(value: string) => {
        onChange(value ?? "");
        setError(null);
      }}
    >
      <ComboboxInput placeholder="Начните вводить..." />
      <ComboboxContent>
        {error && <div className="p-2 text-xs text-red-500 border-b">{error}</div>}
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
