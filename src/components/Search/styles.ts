import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
};

export const Container = styled.View`
  flex-direction: row;
  align-items: center;

  width: 100%;

  margin-top: -27px;
  padding: 0 24px;
`;

export const InputArea = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  border-radius: 16px;

  ${({ theme }) => css`
    background-color: ${theme.COLORS.TITLE};
    border: 1px solid ${theme.COLORS.SHAPE};
  `}
`;

export const Input = styled.TextInput`
  flex: 1;
  height: 52px;
  padding-left: 12px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
`;

export const ClearButton = styled.TouchableOpacity`
  margin-right: 7px;
`;

export const Button = styled(RectButton)<ButtonProps>`
  align-items: center;
  justify-content: center;

  width: 52px;
  height: 52px;

  margin-left: 7px;
  border-radius: 18px;

  background-color: ${({ theme }) => theme.COLORS.SUCCESS_900};
`;
