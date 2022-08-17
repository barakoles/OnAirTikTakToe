import { Button, View } from 'react-native';
import React from 'react';

import styles from './styles';
import { Navigation } from 'react-native-navigation';
import { Screens } from '@navigation/Screens';

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
  return (
    <>
      <View style={styles.container}>
        <Button title="Against Player" onPress={goToAgainstPlayerScreen} />
      </View>
    </>
  );
};

export default MainMenu;
