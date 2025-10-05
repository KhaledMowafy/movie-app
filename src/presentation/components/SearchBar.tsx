
type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <div className="w-full">
      <label htmlFor={"movie-search"} className="sr-only">Search movies</label>
      <input
        id={"movie-search"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search for a movie..."}
        className="w-full rounded-2xl border px-4 py-3 text-base outline-none
                   focus:ring-2 focus:ring-indigo-500 shadow-sm"
      />
    </div>
  );
}
