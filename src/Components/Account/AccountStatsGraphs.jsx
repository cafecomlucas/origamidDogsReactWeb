import React from 'react';
import styles from './AccountStatsGraphs.module.css';
import { STATS_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import { VictoryPie, VictoryChart, VictoryBar } from 'victory';
import ErrorBox from '../../Helpers/ErrorBox';
import Loading from '../../Helpers/Loading';

const AccountStatsGraphs = () => {
  const [allPhotoViews, setAllPhotoViews] = React.useState(0);
  const [graphData, setGraphData] = React.useState(null);
  const { request, dataJson, rqError, rqLoading } = useFetch();

  const getStats = React.useCallback(async () => {
    const { localStorage } = window;
    const token = localStorage.getItem('token');

    const { url, options } = STATS_GET(token);
    await request(url, options);
  }, [request]);

  React.useEffect(() => {
    if (dataJson) {
      // sum all photos views
      const sumAllPhotoViews = dataJson.reduce((prev, crr) => {
        return prev + crr.acessos;
      }, 0);
      setAllPhotoViews(sumAllPhotoViews);

      const newGraphData = dataJson.map(({ title, acessos }) => ({
        x: title,
        y: acessos,
      }));
      setGraphData(newGraphData);
    }
  }, [dataJson]);

  React.useEffect(() => {
    getStats();
  }, [getStats]);

  if (rqError) return <ErrorBox message={rqError} />;
  if (rqLoading) return <Loading />;
  if (dataJson) {
    return (
      <section className="animeLeft">
        <div className={styles.statsWrapper}>
          <div className={`${styles.statsItem} ${styles.allPhotoViews}`}>
            Total de visualizações: {allPhotoViews}
          </div>
          <div className={styles.statsItem}>
            <VictoryPie
              data={graphData}
              innerRadius={40}
              padding={{ top: 20, bottom: 20, left: 100, right: 100 }}
              style={{
                data: {
                  fillOpacity: 0.9,
                  stroke: '#fff',
                  strokeWidth: 2,
                },
                labels: {
                  fontSize: 14,
                  fill: '#333',
                },
              }}
            />
          </div>
          <div className={styles.statsItem}>
            <VictoryChart>
              <VictoryBar alignment="start" data={graphData}></VictoryBar>
            </VictoryChart>
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default AccountStatsGraphs;
