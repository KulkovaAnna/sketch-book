import { useContext, useEffect, useState } from 'react';
import { LS_THEME } from 'constants/localStorage';
import ThemeContext from 'stores/ThemeStore';

export default function useSettings() {
  const [isFullScreen, setIsFullScreen] = useState(checkFullScreen());
  const theme = useContext(ThemeContext);
  const switchTheme = () => {
    theme.switchTheme();
    localStorage.setItem(LS_THEME, theme.curentTheme);
  };
  const switchScreenMode = () => {
    if (isFullScreen) {
      try {
        document.exitFullscreen();
      } catch {
        document.body.requestFullscreen().then(() => document.exitFullscreen());
      }
    } else {
      document.body.requestFullscreen();
    }
  };
  useEffect(() => {
    const resizeListener = () => {
      setIsFullScreen(checkFullScreen());
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return {
    switchScreenMode,
    switchTheme,
    isFullScreen,
  };
}

function checkFullScreen() {
  return (
    // eslint-disable-next-line no-restricted-globals
    window.innerWidth === screen.width && window.innerHeight === screen.height
  );
}
