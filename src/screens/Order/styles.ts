import styled, { css } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const ContentScroll = styled.ScrollView`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Image = styled.Image`
  position: relative;
  top: -120px;
  align-self: center;

  width: 240px;
  height: 240px;
  border-radius: 120px;
`;

export const Sizes = styled.View`
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  margin-bottom: 40px;
`;

export const Form = styled.View`
  width: 100%;

  padding: 12px;
  margin-top: -120px;
`;

export const Title = styled.Text`
  font-size: 32px;
  margin-bottom: 32px;
  text-align: center;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Label = styled.Text`
  font-size: 14px;
  margin-bottom: 16px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const FormRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const InputGroup = styled.View`
  width: 48%;
`;

export const Price = styled.Text`
  font-size: 14px;
  margin: 24px 0;
  align-self: flex-end;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `};
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT,
}))`
  padding: ${getStatusBarHeight() + 34}px 24px 0;
`;
