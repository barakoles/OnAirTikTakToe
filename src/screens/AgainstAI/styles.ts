import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tile: {
    borderWidth: 5,
    width: 80,
    height: 80,
  },
  top: {
    borderTopWidth: 0,
  },
  bottom: {
    borderBottomWidth: 0,
  },
  left: {
    borderLeftWidth: 0,
  },
  right: {
    borderRightWidth: 0,
  },
  winningTile: {
    backgroundColor: 'green',
  },
  drawTile: {
    backgroundColor: 'orange',
  },
  currentPlayerText: {
    fontSize: 20,
  },
  icon: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 60,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
  },
});

export default styles;
