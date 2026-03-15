import styles from './PersonCard.module.css';

function initials(name = '') {
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || '?';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function PersonCard({
  name,
  role,
  detail,
  extraDetail,
  avatarClass = 'avatar-navy',
  isNew,
  linkedIn,
  greenText,
}) {
  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.top}>
        <div className={`avatar avatar-lg ${avatarClass}`}>{initials(name)}</div>
        <div className={styles.info}>
          <div className={styles.nameRow}>
            <span className={styles.name}>{name}</span>
            {isNew && <span className="badge-new">NEW</span>}
          </div>
          {role && <p className={styles.role}>{role}</p>}
          {detail && <p className={styles.detail}>{detail}</p>}
          {extraDetail && <p className={styles.extra}>{extraDetail}</p>}
          {greenText && <p className={styles.green}>{greenText}</p>}
        </div>
      </div>
      {linkedIn && (
        <a href={linkedIn} target="_blank" rel="noopener noreferrer" className={styles.linkedin}>
          🔗 LinkedIn
        </a>
      )}
    </div>
  );
}
