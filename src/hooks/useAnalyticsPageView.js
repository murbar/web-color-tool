import React from 'react';
import ReactGA from 'react-ga';

const useAnalyticsPageView = location => {
  React.useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);
};

export default useAnalyticsPageView;
