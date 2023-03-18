import { FC, useContext } from 'react';
import { LineWidth } from 'constants/editor';
import ThemeContext from 'stores/ThemeStore';
import { CurveLine } from 'icons';
import ExpandingPicker, {
  ExpandingPickerRenderItem,
  ExpandingPickerRenderItemProps,
} from 'components/ExpandingPicker';
import { Circle } from './styles';

export interface LineWidthPickerProps
  extends Pick<ExpandingPickerRenderItemProps<LineWidth>, 'title'> {
  onWidthSelect?(width: LineWidth): void;
  selectedWidth: LineWidth;
}

interface OptionProps {
  width: LineWidth;
  onClick?(width: LineWidth): void;
  isSelected?: boolean;
}

const Option: FC<OptionProps> = ({ width, onClick, isSelected }) => {
  const theme = useContext(ThemeContext);
  const handleClick = () => {
    onClick?.(width);
  };
  return (
    <Circle
      onClick={handleClick}
      style={{
        borderColor: isSelected ? theme.style.selectedColor : 'transparent',
      }}
    >
      <CurveLine color={theme.style.iconsColor} width={width} />
    </Circle>
  );
};

const values = Object.values(LineWidth).slice(3);

const renderItem: ExpandingPickerRenderItem<LineWidth> = ({
  value,
  isSelected,
  onClick,
}) => <Option width={value} isSelected={isSelected} onClick={onClick} />;

const LineWidthPicker: FC<LineWidthPickerProps> = ({
  selectedWidth,
  onWidthSelect,
  ...rest
}) => {
  return (
    <ExpandingPicker
      values={values as LineWidth[]}
      renderItem={renderItem}
      onSelect={onWidthSelect}
      selectedElementIndex={values.indexOf(selectedWidth)}
      {...rest}
    />
  );
};

export default LineWidthPicker;
