import stylesInput from './Input.module.css';
import styles from './InputFile.module.css';

const Input = ({ name, error, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.file}
        id={name}
        name={name}
        type="file"
        onChange={onChange}
      />
      {error && <p className={`${stylesInput.validationError}`}>{error}</p>}
    </div>
  );
};

export default Input;
