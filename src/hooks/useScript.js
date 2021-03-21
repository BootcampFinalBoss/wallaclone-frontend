import { useEffect } from 'react';

const useScript = (scriptName, scriptParentId, url) => {
  useEffect(() => {
    const script = document.createElement(scriptName || 'script');

    script.src = url;
    script.async = true;

    document.getElementById(scriptParentId).appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default useScript;
