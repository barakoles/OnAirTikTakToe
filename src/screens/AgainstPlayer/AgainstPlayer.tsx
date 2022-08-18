/* eslint-disable react-native/no-inline-styles */
import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useReduxState } from '@hooks/useReduxState';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@redux/store';
import styles from './styles';

interface AgainstPlayerProps {
  componentId: string;
}

const AgainstPlayerTikTakToe: React.FC<AgainstPlayerProps> = ({}) => {
  const { board, gameOver, currentPlayer, winner, draw } = useReduxState(
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

  const decideTileStyles = React.useCallback(
    (row: number, col: number) => {
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
      // in case there is a winner, highlight the winning tiles
      if (gameOver && board[row][col] === winner) {
        tileStyles = { ...tileStyles, ...styles.winningTile };
      }
      // in case there is a tie, highlight the winning tiles
      if (draw) {
        tileStyles = { ...tileStyles, ...styles.drawTile };
      }
      return tileStyles;
    },
    [board, draw, gameOver, winner],
  );
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
  const renderCurrentPlayer = React.useCallback(() => {
    if (currentPlayer === 1) {
      return <Text style={styles.currentPlayerText}>Current Player: X</Text>;
    } else if (currentPlayer === -1) {
      return <Text style={styles.currentPlayerText}>Current Player: O</Text>;
    }
    return null;
  }, [currentPlayer]);

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
  }, [board, currentIcon, decideTileStyles, onTilePress]);

  return (
    <>
      <View style={styles.container}>
        {renderCurrentPlayer()}
        {renderBoard()}
      </View>
    </>
  );
};

export default AgainstPlayerTikTakToe;
