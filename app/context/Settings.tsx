import React, { createContext, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

export const SettingsContext = createContext<any>(null);

export function SettingContextProvider({ children }: any) {
  const [modernMinFare, setModernMinFare] = useState<any>();

  async function fetchAppSettings() {
    await firestore()
      .collection('App Settings')
      .doc('Fare')
      .get()
      .then((DocumentSnapshot: any) => {
        if (DocumentSnapshot.exists) {
          setModernMinFare(DocumentSnapshot._data.modern_jeep_min);
        }
      });
  }

  return (
    <SettingsContext.Provider
      value={{ modernMinFare, setModernMinFare, fetchAppSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
