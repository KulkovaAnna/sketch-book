import { FC, useContext } from 'react';
import { PickerColor } from '../../constants/colors';
import { Brush, LineWidth } from '../../constants/board';
import ThemeContext from '../../stores/ThemeStore';
import ColorPicker from '../ColorPicker';
import LineWidthPicker from '../LineWidthPicker';
import RedrawConrols from '../RedrawControls';
import Settings from '../Settings';
import { Container, Divider, LeftPanel, RightPanel } from './styles';
import BrushPicker from '../BrushPicker';

interface ToolboxProps {
  onUndoClick(): void;
  onRedoClick(): void;
  onClearClick(): void;
  selectedColor?: PickerColor;
  onColorSelect?(color: string): void;
  selectedLineWidth?: LineWidth;
  onLineWidthSelect?(width: LineWidth): void;
  selectedBrush?: Brush;
  onBrushSelect?(brush: Brush): void;
}

const Toolbox: FC<ToolboxProps> = ({
  onClearClick,
  onRedoClick,
  onUndoClick,
  onColorSelect,
  selectedColor,
  selectedLineWidth,
  onLineWidthSelect,
  selectedBrush,
  onBrushSelect,
}) => {
  const theme = useContext(ThemeContext);
  const divider = <Divider theme={theme.style} />;
  return (
    <Container>
      <LeftPanel>
        <RedrawConrols onRedoClick={onRedoClick} onUndoClick={onUndoClick} />
        {divider}
        <ColorPicker
          selectedColor={selectedColor || PickerColor.BLACK}
          onColorSelect={onColorSelect}
        />
        {divider}
        <LineWidthPicker
          selectedWidth={selectedLineWidth || LineWidth.THIN}
          onWidthSelect={onLineWidthSelect}
        />
        {divider}
        <BrushPicker
          selectedBrush={selectedBrush}
          onBrushSelect={onBrushSelect}
        />
      </LeftPanel>
      <RightPanel>
        <Settings onBinClick={onClearClick} />
      </RightPanel>
    </Container>
  );
};

export default Toolbox;
