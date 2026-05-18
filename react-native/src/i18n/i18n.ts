// @ts-nocheck

import { I18nManager } from 'react-native';
import { LANGUAGE_KEY } from '@config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import RNRestart from 'react-native-restart';
import ar from './locales/ar.json';
import en from './locales/en.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

const applyRTL = (lang: string) => {
  const isRTL = lang === 'ar';

  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    // ⚠️ App restart required for full RTL effect
    RNRestart.Restart();
  }
};

export const loadLanguage = async (): Promise<string> => {
  try {
    const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);

    if (savedLang) {
      applyRTL(savedLang);
      return savedLang;
    }

    // fallback to device language
    const deviceLang = RNLocalize.getLocales()[0]?.languageCode || 'en';
    const fallbackLang = deviceLang === 'ar' ? 'ar' : 'en';

    await AsyncStorage.setItem(LANGUAGE_KEY, fallbackLang);
    applyRTL(fallbackLang);

    return fallbackLang;
  } catch (error) {
    console.warn('Language load failed:', error);
    return 'en';
  }
};

export const initI18n = async () => {
  const lang = await loadLanguage();

  await i18n.use(initReactI18next).init({
    resources,
    lng: lang,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

  return i18n;
};

export default i18n;
