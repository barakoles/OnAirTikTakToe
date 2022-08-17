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

  const onTilePress = React.useCallback(
    (row: number, col: number) => {
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
    },
    [board, currentPlayer, dispatch.tikTakToe, gameOver],
  );

  const decideTileStyles = (row: number, col: number) => {
    let tileStyles = styles.tile;
    if (row === 0) {
      tileStyles = { ...tileStyles, ...styles.top };
    }
    if (row === 2) {
      // this can be changed to the length of the board - 1 in case logic needs to be expanded
      tileStyles = { ...tileStyles, ...styles.bottom };
    }
    if (col === 0) {
      tileStyles = { ...tileStyles, ...styles.left };
    }
    if (col === 2) {
      tileStyles = { ...tileStyles, ...styles.right };
    }
    return tileStyles;
  };
  const currentIcon = React.useCallback(
    (row: number, col: number) => {
      const tile = board[row][col];
      if (tile === 1) {
        return icons.x;
      } else if (tile === -1) {
        return icons.o;
      }
      return null;
    },
    [board, icons.o, icons.x],
  );

  const renderBoard = React.useCallback(() => {
    return board.map((row: number[], rowIndex: number) => {
      return (
        <View key={rowIndex} style={styles.row}>
          {row.map((tile, colIndex) => {
            return (
              <TouchableOpacity
                key={colIndex}
                style={decideTileStyles(rowIndex, colIndex)}
                onPress={() => onTilePress(rowIndex, colIndex)}>
                {currentIcon(rowIndex, colIndex)}
              </TouchableOpacity>
            );
          })}
        </View>
      );
    });
  }, [board, currentIcon, onTilePress]);

  return (
    <>
      <View style={styles.container}>{renderBoard()}</View>
    </>
  );
};

export default AgainstPlayerTikTakToe;
