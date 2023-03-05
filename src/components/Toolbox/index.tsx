import { FC, PropsWithChildren, ReactElement, useContext } from 'react';
import ThemeContext from 'stores/ThemeStore';
import ColorPicker, { ColorPickerProps } from './ColorPicker';
import LineWidthPicker, { LineWidthPickerProps } from './LineWidthPicker';
import RedrawConrols, { RedrawControlsProps } from './RedrawControls';
import Settings, { SettingsProps } from './Settings';
import { Container, Divider, LeftPanel, RightPanel } from './styles';
import BrushPicker, { BrushPickerProps } from './BrushPicker';

type Child = ReactElement<
  | BrushPickerProps
  | RedrawControlsProps
  | ColorPickerProps
  | LineWidthPickerProps
>;

interface ToolboxComponent extends FC<PropsWithChildren<ToolboxProps>> {
  BrushPicker: FC<BrushPickerProps>;
  RedrawControls: FC<RedrawControlsProps>;
  ColorPicker: FC<ColorPickerProps>;
  LineWidthPicker: FC<LineWidthPickerProps>;
}
interface ToolboxProps extends SettingsProps {
  children?: Child | Child[];
}

const Toolbox: ToolboxComponent = ({ children, ...rest }) => {
  const theme = useContext(ThemeContext);
  const divider = <Divider theme={theme.style} />;
  return (
    <Container>
      <LeftPanel>
        {Array.isArray(children)
          ? children.map((child) => (
              <>
                {child}
                {divider}
              </>
            ))
          : children}
      </LeftPanel>
      <RightPanel>
        <Settings {...rest} />
      </RightPanel>
    </Container>
  );
};

Toolbox.BrushPicker = BrushPicker;
Toolbox.RedrawControls = RedrawConrols;
Toolbox.ColorPicker = ColorPicker;
Toolbox.LineWidthPicker = LineWidthPicker;

export default Toolbox;
