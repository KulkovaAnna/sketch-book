import { FC, useContext, useMemo } from 'react';
import ThemeContext from 'stores/ThemeStore';
import { RoundArrow } from 'icons';
import { Container, IconButton, Redo } from './styles';

export interface RedrawControlsProps {
  onUndoClick?(): void;
  onRedoClick?(): void;
}

const RedrawConrols: FC<RedrawControlsProps> = ({
  onRedoClick,
  onUndoClick,
}) => {
  const theme = useContext(ThemeContext);
  const arrow = useMemo(
    () => <RoundArrow color={theme.style.iconsColor} />,
    [theme.style.iconsColor]
  );
  return (
    <Container>
      <IconButton onClick={onUndoClick} title="Undo">
        {arrow}
      </IconButton>
      <Redo onClick={onRedoClick} title="Redo">
        {arrow}
      </Redo>
    </Container>
  );
};

export default RedrawConrols;
