import React from "react";
import Script from "next/script";

const LiveChat = ({ chatra_id }) => {
  return (
    <>
      <Script
        id={"chatra"}
        dangerouslySetInnerHTML={{
          __html: `(function(d, w, c) {
        w.ChatraID = '${chatra_id}';
        var s = d.createElement('script');
        w[c] = w[c] || function() {
            (w[c].q = w[c].q || []).push(arguments);
        };
        s.async = true;
        s.src = 'https://call.chatra.io/chatra.js';
        if (d.head) d.head.appendChild(s);
      })(document, window, 'Chatra');
      window.ChatraSetup = {
      colors: {
          buttonText: '#ffffff',
          buttonBg: '#4f46e6',
      }
      };`,
        }}
      />
    </>
  );
};

export default LiveChat;
