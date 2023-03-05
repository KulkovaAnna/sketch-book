import styled from '@emotion/styled';

interface ColorProps {
  color: string;
}

export const ColorCircle = styled.div<ColorProps>(({ color }) => ({
  borderRadius: '50%',
  height: 40,
  width: 40,
  backgroundColor: color,
  margin: '0 5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
}));
