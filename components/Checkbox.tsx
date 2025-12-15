"use client";
import { Checkbox } from "./ui/checkbox";

export function MultiCheckbox({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string[];
  onChange: (val: string[]) => void;
}) {
  const toggle = (item: string) => {
    if (value.includes(item)) onChange(value.filter((v) => v !== item));
    else onChange([...value, item]);
  };
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((item) => (
        <label
          key={item}
          className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
        >
          <Checkbox
            checked={value.includes(item)}
            onCheckedChange={() => toggle(item)}
          />
          {item}
        </label>
      ))}
    </div>
  );
}