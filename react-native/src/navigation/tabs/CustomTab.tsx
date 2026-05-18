// @ts-nocheck

import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useThemedStyles } from '@hooks';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { CENTER_BUTTON_OVERSHOOT, createStyles } from './styles';
import TabIcon from './TabIcon';
import { TABS } from './tabs.config';
import { useOptionalTabBarVisibility } from './TabBarVisibilityContext';

const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const styles = useThemedStyles(createStyles);
  const tabBarVisibility = useOptionalTabBarVisibility();

  const leftTabs = TABS.filter(t => t.position === 'left');
  const rightTabs = TABS.filter(t => t.position === 'right');
  const centerTab = TABS.find(t => t.isCenter);

  const navigateTo = (key: string) => {
    navigation.navigate(key);
  };

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = tabBarVisibility
      ? withTiming(tabBarVisibility.tabBarTranslateY.value, { duration: 180 })
      : 0;
    return { transform: [{ translateY }] };
  }, [tabBarVisibility]);

  return (
    <Animated.View
      style={[styles.tabContainer, animatedStyle]}
      onLayout={e => {
        if (!tabBarVisibility) return;
        const height = e.nativeEvent.layout.height + CENTER_BUTTON_OVERSHOOT;
        tabBarVisibility.tabBarHeight.value = height;
        if (tabBarVisibility.tabBarHeightState !== height) {
          tabBarVisibility.setTabBarHeightState(height);
        }
      }}
    >
      <View style={styles.tabWrapper}>
        <View style={styles.container}>
          {/* LEFT */}
          <View style={styles.left}>
            {leftTabs.map(tab => {
              const focused = state.index === state.routeNames.indexOf(tab.key);

              return (
                <TouchableOpacity
                  key={tab.key}
                  onPress={() => navigateTo(tab.key)}
                  style={styles.icon}
                >
                  <TabIcon routeName={tab.key} focused={focused} />
                </TouchableOpacity>
              );
            })}
          </View>

          {/* CENTER */}
          <View style={styles.centerWrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate(centerTab!.key as any)}
              style={styles.centerTouchable}
            >
              <TabIcon routeName={centerTab!.key} focused={false} />
            </TouchableOpacity>
          </View>

          {/* RIGHT */}
          <View style={styles.right}>
            {rightTabs.map(tab => {
              const focused = state.index === state.routeNames.indexOf(tab.key);
              return (
                <TouchableOpacity
                  key={tab.key}
                  onPress={() => navigateTo(tab.key)}
                  style={styles.icon}
                >
                  <TabIcon routeName={tab.key} focused={focused} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default CustomTabBar;
