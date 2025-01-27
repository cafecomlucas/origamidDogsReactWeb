import styles from './Input.module.css';

const Input = ({ label, name, type, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles.input}
        id={name}
        name={name}
        type={type}
        onChange={onChange}
      />
      <p className={styles.error}>Error</p>
    </div>
  );
};

export default Input;
