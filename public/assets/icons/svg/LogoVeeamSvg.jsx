import React from "react";

const LogoVeeamSvg = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="250px"
      height="250px"
      fill={"currentColor"}
      {...props}
    >
      <path d="M41 4H9C6.24 4 4 6.24 4 9v32c0 2.76 2.24 5 5 5h32c2.76 0 5-2.24 5-5V9c0-2.76-2.24-5-5-5zm-2 35H19.5c-4.69 0-8.5-3.81-8.5-8.5V11h4v16c0 3.31 2.69 6 6 6h18v6zm-7.26-10h-5.18L19 11h4.32l5.83 14 5.53-14H39l-7.26 18z" />
    </svg>
  );
};

export default LogoVeeamSvg;
