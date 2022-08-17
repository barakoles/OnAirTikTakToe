import { Text, View } from 'react-native';
import React from 'react';

import styles from './styles';

interface MainMenuProps {
  componentId: string;
}

const MainMenu: React.FC<MainMenuProps> = ({ componentId }) => {
  componentId;
  return (
    <>
      <View style={styles.container}>
        <Text>MainMenu</Text>
      </View>
    </>
  );
};

export default MainMenu;
