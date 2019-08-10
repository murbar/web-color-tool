import React from 'react';
import ReactGA from 'react-ga';
import config from 'config';

const useAnalyticsPageView = location => {
  React.useEffect(() => {
    if (config.env === 'production') {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [location]);
};

export default useAnalyticsPageView;
