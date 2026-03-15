import { useState } from 'react';

export default function AdminForm({ fields, onSubmit, submitLabel = 'Save Entry' }) {
  const initialState = Object.fromEntries(fields.map(f => [f.name, '']));
  const [form, setForm] = useState(initialState);
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit(form);
      setForm(initialState);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(f => (
        <div className="form-group" key={f.name}>
          <label htmlFor={f.name}>
            {f.label}{f.required && ' *'}
          </label>

          {f.type === 'select' ? (
            <select
              id={f.name}
              name={f.name}
              value={form[f.name]}
              onChange={handleChange}
              required={f.required}
            >
              <option value="">— Select —</option>
              {f.options.map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>

          ) : f.type === 'textarea' ? (
            <textarea
              id={f.name}
              name={f.name}
              value={form[f.name]}
              onChange={handleChange}
              required={f.required}
              placeholder={f.placeholder || ''}
            />

          ) : (
            <input
              id={f.name}
              name={f.name}
              type={f.type || 'text'}
              value={form[f.name]}
              onChange={handleChange}
              required={f.required}
              placeholder={f.placeholder || ''}
            />
          )}
        </div>
      ))}

      <button type="submit" className="btn btn-navy" disabled={saving}>
        {saving ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}
