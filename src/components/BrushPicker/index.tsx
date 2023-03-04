import { FC, useContext } from 'react';
import { Eraser, Pen } from '../icons';
import ExpandingPicker, { ExpandingPickerRenderItem } from '../ExpandingPicker';
import { Circle } from './styles';
import { Brush } from '../../constants/board';
import ThemeContext from '../../stores/ThemeStore';

interface Props {
  onBrushSelect?(brush: Brush): void;
  selectedBrush?: Brush;
}

interface OptionProps {
  brush: Brush;
  onClick?(brush: Brush): void;
  isSelected?: boolean;
}

const getIcon = (brush: Brush, color: string) => {
  switch (brush) {
    case Brush.PEN:
      return <Pen color={color} style={{ width: 25 }} />;
    case Brush.ERASER:
      return <Eraser color={color} />;
  }
};

const Option: FC<OptionProps> = ({ brush, onClick, isSelected }) => {
  const theme = useContext(ThemeContext);
  const handleClick = () => {
    onClick?.(brush);
  };
  return (
    <Circle
      onClick={handleClick}
      style={{
        borderColor: isSelected ? theme.style.selectedColor : 'transparent',
      }}
    >
      {getIcon(brush, theme.style.iconsColor)}
    </Circle>
  );
};

const renderItem: ExpandingPickerRenderItem<Brush> = ({
  value,
  isSelected,
  onClick,
}) => <Option brush={value} isSelected={isSelected} onClick={onClick} />;

const values = Object.values(Brush);
const BrushPicker: FC<Props> = ({ onBrushSelect, selectedBrush }) => {
  return (
    <ExpandingPicker
      values={values}
      selectedElementIndex={values.indexOf(selectedBrush || Brush.PEN)}
      onSelect={onBrushSelect}
      renderItem={renderItem}
    />
  );
};

export default BrushPicker;
