"use client";

import Script from "next/script";

const TransactionCloud = () => {
  return (
    <>
      <Script src={"https://cdn.transaction.cloud/latest/widget.sandbox.min.js"} />
    </>
  );
};

export default TransactionCloud;
