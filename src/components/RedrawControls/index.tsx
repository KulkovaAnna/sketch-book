import { FC, memo, useContext } from 'react';
import ThemeContext from '../../stores/ThemeStore';
import { RoundArrow } from '../icons';
import { Container, IconButton, Redo } from './styles';

interface Props {
  onUndoClick?(): void;
  onRedoClick?(): void;
}

const RedrawConrols: FC<Props> = ({ onRedoClick, onUndoClick }) => {
  const theme = useContext(ThemeContext);
  const Arrow = memo(() => <RoundArrow color={theme.style.iconsColor} />);
  return (
    <Container>
      <IconButton onClick={onUndoClick} title="Undo">
        <Arrow />
      </IconButton>
      <Redo onClick={onRedoClick} title="Redo">
        <Arrow />
      </Redo>
    </Container>
  );
};

export default RedrawConrols;
