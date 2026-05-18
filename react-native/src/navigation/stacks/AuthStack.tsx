// @ts-nocheck

import React from 'react';
import { useAppSelector } from '@hooks';
import { screenoptions } from '@navigation/navigation.config';
import { ROOT_PAGE_URL } from '@navigation/navigation.types';
import DevStack from '@navigation/Stacks/DevStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { selectIsFirstLaunch } from '@features/app';
import {
  AccountVerifyScreen,
  CreateAccountScreen,
  ForgetPasswordScreen,
  LoginScreen,
  OnboardingScreen,
} from '@features/auth/screens';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const isFirstLaunch = useAppSelector(selectIsFirstLaunch);

  const initialScreen = !isFirstLaunch
    ? ROOT_PAGE_URL.Onboarding
    : ROOT_PAGE_URL.Login;

  return (
    <Stack.Navigator
      screenOptions={screenoptions}
      initialRouteName={initialScreen}
    >
      <Stack.Screen
        name={ROOT_PAGE_URL.Onboarding}
        component={OnboardingScreen}
      />
      <Stack.Screen name={ROOT_PAGE_URL.Login} component={LoginScreen} />
      <Stack.Screen
        name={ROOT_PAGE_URL.CreateAccount}
        component={CreateAccountScreen}
      />
      <Stack.Screen
        name={ROOT_PAGE_URL.ForgetPassword}
        component={ForgetPasswordScreen}
      />
      <Stack.Screen
        name={ROOT_PAGE_URL.AccountVerify}
        component={AccountVerifyScreen}
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

export default AuthStack;
