import styled from '@emotion/styled';

export const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
});

export const IconButton = styled.button({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
});

export const Redo = styled(IconButton)({
  transform: 'scale(-1, 1)',
});
