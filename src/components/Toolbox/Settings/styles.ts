import styled from '@emotion/styled';

export const Container = styled.div({
  position: 'relative',
  width: 60,
  height: 40,
  display: 'flex',
  justifyContent: 'center',
});

export const Dropdown = styled.div({
  position: 'fixed',
  top: 75,
  right: 10,
  padding: '10px 5px 0',
  boxShadow: '-2px 4px 10px rgba(0, 0, 0, 0.2)',
  borderRadius: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const IconButton = styled.button({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  marginBottom: 5,
});

export const Line = styled.div({
  height: 1,
  width: '100%',
  marginBottom: 5,
  borderRadius: 4,
});
