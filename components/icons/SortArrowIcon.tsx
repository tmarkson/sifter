import React from 'react';

interface SortArrowIconProps {
  direction: 'asc' | 'desc';
}

export const SortArrowIcon: React.FC<SortArrowIconProps> = ({ direction }) => {
  const commonProps = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  return (
    <svg {...commonProps}>
      {direction === 'asc' 
        ? <path d="M12 19V5M5 12l7-7 7 7"/>
        : <path d="M12 5v14m7 7l-7-7-7 7"/>
      }
    </svg>
  );
};
