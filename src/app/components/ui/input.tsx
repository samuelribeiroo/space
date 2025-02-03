"use client";

export interface InputProps<T extends HTMLElement = HTMLInputElement> {
  searchedText: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  ref: React.Ref<T>;
}

export default function Input({ searchedText, onChange, ref }: InputProps) {
  return (
    <input
      className="input-style"
      placeholder="Pesquisar artigos..."
      value={searchedText}
      onChange={onChange}
      autoFocus
      ref={ref}
      spellCheck={false}
    />
  );
}
