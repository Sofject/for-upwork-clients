// @ts-nocheck

import { Platform } from 'react-native';
import { IS_ANDROID, IS_IOS } from '@constants';
import messaging from '@react-native-firebase/messaging';
import { requestNotifications } from 'react-native-permissions';
import notifee, { AndroidImportance } from '@notifee/react-native';

export async function requestNotificationPermission(): Promise<boolean> {
  if (IS_IOS) {
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  }

  if (IS_ANDROID && Number(Platform.Version) >= 33) {
    const { status } = await requestNotifications(['alert', 'sound', 'badge']);
    return status === 'granted';
  }

  return true;
}

export async function getFCMToken(): Promise<string | null> {
  try {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) return null;

    const token = await messaging().getToken();
    console.log('[FCM] Device Token:', token);
    return token;
  } catch (error) {
    console.error('[FCM] Error getting token:', error);
    return null;
  }
}

export async function onDisplayNotification(remoteMessage: any) {
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    title: remoteMessage.notification?.title || 'Notification',
    body: remoteMessage.notification?.body || '',
    android: {
      channelId,
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}

export function setupNotificationListeners() {
  // Foreground message handler
  const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
    console.log('[FCM] Foreground Message:', remoteMessage);
    await onDisplayNotification(remoteMessage);
  });

  // Background/Quit state opened notification handler
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('[FCM] Notification caused app to open from background state:', remoteMessage);
    // Handle navigation here if needed
  });

  // Check if app was opened from a quit state
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('[FCM] Notification caused app to open from quit state:', remoteMessage);
      }
    });

  return () => {
    unsubscribeForeground();
  };
}
