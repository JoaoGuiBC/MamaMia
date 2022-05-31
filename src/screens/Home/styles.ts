import styled, { css } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Greetings = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const GreetingsEmoji = styled.Image`
  width: 32px;
  height: 32px;
  margin-right: 12px;
`;

export const GreetingsText = styled.Text`
  font-size: 20px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE};
  `}
`;

export const SignOutButton = styled(BorderlessButton)``;

export const MenuHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 25px 24px 0;
  padding-bottom: 22px;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const MenuItemCounter = styled.Text`
  font-size: 14px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Title = styled.Text`
  font-size: 20px;
  line-height: 20px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT,
}))`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  padding: ${getStatusBarHeight() + 33}px 24px 58px;
`;
