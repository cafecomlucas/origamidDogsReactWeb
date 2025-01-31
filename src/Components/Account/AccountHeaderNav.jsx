import React from 'react';
import { NavLink } from 'react-router-dom';
import IconPhotosFeed from '../../Assets/icon-photos-feed.svg?react';
import IconNewPhoto from '../../Assets/icon-new-photo.svg?react';
import IconStats from '../../Assets/icon-stats.svg?react';
import IconExit from '../../Assets/icon-exit.svg?react';
import styles from './AccountHeaderNav.module.css';
import { UserContext } from '../../UserContext';
import useMedia from '../../Hooks/useMedia';

const AccountHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);
  const mediaMatch = useMedia('(max-width: 50rem)');

  return (
    <nav className={mediaMatch ? styles.accNavMobile : styles.accNav}>
      <NavLink to="/account" end>
        <IconPhotosFeed /> {mediaMatch && ' Minhas Fotos'}
      </NavLink>
      <NavLink to="/account/new-photo">
        <IconNewPhoto /> {mediaMatch && ' Adicionar Foto'}
      </NavLink>
      <NavLink to="/account/stats">
        <IconStats /> {mediaMatch && ' Estatísticas'}
      </NavLink>
      <button onClick={userLogout}>
        <IconExit /> {mediaMatch && ' Sair'}
      </button>
    </nav>
  );
};

export default AccountHeaderNav;
