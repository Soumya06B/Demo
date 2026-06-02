function Input({ error, label, name, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>}
      <input
        id={name}
        name={name}
        className={`min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#1f6feb] focus:ring-2 focus:ring-[#1f6feb]/20 ${error ? 'border-[#c2410c] focus:border-[#c2410c] focus:ring-[#c2410c]/20' : ''} ${className}`}
        {...props}
      />
      {error && <span className="mt-1 block text-sm text-[#c2410c]">{error}</span>}
    </label>
  );
}

export default Input;
