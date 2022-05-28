import styled, { css } from 'styled-components/native';
import Feather from '@expo/vector-icons/Feather';
import { TextInput } from 'react-native';
import type { ReactNode } from 'react';

export type TypeProps = 'primary' | 'secondary';

type Props = {
  type: TypeProps;
};

type ContentProps = {
  isErrored: boolean;
};

type ButtonChildren = {
  children?: ReactNode;
};

type IconState = {
  isHidden: boolean;
};

export const Container = styled.View`
  margin-bottom: 16px;
`;

export const ErrorMessage = styled.Text`
  font-size: 14px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.PRIMARY_800};
  `}
`;

export const Content = styled.View<ContentProps>`
  width: 100%;
  height: 56px;
  background-color: transparent;
  border-radius: 12px;
  flex-direction: row;

  ${({ theme, isErrored }) => css`
    border: 1px solid
      ${isErrored ? theme.COLORS.PRIMARY_800 : theme.COLORS.SHAPE};
  `}
`;

export const InputArea = styled(TextInput).attrs<Props>(({ theme, type }) => ({
  placeholderTextColor:
    type === 'primary' ? theme.COLORS.SECONDARY_900 : theme.COLORS.PRIMARY_50,
}))<Props>`
  font-size: 14px;
  padding: 7px 0;
  padding-left: 20px;
  flex: 1;

  ${({ theme, type }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${type === 'primary'
      ? theme.COLORS.SECONDARY_900
      : theme.COLORS.TITLE};
  `}
`;

export const HideTextButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 1,
}))<ButtonChildren>`
  align-items: center;
  justify-content: center;
  padding: 8px;
  color: yellow;
`;

export const Icon = styled(Feather).attrs<IconState>(({ theme, isHidden }) => ({
  name: isHidden ? 'eye' : 'eye-off',
  size: 24,
  color: theme.COLORS.SHAPE,
}))``;
