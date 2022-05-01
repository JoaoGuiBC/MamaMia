import styled, { css } from 'styled-components/native';
import Feather from '@expo/vector-icons/Feather';
import { TextInput } from 'react-native';
import type { ReactNode } from 'react';

export type TypeProps = 'primary' | 'secondary';

type Props = {
  type: TypeProps;
};

type ButtonChildren = {
  children?: ReactNode;
};

type IconState = {
  isHidden: boolean;
};

export const Container = styled.View`
  width: 100%;
  height: 56px;
  background-color: transparent;
  border-radius: 12px;
  margin-bottom: 16px;
  flex-direction: row;

  ${({ theme }) => css`
    border: 1px solid ${theme.COLORS.SHAPE};
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
