// @ts-nocheck

import { StyleSheet } from 'react-native';
import { ms, RADIUS, SPACING } from '@theme';

export default StyleSheet.create({
  button: {
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: ms(46),
    marginVertical: SPACING.sm,
  },
  title: {
    textAlign: 'center',
  },
  icon: {
    marginRight: SPACING.sm,
  },
  loader: { width: ms(25), height: ms(25), marginRight: ms(12) },
});
