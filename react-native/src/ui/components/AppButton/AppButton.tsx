// @ts-nocheck

import React, { memo, useState } from 'react';
import { Image } from 'react-native';
import { LoaderKitView } from 'react-native-loader-kit';
import { AppPressable, AppText, TextVariant } from '@components';
import { buttonStyles, sizeStyles } from './AppButton.helpers';
import styles from './AppButton.styles';
import { BUTTON_SIZE, BUTTON_TYPE, IAppButtonProps } from './AppButton.types';

export const AppButton: React.FC<IAppButtonProps> = memo(
  ({
    title,
    type = BUTTON_TYPE.PRIMARY,
    size = BUTTON_SIZE.LARGE,
    icon,
    buttonStyle,
    disabled,
    onPress,
    textStyle,
    isLoading,
    ...rest
  }) => {
    const baseColor = buttonStyles[type].base.backgroundColor;
    return (
      <AppPressable
        disabled={isLoading || disabled}
        onPress={onPress}
        style={[
          styles.button,
          buttonStyles[type].base,
          sizeStyles[size],
          { backgroundColor: baseColor },
          buttonStyle,
        ]}
        {...rest}
      >
        {isLoading && (
          <LoaderKitView
            style={styles.loader}
            name={'BallClipRotateMultiple'}
            color={buttonStyles[type].text}
          />
        )}
        {icon && <Image source={icon} style={styles.icon} />}
        {title ? (
          <AppText
            variant={TextVariant.Subtitle}
            style={textStyle}
            // fontWeight={600}
            color={buttonStyles[type].text}
          >
            {title}
          </AppText>
        ) : (
          <></>
        )}
      </AppPressable>
    );
  },
);

AppButton.displayName = 'AppButton';
