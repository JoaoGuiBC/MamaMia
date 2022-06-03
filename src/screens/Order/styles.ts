import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Image = styled.Image`
  position: relative;
  top: -120px;
  align-self: center;

  width: 240px;
  height: 240px;
  border-radius: 120px;
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT,
}))`
  padding: ${getStatusBarHeight() + 34}px 24px 0;
`;
