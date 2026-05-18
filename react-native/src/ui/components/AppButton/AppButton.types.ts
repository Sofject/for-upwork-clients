// @ts-nocheck

import {
  ImageSourcePropType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { IAppPressableProps } from '../AppPressable/AppPressable.types';

export enum BUTTON_TYPE {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  TRANSPARENT = 'TRANSPARENT',
  DANGER = 'DANGER',
}

export enum BUTTON_SIZE {
  LARGE = 'LARGE',
  MEDIUM = 'MEDIUM',
  SMALL = 'SMALL',
}

export interface IAppButtonProps extends IAppPressableProps {
  title: string;
  type?: BUTTON_TYPE;
  size?: BUTTON_SIZE;
  icon?: ImageSourcePropType;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
}
