import React from 'react';

const Watermark = () => (
  <a
    href="http://zawias.pro"
    style={{
      position: 'fixed',
      bottom: 0,
      right: 0,
      margin: 10,
      zIndex: 1000,
      padding: 5,
      backgroundColor: '#ccc',
      opacity: .5,
      display: 'block',
      fontSize: 16,
      color: '#444',
      textDecoration: 'none',
    }}
  >
    <span>
      zawias.pro
    </span>
  </a>
);

export { Watermark };
