import React from 'react';

import { Container, Notification, Quantity, Title } from './styles';

interface BottomMenuProps {
  title: string;
  color: string;
  notifications?: string | undefined;
}

export function BottomMenu({ title, color, notifications }: BottomMenuProps) {
  const noNotifications = notifications === '0';

  return (
    <Container>
      <Title color={color}>{title}</Title>

      {notifications && (
        <Notification noNotification={noNotifications}>
          <Quantity noNotification={noNotifications}>{notifications}</Quantity>
        </Notification>
      )}
    </Container>
  );
}
