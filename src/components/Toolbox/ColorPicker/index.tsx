import { FC } from 'react';
import { PickerColor } from 'constants/editor';
import { Checkmark } from 'icons';
import { ExpandingPicker, ExpandingPickerRenderItem } from 'components';
import { ColorCircle } from './styles';
import { ExpandingPickerRenderItemProps } from 'components/ExpandingPicker';

export interface ColorPickerProps
  extends Pick<ExpandingPickerRenderItemProps<PickerColor>, 'title'> {
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
const ColorPicker: FC<ColorPickerProps> = ({
  onColorSelect,
  selectedColor,
  ...rest
}) => {
  return (
    <ExpandingPicker
      values={values}
      selectedElementIndex={values.indexOf(selectedColor)}
      onSelect={onColorSelect}
      renderItem={renderItem}
      {...rest}
    />
  );
};

export default ColorPicker;
