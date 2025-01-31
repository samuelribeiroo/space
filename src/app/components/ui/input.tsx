"use client";

type InputProps = {
  searchedText: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  ref: any;
};

export default function Input({ searchedText, onChange, ref }: InputProps) {
  return (
    <input
      className="input-style"
      placeholder="Pesquisar artigos..."
      value={searchedText}
      onChange={onChange}
      autoFocus
      ref={ref}
    />
  );
}
