import React, { useRef, useEffect } from 'react';

import { map } from './Map.module.scss';

const Map = props => {
  const { className, zoom, center } = props;

  const mapRef = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
    });

    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return <div ref={mapRef} className={`${map} ${className}`}></div>;
};

export default Map;
