import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { useEffect, useState } from "react";
import type { Category } from "@/types/category";
import { createCategory, getCategories } from "@/api/categories";
import { useApi } from "@/hooks/useApi";
import { ApiError } from "@/api/client";

type Props = {
  categoryId: number | null;
  onChange: (categoryId: number | null) => void;
  allowCreate?: boolean;
};

function CategoryCombobox({ categoryId, onChange, allowCreate = false }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { authRequest } = useApi();

  useEffect(() => {
    const load = async () => {
      try {
        const categories = await getCategories(authRequest);
        setCategories(categories);
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

  const handleAddCategory = async () => {
    try {
      setError(null);
      const newCategory = await createCategory(inputValue, authRequest);
      setCategories((prev) => [...prev, newCategory]);
      onChange(newCategory.id);
      setCategoryOpen(false);
    } catch (e) {
      if (e instanceof ApiError) {
        setError(e.message);
      } else {
        setError("Ошибка сети");
      }
    }
  };
  return (
    <Combobox
      value={categories.find((category: Category) => category.id === categoryId) ?? null}
      onValueChange={(category: Category | null) => onChange(category?.id ?? null)}
      open={categoryOpen}
      items={categories}
      itemToStringLabel={(category: Category) => category.name}
      inputValue={inputValue}
      onInputValueChange={(v) => {
        setInputValue(v);
        setError(null);
      }}
      onOpenChange={setCategoryOpen}
    >
      <ComboboxInput className="truncate" placeholder="Категория" showClear />
      <ComboboxContent>
        {inputValue &&
          allowCreate &&
          !categories.some(
            (c) => c.name.trim().toLowerCase() === inputValue.trim().toLowerCase(),
          ) && (
            <div className="p-2 border-b">
              <button
                type="button"
                onClick={handleAddCategory}
                className="w-full text-left text-sm text-blue-600 hover:bg-gray-50 px-2 py-1 rounded"
              >
                + Добавить "{inputValue}"
              </button>
            </div>
          )}
        <ComboboxEmpty>Не найдено</ComboboxEmpty>
        {error && <div className="p-2 text-xs text-red-500 border-b">{error}</div>}

        <ComboboxList>
          {(category) => (
            <ComboboxItem key={category.id} value={category}>
              {category.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export default CategoryCombobox;
