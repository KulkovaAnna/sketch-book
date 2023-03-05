import { FC, useContext, useEffect, useRef, useState } from 'react';
import ThemeContext from 'stores/ThemeStore';
import { Bin, Download, Fullscreen, Gear, Minimize, Moon, Sun } from 'icons';
import { Container, Dropdown, IconButton, Line } from './styles';
import useSettings from './useSettings';

export interface SettingsProps {
  onBinClick?(): void;
  onDownloadlick?(): void;
}

const Settings: FC<SettingsProps> = ({ onBinClick, onDownloadlick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const theme = useContext(ThemeContext);

  const { isFullScreen, switchScreenMode, switchTheme } = useSettings();

  const hideDropdown = () => setShowDropdown(false);

  const handleBinClick = () => {
    onBinClick?.();
    hideDropdown();
  };
  const onGearClick = () => {
    setShowDropdown((prev) => !prev);
  };
  const handleSwitchThemeClick = () => {
    switchTheme();
    hideDropdown();
  };
  const handleScreenModeClick = () => {
    switchScreenMode();
    hideDropdown();
  };
  useEffect(() => {
    const clickListener = (ev: MouseEvent | TouchEvent) => {
      if (ev.target !== ref.current) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('pointerdown', clickListener);
    return () => {
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
          <IconButton
            onClick={handleSwitchThemeClick}
            title="Switch color theme"
          >
            {theme.curentTheme === 'dark' ? (
              <Sun color={theme.style.iconsColor} />
            ) : (
              <Moon color={theme.style.iconsColor} />
            )}
          </IconButton>
          <IconButton
            onClick={handleScreenModeClick}
            title={isFullScreen ? 'Minimize' : 'Fullscreen'}
          >
            {isFullScreen ? (
              <Minimize color={theme.style.iconsColor} />
            ) : (
              <Fullscreen color={theme.style.iconsColor} />
            )}
          </IconButton>
          <IconButton onClick={onDownloadlick}>
            <Download style={{ width: 40 }} color={theme.style.iconsColor} />
          </IconButton>
        </Dropdown>
      )}
    </Container>
  );
};

export default Settings;
