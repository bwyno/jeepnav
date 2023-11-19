import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Banner, Button, Icon, IconButton } from 'react-native-paper';

import { RouteContext } from '../../context/Route';
import { styles } from '../../style/index';
import { GOOGLE_API_KEY } from '../../constants';

export default function Search() {
  const apiKey = GOOGLE_API_KEY;
  console.log(apiKey);

  function icon(size: number) {
    return <Icon source="alert-circle-outline" size={size} color="red" />;
  }

  const {
    setDestination,
    setOrigin,
    getRoute,
    routeErrorMsg,
    visible,
    setVisible,
  } = useContext(RouteContext);
  return (
    <>
      <SafeAreaView style={styles.origin}>
        <GooglePlacesAutocomplete
          ref={instance => {
            this.GooglePlacesRef = instance;
          }}
          placeholder="Enter Origin"
          fetchDetails
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
            setOrigin({ ...data, ...details });
          }}
          query={{
            key: apiKey,
            language: 'en',
            components: 'country:ph',
            radius: 33000,
            location: '10.3157, 123.8854',
          }}
          onFail={error => {
            console.log(error);
          }}
          styles={{
            container: {
              width: '100%',
              zIndex: 1,
            },
            listView: {
              width: '90%',
            },
            textInputContainer: {
              width: '100%',
            },
            textInput: {
              width: '100%',
            },
          }}
          renderRightButton={() => (
            <IconButton
              icon="close-thick"
              size={20}
              iconColor="red"
              onPress={() => {
                setOrigin();

                this.GooglePlacesRef.clear();
              }}
            />
          )}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.destination}>
        <GooglePlacesAutocomplete
          ref={instance => {
            this.GooglePlacesRef2 = instance;
          }}
          placeholder="Enter Destination"
          fetchDetails
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
            setDestination({ ...data, ...details });
          }}
          query={{
            key: apiKey,
            language: 'en',
            components: 'country:ph',
            radius: 33000,
            location: '10.3157, 123.8854',
          }}
          onFail={error => {
            console.log(error);
          }}
          styles={{
            container: {
              width: '100%',
              zIndex: 2,
            },
            listView: {
              width: '90%',
            },
            textInputContainer: {
              width: '100%',
            },
            textInput: {
              width: '100%',
            },
          }}
          renderRightButton={() => (
            <IconButton
              icon="close-thick"
              size={20}
              iconColor="red"
              onPress={() => {
                setDestination();

                this.GooglePlacesRef2.clear();
              }}
            />
          )}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.searchBar} />
      <SafeAreaView style={styles.searchButton}>
        <Button icon="map-search" mode="contained" onPress={() => getRoute()}>
          Find route
        </Button>
      </SafeAreaView>
      <Banner
        style={styles.banner}
        visible={visible}
        actions={[
          {
            label: 'Fix it',
            onPress: () => setVisible(false),
          },
          {
            label: 'Learn more',
            onPress: () => setVisible(false),
          },
        ]}
        icon={({ size }) => icon(size)}>
        {routeErrorMsg}
      </Banner>
    </>
  );
}
