import { fontFamilies } from '@shared/vars';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: 20, height: 20, marginRight: 10 },
  textBase: {
    fontFamily: fontFamilies.regular,
  },
  validText: {},
  notValidText: {},
  buttonBase: {},
  validButton: {},
  notValidButton: {},
});

export default styles;
