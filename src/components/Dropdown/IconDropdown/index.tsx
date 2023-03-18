import { TIcon } from 'icons/types';
import { FC, Fragment, useContext } from 'react';
import ThemeContext from 'stores/ThemeStore';
import Dropdown, { DropdownProps } from '..';
import { IconButton } from '../styles';
import { Line } from './styles';

interface Props extends DropdownProps {
  options: {
    id: string | number;
    Icon: TIcon;
    title?: string;
    onClick?(): void;
  }[];
}

const IconDropdown: FC<Props> = ({ options, ...rest }) => {
  const theme = useContext(ThemeContext);
  return (
    <Dropdown {...rest}>
      {options.map((option, index, arr) => (
        <Fragment key={option.id}>
          <IconButton onClick={option.onClick} title={option.title}>
            <option.Icon color={theme.style.iconsColor} />
          </IconButton>
          {index !== arr.length - 1 && (
            <Line style={{ backgroundColor: theme.style.iconsColor }} />
          )}
        </Fragment>
      ))}
    </Dropdown>
  );
};

export default IconDropdown;
