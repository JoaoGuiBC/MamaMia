import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';

type ContentProps = {
  isErrored: boolean;
};

export const Container = styled.View`
  margin-bottom: 8px;
`;

export const Content = styled.View<ContentProps>`
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 56px;

  border: 1px solid
    ${({ theme, isErrored }) =>
      isErrored ? theme.COLORS.PRIMARY_800 : theme.COLORS.SHAPE};
  border-radius: 12px;
`;

export const ErrorMessage = styled.Text`
  font-size: 14px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.PRIMARY_800};
  `}
`;

export const PizzaSize = styled.View<ContentProps>`
  justify-content: center;
  align-items: center;

  height: 56px;
  width: 56px;

  margin-right: 18px;
  border-right-width: 1px;
  border-right-color: ${({ theme, isErrored }) =>
    isErrored ? theme.COLORS.PRIMARY_800 : theme.COLORS.SHAPE};
`;

export const Label = styled.Text`
  font-size: 14px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Input = styled(TextInput)`
  flex: 1;
  margin-left: 7px;
`;
