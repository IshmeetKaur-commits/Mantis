export default function SearchBar({
  value,
  onChange,
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      placeholder="Search products..."
      className="
      w-full
      rounded-2xl
      px-5
      py-4
      bg-white
      border
      border-slate-200
      shadow-sm
      outline-none
      focus:ring-2
      focus:ring-emerald-400
      "
    />
  );
}