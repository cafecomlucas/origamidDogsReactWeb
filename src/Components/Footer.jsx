import styles from './Footer.module.css';
import Dogs from '../Assets/dogs-logo-footer.svg?react';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Dogs />
      <p>Dogs App | Alguns direitos reservados</p>
    </div>
  );
};

export default Footer;
