// @ts-nocheck

import React, { useState } from 'react';
import { LayoutAnimation, Platform, StyleSheet, UIManager, View } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { AppPressable, AppText, TextVariant } from '@components';
import { COLORS } from '@theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AppAccordionProps {
  title: string;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
}

export const AppAccordion: React.FC<AppAccordionProps> = ({
  title,
  children,
  initiallyExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <AppPressable style={styles.header} onPress={toggleExpand}>
        <AppText variant={TextVariant.Subtitle} style={styles.title}>
          {title}
        </AppText>
        <MaterialDesignIcons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={COLORS.text}
        />
      </AppPressable>
      {expanded && <View style={styles.content}>{children}</View>}
    </View>
  );
};
