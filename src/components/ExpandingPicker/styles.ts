import styled from '@emotion/styled';

export const OptionsList = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginTop: 5,
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

export const Container = styled.div({
  padding: '5px 5px 10px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});
