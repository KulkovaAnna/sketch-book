import { FC, useContext } from 'react';
import { Image } from 'icons';
import ExpandingPicker, {
  ExpandingPickerRenderItem,
  ExpandingPickerRenderItemProps,
} from 'components/ExpandingPicker';
import { Circle } from './styles';
import ThemeContext from 'stores/ThemeStore';
import useAgregatorImages from './useAgregatorImages';

type Media = 'image' | 'sticker';

export interface MediaPickerProps
  extends Pick<ExpandingPickerRenderItemProps<Media>, 'title'> {}

interface OptionProps {
  type: Media;
}

const getIcon = (type: Media, color: string) => {
  switch (type) {
    case 'image':
      return <Image color={color} style={{ width: 25 }} />;
    // case 'sticker':
    //   return <Eraser color={color} />;
  }
};

const Option: FC<OptionProps> = ({ type }) => {
  const theme = useContext(ThemeContext);
  const { images, loadMoreImages } = useAgregatorImages();
  const handleClick = () => {
    switch (type) {
      case 'image':
        if (images.length <= 0) {
          loadMoreImages();
        }
    }
  };
  return (
    <Circle onClick={handleClick}>
      {getIcon(type, theme.style.iconsColor)}
    </Circle>
  );
};

const renderItem: ExpandingPickerRenderItem<Media> = ({ value }) => {
  return <Option type={value} />;
};

const values: Media[] = ['image'];

const MediaFilePicker: FC<MediaPickerProps> = ({ ...rest }) => {
  return <ExpandingPicker values={values} renderItem={renderItem} {...rest} />;
};

export default MediaFilePicker;
