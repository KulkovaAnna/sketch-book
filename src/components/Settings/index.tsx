/* eslint-disable no-restricted-globals */
//change theme, clean board, fullscreen

import { FC, useContext, useEffect, useRef, useState } from 'react';
import ThemeContext from '../../stores/ThemeStore';
import { Bin, Fullscreen, Gear, Minimize, Moon, Sun } from '../icons';
import { Container, Dropdown, IconButton, Line } from './styles';

interface Props {
  onBinClick?(): void;
}

const Settings: FC<Props> = ({ onBinClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(checkFullScreen());
  const ref = useRef<HTMLDivElement>(null);
  const theme = useContext(ThemeContext);
  const handleBinClick = () => {
    onBinClick?.();
    setShowDropdown(false);
  };
  const onGearClick = () => {
    setShowDropdown((prev) => !prev);
  };
  const handleSwitchTheme = () => {
    theme.switchTheme();
    localStorage.setItem('theme', theme.curentTheme);
    setShowDropdown(false);
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
    setShowDropdown(false);
  };
  useEffect(() => {
    const resizeListener = () => {
      setIsFullScreen(checkFullScreen());
    };
    const clickListener = (ev: MouseEvent | TouchEvent) => {
      if (ev.target !== ref.current) {
        setShowDropdown(false);
      }
    };
    window.addEventListener('resize', resizeListener);
    document.addEventListener('pointerdown', clickListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
      document.removeEventListener('pointerdown', clickListener);
    };
  }, []);
  const stopPropagation = (ev: React.MouseEvent | React.TouchEvent) => {
    ev.stopPropagation();
  };
  return (
    <Container ref={ref} onPointerDown={stopPropagation}>
      <IconButton onClick={onGearClick}>
        <Gear color={theme.style.iconsColor} />
      </IconButton>
      {showDropdown && (
        <Dropdown style={{ backgroundColor: theme.style.bacgroundColor }}>
          <IconButton onClick={handleBinClick} title="Clean">
            <Bin color={theme.style.iconsColor} />
          </IconButton>
          <Line style={{ backgroundColor: theme.style.iconsColor }} />
          <IconButton onClick={handleSwitchTheme} title="Switch color theme">
            {theme.curentTheme === 'dark' ? (
              <Sun color={theme.style.iconsColor} />
            ) : (
              <Moon color={theme.style.iconsColor} />
            )}
          </IconButton>
          <IconButton
            onClick={switchScreenMode}
            title={isFullScreen ? 'Minimize' : 'Fullscreen'}
          >
            {isFullScreen ? (
              <Minimize color={theme.style.iconsColor} />
            ) : (
              <Fullscreen color={theme.style.iconsColor} />
            )}
          </IconButton>
        </Dropdown>
      )}
    </Container>
  );
};

export default Settings;

function checkFullScreen() {
  return (
    window.innerWidth === screen.width && window.innerHeight === screen.height
  );
}
