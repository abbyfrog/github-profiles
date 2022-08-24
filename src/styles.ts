import { CSSProperties } from 'react';

export const padding = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 32,
  xl: 64,
};

export const styles: Record<string, CSSProperties> = {
  splitRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    padding: padding.lg,
  },
};
