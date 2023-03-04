import { FC } from 'react';
import { PickerColor } from '../../constants/colors';
import { Checkmark } from '../icons';
import ExpandingPicker, { ExpandingPickerRenderItem } from '../ExpandingPicker';
import { ColorCircle } from './styles';

interface Props {
  onColorSelect?(color: PickerColor): void;
  selectedColor: PickerColor;
}

interface ColorOptionProps {
  color: PickerColor;
  onClick?(color: PickerColor): void;
  isSelected?: boolean;
}

const ColorOption: FC<ColorOptionProps> = ({ color, onClick, isSelected }) => {
  const handleClick = () => {
    onClick?.(color);
  };
  return (
    <ColorCircle color={color} onClick={handleClick}>
      {isSelected && <Checkmark color="#FFFFFF" style={{ width: 15 }} />}
    </ColorCircle>
  );
};

const renderItem: ExpandingPickerRenderItem<PickerColor> = ({
  value,
  isSelected,
  onClick,
}) => <ColorOption color={value} isSelected={isSelected} onClick={onClick} />;

const values = Object.values(PickerColor);
const ColorPicker: FC<Props> = ({ onColorSelect, selectedColor }) => {
  return (
    <ExpandingPicker
      values={values}
      selectedElementIndex={values.indexOf(selectedColor)}
      onSelect={onColorSelect}
      renderItem={renderItem}
    />
  );
};

export default ColorPicker;
