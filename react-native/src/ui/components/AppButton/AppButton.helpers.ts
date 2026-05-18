// @ts-nocheck

import { ViewStyle } from 'react-native';
import { COLORS } from '@theme';
import { BUTTON_SIZE, BUTTON_TYPE } from './AppButton.types';

export type ButtonStyleConfig = {
  base: ViewStyle;
  highlight: string;
  text: string;
};

export const buttonStyles: Record<BUTTON_TYPE, ButtonStyleConfig> = {
  [BUTTON_TYPE.PRIMARY]: {
    base: { backgroundColor: COLORS.primary },
    highlight: COLORS.primaryHighlight,
    text: COLORS.white,
  },
  [BUTTON_TYPE.SECONDARY]: {
    base: { backgroundColor: COLORS.secondary },
    highlight: COLORS.secondaryHighlight,
    text: COLORS.text,
  },
  [BUTTON_TYPE.TRANSPARENT]: {
    base: {
      backgroundColor: COLORS.transparent,
      borderWidth: 1,
      borderColor: COLORS.textBody,
    },
    highlight: COLORS.transparentHighlight,
    text: COLORS.textBody,
  },
  [BUTTON_TYPE.DANGER]: {
    base: {
      backgroundColor: COLORS.transparent,
      borderWidth: 1,
      borderColor: COLORS.error,
    },
    highlight: COLORS.secondaryHighlight,
    text: COLORS.error, // red text color for danger
  },
};

export const sizeStyles: Record<BUTTON_SIZE, ViewStyle> = {
  [BUTTON_SIZE.SMALL]: { width: '25%' },
  [BUTTON_SIZE.MEDIUM]: { width: '50%' },
  [BUTTON_SIZE.LARGE]: { width: '100%' },
};
