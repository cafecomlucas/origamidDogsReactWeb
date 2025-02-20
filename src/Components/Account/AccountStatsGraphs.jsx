import React from 'react';
import styles from './AccountStatsGraphs.module.css';
import { STATS_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';

const AccountStatsGraphs = () => {
  const [allPhotoViews, setAllPhotoViews] = React.useState(0);
  const { request, dataJson } = useFetch();

  const getStats = React.useCallback(async () => {
    const { localStorage } = window;
    const token = localStorage.getItem('token');

    const { url, options } = STATS_GET(token);
    await request(url, options);
  }, [request]);

  React.useEffect(() => {
    if (dataJson) {
      console.log('--> dataJson: ', dataJson);
      console.log('<<<<<<<<<<<<<');
      // sum views for all photos
      const sumAllPhotoViews = dataJson.reduce((prev, crr) => {
        return prev + crr.acessos;
      }, 0);
      setAllPhotoViews(sumAllPhotoViews);
    }
  }, [dataJson]);

  React.useEffect(() => {
    getStats();
  }, [getStats]);

  return (
    <div className={styles.statsWrapper}>
      <div className={`${styles.statsItem} ${styles.allPhotoViews}`}>
        Total de visualizações: {allPhotoViews}
      </div>
    </div>
  );
};

export default AccountStatsGraphs;
