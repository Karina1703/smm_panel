import React from "react";

const LogoMonzoSvg = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="250px"
      height="250px"
      fill={"currentColor"}
      {...props}
    >
      <path d="M46.707 12.293l-8-8a.999.999 0 00-1.414 0L25 16.586 12.707 4.293a.999.999 0 00-1.414 0l-8 8A.997.997 0 003 13v23c0 .265.105.52.293.707l10 10A.999.999 0 0015 46V25.414l9.293 9.293a.997.997 0 001.414 0L35 25.414V46a1 1 0 001.707.707l10-10A.997.997 0 0047 36V13a.997.997 0 00-.293-.707z" />
    </svg>
  );
};

export default LogoMonzoSvg;
