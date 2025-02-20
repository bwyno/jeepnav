import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mapSearchView: {
    backgroundColor: '#242F3E',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  bottomControls: {
    left: 10,
    right: 10,
    height: 100,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 25,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
  },
  switchView: {
    position: 'absolute',
    alignContent: 'flex-start',
    margin: 20,
    left: 0,
    bottom: 0,
    height: 40,
    width: 185,
    backgroundColor: 'white',
    borderRadius: 25,
  },
  switch: {
    position: 'absolute',
    left: 10,
    bottom: 5,
  },
  switchText: {
    position: 'absolute',
    left: 60,
    bottom: 10,
  },
  origin: {
    right: 0,
    padding: 10,
    flex: 1,
    zIndex: 10,
    width: '85%',
    position: 'absolute',
    opacity: 0.8,
  },
  destination: {
    right: 0,
    padding: 10,
    flex: 1,
    zIndex: 3,
    top: 50,
    width: '85%',
    position: 'absolute',
    opacity: 0.8,
  },
  searchBar: {
    height: 170,
    width: '100%',
    backgroundColor: '#441877',
    zIndex: 1,
    opacity: 1,
  },
  searchButton: {
    position: 'absolute',
    top: 105,
    right: 0,
    zIndex: 2,
    padding: 10,
  },
  swapButton: {
    position: 'absolute',
    top: 18,
    left: 0,
    zIndex: 2,
  },
  swapButtonStyle: {
    borderRadius: 10,
    width: 57,
  },
  banner: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 2,
  },
  routesHeader: {
    color: 'tomato',
    fontSize: 40,
  },
  routeItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'tomato',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'tomato',
  },
  duration: {
    color: 'white',
  },
  emptyRouteList: {
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  emptyRouteListText: {
    color: 'white',
  },
  expandedList: {
    marginTop: 10,
    marginBottom: 10,
  },
  stepText: {
    width: '20%',
    color: 'tomato',
  },
  stepView: {
    flexDirection: 'row',
    columnGap: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  stepInstruction: {
    width: '50%',
    color: 'white',
  },
  stepFare: {
    width: '10%',
    color: 'tomato',
  },
  routeContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  items: {
    marginTop: 20,
    marginBottom: 20,
  },
  screenView: {
    height: '100%',
  },
  welcomeText: {
    fontSize: 70,
    fontStyle: 'italic',
  },
  bannerView: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginHeader: {
    fontSize: 30,
    marginBottom: 20,
  },
  logInForm: {
    width: 200,
    borderWidth: 1,
    borderRadius: 25,
    padding: 20,
    margin: 5,
  },
  errorMsgAuth: {
    color: 'red',
  },
  markerView: {
    backgroundColor: 'pink',
    padding: 4,
    borderRadius: 25,
  },
  disclaimerContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    marginBottom: 20,
  },
  articleContainer: {
    marginBottom: 20,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  articleContent: {
    fontSize: 14,
  },
  closing: {
    marginTop: 20,
    fontStyle: 'italic',
  },
  disclaimerScrollView: {
    marginHorizontal: 20,
  },
  agreeButtonContainer: {
    padding: 10,
    width: 100,
    height: 80,
    alignSelf: 'center',
  },
  filterButton: {
    color: 'white',
  },
});
