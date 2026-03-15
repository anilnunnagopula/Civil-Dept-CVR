import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>404 - Page Not Found | Civil Engineering CVR</title>
      </Helmet>
      
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Oops! Page Not Found</h1>
        <p className={styles.text}>
          The page you are looking for might have been moved, deleted, or never existed.
        </p>
        <Link to="/" className="btn btn-gold">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
