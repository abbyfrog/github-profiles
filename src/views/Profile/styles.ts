import { CSSProperties } from 'react';
import { padding } from '../../styles';

export const styles: Record<string, CSSProperties> = {
  avatar: {
    width: 96,
    height: 96,
  },
  card: {
    display: 'flex',
    padding: padding.md,
  },
  listPadding: {
    paddingTop: padding.sm,
    paddingBottom: padding.sm,
  },
  splitRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
};
