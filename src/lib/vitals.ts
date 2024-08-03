
import { onCLS, onFID, onLCP, onTTFB, onFCP } from 'web-vitals/attribution';
// lib/vitals.js
// import { getCLS, getFID, getLCP, getTTFB, getFCP } from 'web-vitals';

// const reportWebVitals = (onPerfEntry) => {
//   if (onPerfEntry && onPerfEntry instanceof Function) {
//     getCLS(onPerfEntry);
//     getFID(onPerfEntry);
//     getLCP(onPerfEntry);
//     getTTFB(onPerfEntry);
//     getFCP(onPerfEntry);
//   }
// };

// export default reportWebVitals;

// src/lib/vitals.ts


const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
    getFCP(onPerfEntry);
  }
};

export default reportWebVitals;


