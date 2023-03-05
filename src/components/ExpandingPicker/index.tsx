import { Fragment, Key, ReactNode, useContext, useState } from 'react';
import ThemeContext from 'stores/ThemeStore';
import { ChevronLeft, ChevronRight } from 'icons';
import { CloseButton, Container } from './styles';

export type ExpandingPickerRenderItem<T> = (args: OptionProps<T>) => ReactNode;

interface Props<T> {
  values: T[];
  onSelect?(el: T): void;
  selectedElementIndex?: number;
  renderItem: ExpandingPickerRenderItem<T>;
}

interface OptionProps<T> {
  value: T;
  onClick?(val: T): void;
  isSelected?: boolean;
}

function ExpandingPicker<T>({
  renderItem,
  selectedElementIndex = 0,
  onSelect,
  values,
}: Props<T>) {
  const theme = useContext(ThemeContext);
  const [isOpened, setIsOpened] = useState(true);
  const onChevronClick = () => {
    setIsOpened((p) => !p);
  };
  return (
    <Container>
      {values.slice(0, isOpened ? undefined : 1).map((value, index) => (
        <Fragment key={value as Key}>
          {renderItem({
            value: isOpened ? value : values[selectedElementIndex],
            isSelected: isOpened ? index === selectedElementIndex : true,
            onClick: onSelect,
          })}
        </Fragment>
      ))}
      <CloseButton
        style={{ borderColor: theme.style.fontColor }}
        onClick={onChevronClick}
      >
        {isOpened ? (
          <ChevronLeft color={theme.style.iconsColor} />
        ) : (
          <ChevronRight color={theme.style.iconsColor} />
        )}
      </CloseButton>
    </Container>
  );
}

export default ExpandingPicker;
