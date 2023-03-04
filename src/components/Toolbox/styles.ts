import styled from '@emotion/styled';
import { ThemeObject } from '../../stores/ThemeStore';

interface Themed {
  theme: ThemeObject;
}

export const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const LeftPanel = styled.div({
  display: 'flex',
});

export const RightPanel = styled.div({});

export const Divider = styled.div<Themed>(({ theme }) => ({
  width: '2px',
  backgroundColor: theme.iconsColor,
  margin: '0 5px',
}));
