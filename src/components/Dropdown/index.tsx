import { TIcon } from 'icons/types';
import {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import ThemeContext from 'stores/ThemeStore';
import { Container, DropdownContainer, IconButton } from './styles';

export interface DropdownProps {
  Icon: TIcon;
  iconTitle?: string;
}

const Dropdown: FC<PropsWithChildren<DropdownProps>> = ({
  Icon,
  iconTitle,
  children,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const theme = useContext(ThemeContext);

  const hideDropdown = () => setShowDropdown(false);

  const onIconClick = () => {
    setShowDropdown((prev) => !prev);
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
      <IconButton onClick={onIconClick} title={iconTitle}>
        <Icon color={theme.style.iconsColor} />
      </IconButton>
      {showDropdown && (
        <DropdownContainer
          style={{ backgroundColor: theme.style.bacgroundColor }}
          onClick={hideDropdown}
        >
          {children}
        </DropdownContainer>
      )}
    </Container>
  );
};

export default Dropdown;
