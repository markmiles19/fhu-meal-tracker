import * as React from 'react';
import { Text as DefaultText, View as DefaultView, useColorScheme } from 'react-native';

// Hook to pick colors
function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: 'text' | 'background'
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  const colors = {
    light: { text: '#000', background: '#fff' },
    dark: { text: '#fff', background: '#000' },
  };

  return colors[theme][colorName];
}

export type TextProps = DefaultText['props'] & {
  lightColor?: string;
  darkColor?: string;
};

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export type ViewProps = DefaultView['props'] & {
  lightColor?: string;
  darkColor?: string;
};

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}