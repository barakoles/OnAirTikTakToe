/* eslint-disable react-native/no-inline-styles */
import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useReduxState } from '@hooks/useReduxState';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@redux/store';
import styles from './styles';
import Button from '@components/Button';
import { Navigation } from 'react-native-navigation';

interface AgainstPlayerProps {
  componentId: string;
}

const AgainstPlayerTikTakToe: React.FC<AgainstPlayerProps> = ({
  componentId,
}) => {
  const { board, gameOver, currentPlayer, draw, winnerLine, winner } =
    useReduxState(state => state.tikTakToe);
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
        // This can be changed to the length of the board - 1 in case logic needs to be expanded
        tileStyles = { ...tileStyles, ...styles.bottom };
      }
      if (col === 0) {
        tileStyles = { ...tileStyles, ...styles.left };
      }
      if (col === 2) {
        tileStyles = { ...tileStyles, ...styles.right };
      }
      // In case there is a winner, highlight the winning tiles
      const isWinnerLine = (winnerLine || []).find(el => {
        return el[0] === row && el[1] === col;
      });
      if (gameOver && isWinnerLine) {
        tileStyles = { ...tileStyles, ...styles.winningTile };
      }
      // In case there is a tie, highlight the winning tiles
      if (draw) {
        tileStyles = { ...tileStyles, ...styles.drawTile };
      }
      return tileStyles;
    },
    [draw, gameOver, winnerLine],
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
    if (currentPlayer === 1 && !gameOver) {
      return <Text style={styles.currentPlayerText}>X's turn</Text>;
    } else if (currentPlayer === -1 && !gameOver) {
      return <Text style={styles.currentPlayerText}>O's turn</Text>;
    }
    return null;
  }, [currentPlayer, gameOver]);

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
  const renderGameOverText = () => {
    if (gameOver && winner === 1) {
      return <Text style={styles.currentPlayerText}>X won!</Text>;
    } else if (gameOver && winner === -1) {
      return <Text style={styles.currentPlayerText}>O won!</Text>;
    }
  };
  const goBack = () => {
    Navigation.pop(componentId);
  };
  const reset = () => {
    dispatch.tikTakToe.resetGame();
  };
  return (
    <>
      <Button
        textValue="Go Back"
        onPress={goBack}
        width={80}
        // @ts-ignore
        containerStyle={[styles.headerButtons, { left: 20 }]}
        textStyle={styles.headerButtonTexts}
      />
      {gameOver ? (
        <Button
          textValue="Play Again"
          onPress={reset}
          width={80}
          // @ts-ignore
          containerStyle={[styles.headerButtons, { right: 20 }]}
          textStyle={styles.headerButtonTexts}
        />
      ) : (
        <Button
          textValue="Reset"
          onPress={reset}
          width={80}
          // @ts-ignore
          containerStyle={[styles.headerButtons, { right: 20 }]}
          textStyle={styles.headerButtonTexts}
        />
      )}
      <View style={styles.container}>
        <View style={styles.currentPlayerContainer}>
          {renderCurrentPlayer()}
        </View>
        {renderBoard()}
        <View style={styles.currentPlayerContainer}>
          {renderGameOverText()}
        </View>
      </View>
    </>
  );
};

export default AgainstPlayerTikTakToe;
