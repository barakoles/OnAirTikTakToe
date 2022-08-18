import { fontFamilies, themeColors } from '@shared/vars';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: themeColors.primaryMidtone,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    marginVertical: 20,
  },
  textBold: {
    fontFamily: fontFamilies.bold,
  },
});

export default styles;
