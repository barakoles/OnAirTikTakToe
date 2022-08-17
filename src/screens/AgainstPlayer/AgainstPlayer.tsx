import { Text, View } from 'react-native';
import React from 'react';

import styles from './styles';

interface AgainstPlayerProps {
  componentId: string;
}

const AgainstPlayer: React.FC<AgainstPlayerProps> = ({ componentId }) => {
  componentId;
  return (
    <>
      <View style={styles.container}>
        <Text>Against Player</Text>
      </View>
    </>
  );
};

export default AgainstPlayer;
