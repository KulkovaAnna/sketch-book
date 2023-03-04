import styled from '@emotion/styled';
import { ThemeObject } from '../../stores/ThemeStore';

interface Props {
  theme: ThemeObject;
}

export const Container = styled.div<Props>(({ theme }) => ({
  backgroundColor: theme.bacgroundColor,
  width: '100%',
  height: '100%',
  position: 'relative',
  color: theme.fontColor,
}));

export const ToolboxContainer = styled.div<Props>(({ theme }) => ({
  width: '100%',
  position: 'fixed',
  padding: 5,
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  left: 0,
  top: 0,
  zIndex: 10,
  backgroundColor: theme.bacgroundColor,
  overflowX: 'auto',
}));
