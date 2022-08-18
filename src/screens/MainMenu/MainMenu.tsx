import { Pressable, View } from 'react-native';
import React from 'react';

import styles from './styles';
import { Navigation } from 'react-native-navigation';
import { Screens } from '@navigation/Screens';
import Logo from '@assets/images/logo.svg';
import { themeColors } from '@shared/vars';
import Button from '@components/Button';
interface MainMenuProps {
  componentId: string;
}

const MainMenu: React.FC<MainMenuProps> = ({ componentId }) => {
  const goToAgainstPlayerScreen = () => {
    Navigation.push(componentId, {
      component: {
        name: Screens.AGAINST_PLAYER,
      },
    });
  };
  const goToAgainstAIScreen = () => {
    Navigation.push(componentId, {
      component: {
        name: Screens.AGAINST_AI,
      },
    });
  };
  return (
    <>
      <View style={styles.container}>
        <Logo width={120} height={120} fill={themeColors.primaryMidtone} />

        <Button
          textStyle={styles.textBold}
          containerStyle={styles.buttonContainer}
          width={200}
          textValue="Against AI"
          onPress={goToAgainstAIScreen}
        />

        <Button
          containerStyle={styles.buttonContainer}
          width={200}
          textValue="Against Player"
          onPress={goToAgainstPlayerScreen}
        />
      </View>
    </>
  );
};

export default MainMenu;
