import { CSSProperties, FC } from 'react';
import { Container } from './styles';

interface Props {
  x: number;
  y: number;
  radius: number;
}

const EraserIndicator: FC<Props> = ({ x, y, radius }) => {
  const diameter = radius * 2;
  const style: CSSProperties = {
    width: diameter,
    height: diameter,
    left: x,
    top: y,
    marginLeft: -radius,
    marginTop: -radius,
  };
  return <Container style={style} />;
};

export default EraserIndicator;
