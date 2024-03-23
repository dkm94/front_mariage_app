import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollRestoration = ({ children }) => {
  const location = useLocation<{ currentPosition?: number }>();

  useEffect(() => {
    const currentPosition: number = location.state?.currentPosition || 0;
    window.scrollTo(0, currentPosition);
  }, [location.state]);

  return <>{children}</>;
};

export default ScrollRestoration;
