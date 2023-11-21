import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
  origin: {
    padding: 10,
    flex: 1,
    zIndex: 4,
    width: '100%',
    position: 'absolute',
    opacity: 0.8,
  },
  destination: {
    padding: 10,
    flex: 1,
    zIndex: 3,
    top: 50,
    width: '100%',
    position: 'absolute',
    opacity: 0.8,
  },
  searchBar: {
    position: 'absolute',
    height: 170,
    width: '100%',
    backgroundColor: '#435585',
    zIndex: 1,
    opacity: 0.5,
  },
  searchButton: {
    position: 'absolute',
    top: 105,
    zIndex: 2,
    padding: 10,
  },
  banner: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 2,
  },
  routeItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  expandedList: {
    marginTop: 10,
    marginBottom: 10,
  },
  stepText: {
    marginLeft: 10,
    width: 80,
  },
  stepView: {
    flexDirection: 'row',
    padding: 10,
  },
  stepInstruction: {
    width: 170,
  },
  stepFare: {
    marginLeft: 70,
    width: 40,
  },
  routeContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
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
});
