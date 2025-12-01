export default function CampoBusca({ value, onChange, onSearch }) {
  return (
    <div className="busca-container">
      <input
        type="text"
        value={value}
        placeholder="Buscar produto..."
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={onSearch}>Buscar</button>
    </div>
  );
}
