import { FC } from 'react';
import { Container, Datalist, Input, Marker } from './styles';

interface Props {
  min: number;
  max: number;
  step: number;
  onChange?(value: number): void;
}

const RangeInput: FC<Props> = ({ max, min, step, onChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    onChange?.(+ev.target.value);
  };

  const values = getDataSet(min, max);

  return (
    <Container>
      <Input
        type="range"
        min={min}
        max={max}
        onChange={handleChange}
        step={step}
        list="markers"
      />
      <Datalist id="markers">
        {values.map((val) => (
          <Marker key={val} value={val} label={val.toString()} />
        ))}
      </Datalist>
    </Container>
  );
};

export default RangeInput;

const getDataSet = (min: number, max: number) => {
  const res: number[] = [];
  for (let i = min; i <= max; i++) {
    res.push(i);
  }
  return res;
};
