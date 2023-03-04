import styled from '@emotion/styled';

export const Container = styled.div({
  padding: '10px 5px',
  display: 'flex',
  alignItems: 'center',
});

export const CloseButton = styled.button({
  width: 20,
  height: 20,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 5,
  backgroundColor: 'transparent',
  border: '1px solid black',
  padding: 5,
  cursor: 'pointer',
});
