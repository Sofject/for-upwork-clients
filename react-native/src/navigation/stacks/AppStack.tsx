// @ts-nocheck

import React from 'react';
import { screenoptions } from '@navigation/navigation.config';
import { ROOT_PAGE_URL } from '@navigation/navigation.types';
import Tabs from '@navigation/Tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateAccountScreen, ForgetPasswordScreen } from '@features/auth/screens';
import { FavoritesScreen } from '@features/favorites';
import { RecipeDetailScreen } from '@features/posts/screens';
import { FollowingScreen, ProfileScreen } from '@features/profile/screens';
import {
  ChangePasswordScreen,
  CommunityGuidelinesScreen,
  CookiePolicyScreen,
  EditProfileScreen,
  IntellectualPropertyScreen,
  LanguageScreen,
  MeasurementSystemScreen,
  BlockedAccountsScreen,
  PrivacyPolicyScreen,
  TermsAndConditionsScreen,
} from '@features/settings/screens';
import DevStack from './DevStack';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={screenoptions}>
      <Stack.Screen
        name={ROOT_PAGE_URL.Home}
        component={Tabs}
      />
      <Stack.Screen
        name={ROOT_PAGE_URL.PostDetails}
        component={RecipeDetailScreen}
      />
      <Stack.Screen
        name={ROOT_PAGE_URL.Language}
        component={LanguageScreen}
      />
      <Stack.Screen
        name={ROOT_PAGE_URL.EditProfile}
        component={EditProfileScreen}
      />
      <Stack.Screen
        name={ROOT_PAGE_URL.MeasurementSystem}
        component={MeasurementSystemScreen}
      />
      <Stack.Screen
        name={ROOT_PAGE_URL.BlockedAccounts}
        component={BlockedAccountsScreen}
      />
      <Stack.Screen
        name={ROOT_PAGE_URL.TermsAndConditions}
        component={TermsAndConditionsScreen}
      />
      <Stack.Screen
        name={ROOT_PAGE_URL.CommunityGuidelines}
        component={CommunityGuidelinesScreen}
      />
      <Stack.Screen
        name={ROOT_PAGE_URL.CookiePolicy}
        component={CookiePolicyScreen}
      />
      <Stack.Screen
        name={ROOT_PAGE_URL.IntellectualProperty}
        component={IntellectualPropertyScreen}
      />
      <Stack.Screen
        name={ROOT_PAGE_URL.PrivacyPolicy}
        component={PrivacyPolicyScreen}
      />
      <Stack.Screen
        name={ROOT_PAGE_URL.ForgetPassword}
        component={ForgetPasswordScreen}
      />
      <Stack.Screen
        name={ROOT_PAGE_URL.CreateAccount}
        component={CreateAccountScreen}
      />
      <Stack.Screen
        name={ROOT_PAGE_URL.ChangePassword}
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name={ROOT_PAGE_URL.Following}
        component={FollowingScreen}
      />
      <Stack.Screen
        name={ROOT_PAGE_URL.Favorites}
        component={FavoritesScreen}
      />
      <Stack.Screen
        name={ROOT_PAGE_URL.UserProfile}
        component={ProfileScreen}
      />
      {/* Dev screens nested */}
      {__DEV__ && (
        <Stack.Screen
          name="DevStack"
          component={DevStack}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppStack;
