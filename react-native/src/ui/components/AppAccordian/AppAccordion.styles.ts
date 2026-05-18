// @ts-nocheck

import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '@theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  title: {
    fontFamily: 'Manrope-Bold',
    flex: 1,
    textAlign: 'left',
  },
  content: {
    padding: SPACING.lg,
    paddingTop: 0,
  },
});
