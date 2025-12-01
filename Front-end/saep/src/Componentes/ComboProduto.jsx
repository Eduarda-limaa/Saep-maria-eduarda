export default function ComboTipoProduto({ value, onChange }) {
  const tipos = [
    { value: "SMARTPHONE", label: "Smartphone" },
    { value: "NOTEBOOK", label: "Notebook" },
    { value: "SMARTTV", label: "Smart TV" },
  ];

  return (
    <div className="combo-container">
      <label>Tipo do Produto</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Selecione o tipo...</option>
        {tipos.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>
    </div>
  );
}
