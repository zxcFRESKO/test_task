import type { IListRenderer } from "../../types/types";


export const ListRenderer = <T,>({ items, render, parentClass, childClass }: IListRenderer<T>) => {
  return (
    <ul className={parentClass}>
      {items.map((item, index) => (
        <li key={index} className={childClass}>{render(item)}</li>
      ))}
    </ul>
  );
};