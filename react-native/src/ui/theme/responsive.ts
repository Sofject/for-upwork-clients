// @ts-nocheck

import { Dimensions } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

export const BREAKPOINTS = {
  SMALL_PHONE: 360, // Android small, iPhone SE
  PHONE: 390, // Default baseline (iPhone 12)
  LARGE_PHONE: 430, // iPhone Pro Max, S-series
  TABLET: 600, // iPad Mini / big tablets
};

// Category detection
export const DEVICE = (() => {
  if (width < BREAKPOINTS.SMALL_PHONE) return 'small_phone';
  if (width < BREAKPOINTS.PHONE) return 'phone';
  if (width < BREAKPOINTS.LARGE_PHONE) return 'large_phone';
  if (width < BREAKPOINTS.TABLET) return 'phablet';
  return 'tablet';
})();

export const s = (size: number) => scale(size); // horizontal scaling
export const vs = (size: number) => verticalScale(size); // vertical scaling
export const ms = (size: number, factor = 0.4) => moderateScale(size, factor); // balanced scaling

export const SPACING = {
  /** 4px */
  xs: ms(4),
  /** 8px */
  sm: ms(8),
  /** 12px */
  md: ms(12),
  /** 16px */
  lg: ms(16),
  /** 24px */
  xl: ms(24),
  /** 32px */
  xxl: ms(32),
};

// RADIUS (scaled)
export const RADIUS = {
  /** 4px - Extra Small */
  xs: ms(4),
  /** 8px - Small */
  sm: ms(8),
  /** 10px - Regular */
  md: ms(10),
  /** 14px - Medium/Large */
  lg: ms(14),
  /** 18px - Extra Large */
  xl: ms(18),
  /** 30px - Extra Extra Large */
  xxl: ms(30),
  /** Rounded/Pill */
  full: 9999,
};

export const COMPONENT = {
  BUTTON_HEIGHT: ms(48),
  INPUT_HEIGHT: ms(50),
  ICON: ms(20),
  ICON_LG: ms(28),
};

export const TABLET_MAX_FEED_WIDTH = 550;

export const SCREEN = {
  width,
  height,
  isSmall: DEVICE === 'small_phone',
  isPhone: DEVICE === 'phone' || DEVICE === 'large_phone',
  isTablet: DEVICE === 'tablet',
  feedWidth:
    DEVICE === 'tablet' ? Math.min(width, TABLET_MAX_FEED_WIDTH) : width,
};

export const HEADER_HEIGHT = ms(60);
