import styles from './Account.module.css';
import stylesScreen from './AccountScreen.module.css';
import AccountHeaderNav from './AccountHeaderNav';

const AccountScreen = ({ title, children }) => {
  return (
    <section className={`${styles.account} container`}>
      <header className={stylesScreen.header}>
        <h1 className="title">{title}</h1>
        <AccountHeaderNav />
      </header>
      <br />
      <div>{children}</div>
    </section>
  );
};

export default AccountScreen;
