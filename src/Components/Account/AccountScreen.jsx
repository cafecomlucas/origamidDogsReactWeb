import styles from './Account.module.css';

const AccountScreen = ({ title, children }) => {
  return (
    <section className={`${styles.account} container`}>
      <header>
        <h1 className="title">{title}</h1>
        <nav>--- (navegação padrão) ---</nav>
      </header>
      <br />
      <div>{children}</div>
    </section>
  );
};

export default AccountScreen;
