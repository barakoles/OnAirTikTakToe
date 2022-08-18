import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Pressable,
  PressableProps,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, { SyntheticEvent, useCallback } from 'react';

import { themeColors } from '@shared/vars';
import styles from './styles';

interface ButtonProps extends PressableProps {
  loading?: boolean;
  onPress: () => void;
  imageSrc?: ImageSourcePropType;
  textValue: string;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  width?: number;
}

const Button: React.FC<ButtonProps> = ({
  disabled,
  loading,
  onPress,
  containerStyle,
  textStyle,
  textValue,
  width,
  ...props
}) => {
  const onPressPrevented = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation();
      return (!disabled || !loading) && onPress();
    },
    [disabled, loading, onPress],
  );
  return (
    <Pressable
      onPress={onPressPrevented}
      {...props}
      style={[
        containerStyle,
        styles.buttonBase,
        { width },
        !disabled ? styles.validButton : styles.notValidButton,
      ]}>
      {loading ? (
        <ActivityIndicator
          color={disabled ? themeColors.primaryDark : 'white'}
        />
      ) : (
        <Text
          style={[
            styles.textBase,
            !disabled ? styles.validText : styles.notValidText,
            textStyle,
          ]}>
          {textValue}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;
