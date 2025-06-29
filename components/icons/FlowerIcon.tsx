
import React from 'react';

export const FlowerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 15.5A3.5 3.5 0 0 0 12 5a3.5 3.5 0 0 0 0 10.5"/>
      <path d="M15.5 12A3.5 3.5 0 0 0 5 12a3.5 3.5 0 0 0 10.5 0"/>
      <path d="M14.12 9.88A3.5 3.5 0 0 0 9.88 14.12a3.5 3.5 0 0 0 4.24 0"/>
      <path d="M9.88 9.88A3.5 3.5 0 0 0 14.12 14.12a3.5 3.5 0 0 0-4.24 0"/>
    </svg>
);
