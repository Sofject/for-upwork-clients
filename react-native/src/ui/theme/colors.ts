export const colors = {
  light: {
    mode: 'light',
    primary: '#0A7B4D',
    primaryHighlight: '#18BC79',
    primaryFocused: '#f0fdf4',

    secondary: '#E5E7EB',
    secondaryHighlight: '#D1D5DB',

    transparentHighlight: 'rgba(0,0,0,0.08)',
    transparent04: 'rgba(0,0,0,0.4)',

    background: '#ffffffff',

    text: '#000000',
    textBody: '#636363',
    placeholderText: '#aaa',

    inputBackground: '#F8F8F9',
    inputBorder: '#d8dadeff',
    headerBackground: '#F0F0F0',

    card: '#F3F4F6',

    tabIconInactive: '#9CA3AF',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E5E7EB',

    avatarBg: '#E5E7EB', // light
    avatarText: '#374151',

    skeletonBg: 'rgba(0, 0, 0, 0.2)', // subtle gray background
    skeletonHighlight: 'rgba(0, 0, 0, 0.1)', // slightly brighter moving highlight
  },
  dark: {
    mode: 'dark',
    primary: '#0A7B4D',
    primaryHighlight: '#075A38',
    primaryFocused: '#f0fdf4',

    secondary: '#1F2937',
    secondaryHighlight: '#374151',

    transparentHighlight: 'rgba(255,255,255,0.08)',

    background: '#0D0F10',

    text: '#F8FAFC',
    textBody: '#bababaff',
    placeholderText: '#aaa',

    inputBackground: '#3b3b3bff',
    inputBorder: '#989898',
    headerBackground: '#1A1D1F',

    card: '#1E293B',

    tabIconInactive: '#bac1d1ff',
    tabBar: '#14181B',
    tabBarBorder: 'rgba(255,255,255,0.06)',

    avatarBg: '#1F2937',
    avatarText: '#E5E7EB',

    skeletonBg: 'rgba(255, 255, 255, 0.08)',
    skeletonHighlight: 'rgba(255, 255, 255, 0.1)',
  },
  amoled: {
    mode: 'amoled',
    primary: '#0A7B4D',
    primaryHighlight: '#18BC79',
    background: '#000000',
    text: '#FFFFFF',
    card: '#0A0A0A',
    tabIconInactive: '#6B7280',
    tabBar: '#141617',
    tabBarBorder: '#141617',
  },
};

export const commonColors = {
  success: '#22C55E',
  error: '#EF4444',
  errorHighlight: '#fef2f2',
  warning: '#F59E0B',
  info: '#3B82F6',
  overlay: 'rgba(0,0,0,0.02)',
  backdrop: 'rgba(0,0,0,1)',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  red: '#FF4D4D',
  orange: '#FFB84D',
  blue: '#59B2E6',
  purple: '#4A5C9A',

  facebook: '#1877F2',
  google: '#DB4437',
};

export type ColorName = keyof typeof colors;
export type ColorType = typeof colors.light;
