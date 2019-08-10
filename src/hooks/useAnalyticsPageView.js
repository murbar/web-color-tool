import React from 'react';
import ReactGA from 'react-ga';
import { env } from 'config';

const useAnalyticsPageView = location => {
  React.useEffect(() => {
    if (env === 'production') {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [location]);
};

export default useAnalyticsPageView;
