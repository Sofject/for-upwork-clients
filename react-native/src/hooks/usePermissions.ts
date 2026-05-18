// @ts-nocheck

import { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import { PERMISSION_TYPE, PermissionValue } from '@constants';
import {
  check,
  openSettings,
  Permission,
  PERMISSIONS,
  request,
  requestMultiple as requestMultipleNative,
  RESULTS,
} from 'react-native-permissions';

const PLATFORM_MAP: Record<PermissionValue, Permission | undefined> = {
  [PERMISSION_TYPE.CAMERA]: Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  }),
  [PERMISSION_TYPE.MICROPHONE]: Platform.select({
    ios: PERMISSIONS.IOS.MICROPHONE,
    android: PERMISSIONS.ANDROID.RECORD_AUDIO,
  }),
  [PERMISSION_TYPE.LOCATION]: Platform.select({
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  }),
  [PERMISSION_TYPE.GALLERY]: Platform.select({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android:
      Platform.OS === 'android' && Platform.Version >= 33
        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  }),
};

export const usePermissions = () => {
  const [permissionStatus, setPermissionStatus] = useState<
    Record<string, boolean>
  >({});
  const [modalVisible, setModalVisible] = useState(false);
  const [activeType, setActiveType] = useState<PermissionValue | null>(null);

  const requestPermission = useCallback(async (type: PermissionValue) => {
    const permission = PLATFORM_MAP[type];
    if (!permission) return false;

    // 1. Check current status first
    const currentStatus = await check(permission);

    if (currentStatus === RESULTS.GRANTED) {
      setPermissionStatus(prev => ({ ...prev, [type]: true }));
      return true;
    }

    // 2. If blocked, show modal immediately (request() won't trigger a popup)
    if (currentStatus === RESULTS.BLOCKED) {
      setActiveType(type);
      setModalVisible(true);
      return false;
    }

    // 3. Otherwise, request it
    const result = await request(permission);
    const isGranted = result === RESULTS.GRANTED;

    setPermissionStatus(prev => ({ ...prev, [type]: isGranted }));

    // If they denied it now, or it became blocked
    if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
      setActiveType(type);
      setModalVisible(true);
    }

    return isGranted;
  }, []);

  const requestMultiple = useCallback(async (types: PermissionValue[]) => {
    const resultsMap: Record<string, boolean> = {};
    const permissionsToRequest: Permission[] = [];
    let firstBlocked: PermissionValue | null = null;

    // 1. Check all statuses first
    for (const type of types) {
      const permission = PLATFORM_MAP[type];
      if (!permission) continue;

      const status = await check(permission);

      if (status === RESULTS.GRANTED) {
        resultsMap[type] = true;
      } else {
        if (status === RESULTS.BLOCKED && !firstBlocked) firstBlocked = type;
        permissionsToRequest.push(permission);
      }
    }

    // 2. If some need requesting and none are blocked yet
    if (permissionsToRequest.length > 0 && !firstBlocked) {
      const nativeResults = await requestMultipleNative(permissionsToRequest);

      types.forEach(type => {
        const p = PLATFORM_MAP[type];
        if (p && nativeResults[p]) {
          const status = nativeResults[p];
          resultsMap[type] = status === RESULTS.GRANTED;
          if (
            (status === RESULTS.BLOCKED || status === RESULTS.DENIED) &&
            !firstBlocked
          ) {
            firstBlocked = type;
          }
        }
      });
    }

    setPermissionStatus(prev => ({ ...prev, ...resultsMap }));

    // 3. Trigger modal if anything ended up blocked/denied
    if (firstBlocked) {
      setActiveType(firstBlocked);
      setModalVisible(true);
    }

    return {
      allGranted: types.every(t => resultsMap[t] === true),
      results: resultsMap,
    };
  }, []);

  const goToSettings = useCallback(() => {
    setModalVisible(false);
    openSettings().catch(() => console.warn('Cannot open settings'));
  }, []);

  return {
    requestMultiple,
    requestPermission,
    permissionStatus,
    modalVisible,
    setModalVisible,
    activeType,
    goToSettings,
  };
};
