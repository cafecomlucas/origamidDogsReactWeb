import React from 'react';
import Loading from '../../Helpers/Loading';
const AccountStatsGraphs = React.lazy(() => import('./AccountStatsGraphs'));

const AccountStats = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <section className="animeLeft">
        <AccountStatsGraphs />
      </section>
    </React.Suspense>
  );
};

export default AccountStats;
