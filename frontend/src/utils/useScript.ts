import { useState, useEffect } from 'react';

const useScript = (src: string): boolean => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    const onLoad = () => setLoaded(true);
    const onError = () => setLoaded(false);

    script.addEventListener('load', onLoad);
    script.addEventListener('error', onError);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', onLoad);
      script.removeEventListener('error', onError);
      document.body.removeChild(script);
    };
  }, [src]);

  return loaded;
};

export default useScript;