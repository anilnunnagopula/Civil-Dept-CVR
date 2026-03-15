export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="section-header">
      <div className="section-divider" />
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
