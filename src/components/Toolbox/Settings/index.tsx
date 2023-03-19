import { FC, useContext } from 'react';
import ThemeContext from 'stores/ThemeStore';
import { Bin, Fullscreen, Gear, Minimize, Moon, Sun } from 'icons';
import useSettings from './useSettings';
import { StyledDownload } from './styles';
import { TIcon } from 'icons';
import { IconDropdown } from 'components';

export interface SettingsProps {
  onBinClick?(): void;
  onDownloadClick?(): void;
}

const Settings: FC<SettingsProps> = ({
  onBinClick,
  onDownloadClick: onDownloadlick,
}) => {
  const theme = useContext(ThemeContext);

  const { isFullScreen, switchScreenMode, switchTheme } = useSettings();

  return (
    <IconDropdown
      Icon={Gear}
      options={[
        {
          Icon: Bin,
          id: 'bin',
          title: 'Clean',
          onClick: onBinClick,
        },
        {
          Icon: theme.curentTheme === 'dark' ? Sun : Moon,
          id: 'theme',
          title: 'Switch color theme',
          onClick: switchTheme,
        },
        {
          Icon: isFullScreen ? Minimize : Fullscreen,
          id: 'fullscreen',
          title: isFullScreen ? 'Minimize' : 'Fullscreen',
          onClick: switchScreenMode,
        },
        {
          Icon: StyledDownload as TIcon,
          id: 'download',
          title: 'Download image',
          onClick: onDownloadlick,
        },
      ]}
    />
  );
};

export default Settings;
