import styles from './Input.module.css';

const Input = ({ label, name, type, value, error, onChange, onBlur }) => {
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
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className={styles.validationError}>{error}</p>}
    </div>
  );
};

export default Input;
