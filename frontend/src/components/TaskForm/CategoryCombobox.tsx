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
import { useAuth } from "../auth/AuthContext";

type Props = {
  categoryId: number;
  onChange: (categoryId: number) => void;
};

function CategoryCombobox({ categoryId, onChange }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/category", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleAddCategory = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ name: inputValue }),
      });
      if (!response.ok) {
        console.error("Ошибка при создании категории: ", response.status);
        return;
      }
      const newCategory: Category = await response.json();
      setCategories([...categories, newCategory]);
      onChange(newCategory.id);
      setCategoryOpen(false);
    } catch (e) {
      console.error("Ошибка соединения:", e);
    }
  };
  return (
    <Combobox
      value={categories.find((category: Category) => category.id === categoryId) ?? null}
      onValueChange={(category: Category | null) => onChange(category?.id ?? 0)}
      open={categoryOpen}
      items={categories}
      itemToStringLabel={(category: Category) => category.name}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      onOpenChange={setCategoryOpen}
    >
      <ComboboxInput placeholder="Категория" />
      <ComboboxContent>
        {inputValue &&
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
