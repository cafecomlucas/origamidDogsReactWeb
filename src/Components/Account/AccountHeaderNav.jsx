import { NavLink } from 'react-router-dom';
import IconPhotosFeed from '../../Assets/icon-photos-feed.svg?react';
import IconNewPhoto from '../../Assets/icon-new-photo.svg?react';
import IconStats from '../../Assets/icon-stats.svg?react';
import styles from './AccountHeaderNav.module.css';

const AccountHeaderNav = () => {
  return (
    <nav className={styles.accountHeaderNav}>
      <NavLink to="/account" end>
        <IconPhotosFeed />
      </NavLink>
      <NavLink to="/account/new-photo">
        <IconNewPhoto />
      </NavLink>
      <NavLink to="/account/stats">
        <IconStats />
      </NavLink>
    </nav>
  );
};

export default AccountHeaderNav;
