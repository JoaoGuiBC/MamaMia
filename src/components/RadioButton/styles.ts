import styled, { css } from 'styled-components/native';

export type RadioButtonContainerProps = {
  isSelected: boolean;
};

export const Container = styled.TouchableOpacity<RadioButtonContainerProps>`
  width: 104px;
  height: 82px;
  border-radius: 8px;
  padding: 14px 16px;

  ${({ theme, isSelected }) => css`
    border: 1px solid
      ${isSelected ? theme.COLORS.SUCCESS_900 : theme.COLORS.SHAPE};
    background-color: ${isSelected
      ? theme.COLORS.SUCCESS_50
      : theme.COLORS.TITLE};
  `}
`;

export const Title = styled.Text`
  font-size: 16px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Radio = styled.View`
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;
  margin-bottom: 16px;

  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.COLORS.SECONDARY_900};
`;

export const Selected = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.SUCCESS_900};
`;
