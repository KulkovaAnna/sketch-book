import { FC, useContext } from 'react';
import { Image } from 'icons';
import ExpandingPicker, {
  ExpandingPickerRenderItem,
  ExpandingPickerRenderItemProps,
} from 'components/ExpandingPicker';
import { Circle } from './styles';
import ThemeContext from 'stores/ThemeStore';

type Media = 'image' | 'sticker';

export interface MediaPickerProps
  extends Pick<ExpandingPickerRenderItemProps<Media>, 'title'> {}

interface OptionProps {
  type: Media;
  onClick?(): void;
}

const getIcon = (type: Media, color: string) => {
  switch (type) {
    case 'image':
      return <Image color={color} style={{ width: 25 }} />;
    // case 'sticker':
    //   return <Eraser color={color} />;
  }
};

const onClick = (type: Media) => {
  switch (type) {
    case 'image':
      return () => {
        console.log('image');
      };
    // case 'sticker':
    //   return () => {console.log('sticker')}
  }
};

const Option: FC<OptionProps> = ({ type, onClick }) => {
  const theme = useContext(ThemeContext);
  const handleClick = () => {
    onClick?.();
  };
  return (
    <Circle onClick={handleClick}>
      {getIcon(type, theme.style.iconsColor)}
    </Circle>
  );
};

const renderItem: ExpandingPickerRenderItem<Media> = ({ value }) => {
  const handleClick = onClick(value);
  return <Option type={value} onClick={handleClick} />;
};

const values: Media[] = ['image'];

const MediaFilePicker: FC<MediaPickerProps> = ({ ...rest }) => {
  return <ExpandingPicker values={values} renderItem={renderItem} {...rest} />;
};

export default MediaFilePicker;
