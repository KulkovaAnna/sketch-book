import React, { FC, PropsWithChildren } from 'react';

import ThemeContext, { ThemeStore } from 'stores/ThemeStore';

const theme = new ThemeStore();

const ThemeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeLayout;
