/* eslint-disable react-native/no-inline-styles */
import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import styles from './styles';
import { useReduxState } from '@hooks/useReduxState';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@redux/store';

interface AgainstPlayerProps {
  componentId: string;
}

const AgainstPlayerTikTakToe: React.FC<AgainstPlayerProps> = ({}) => {
  const { board, gameOver, currentPlayer, winner } = useReduxState(
    state => state.tikTakToe,
  );
  const dispatch = useDispatch<Dispatch>();
  const icons = {
    x: <Text style={styles.icon}>X</Text>,
    o: <Text style={styles.icon}>O</Text>,
  };
  const onTilePress = (row: number, col: number) => {
    const currentTile = board[row][col];
    if (gameOver) {
      return;
    }
    if (currentTile !== 0) {
      return null;
    }

    dispatch.tikTakToe.updateBoard({ row, col });
    dispatch.tikTakToe.checkWinner();
    dispatch.tikTakToe.updatePlayer(currentPlayer === 1 ? -1 : 1);
  };
  const currentIcon = (row: number, col: number) => {
    const tile = board[row][col];
    if (tile === 1) {
      return icons.x;
    } else if (tile === -1) {
      return icons.o;
    }
    return null;
  };
  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => onTilePress(0, 0)}
            style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {currentIcon(0, 0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onTilePress(0, 1)}
            style={[styles.tile, { borderTopWidth: 0 }]}>
            {currentIcon(0, 1)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onTilePress(0, 2)}
            style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}>
            {currentIcon(0, 2)}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => onTilePress(1, 0)}
            style={[styles.tile, { borderLeftWidth: 0 }]}>
            {currentIcon(1, 0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onTilePress(1, 1)}
            style={styles.tile}>
            {currentIcon(1, 1)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onTilePress(1, 2)}
            style={[styles.tile, { borderRightWidth: 0 }]}>
            {currentIcon(1, 2)}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => onTilePress(2, 0)}
            style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
            {currentIcon(2, 0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onTilePress(2, 1)}
            style={[styles.tile, { borderBottomWidth: 0 }]}>
            {currentIcon(2, 1)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onTilePress(2, 2)}
            style={[
              styles.tile,
              { borderBottomWidth: 0, borderRightWidth: 0 },
            ]}>
            {currentIcon(2, 2)}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default AgainstPlayerTikTakToe;
