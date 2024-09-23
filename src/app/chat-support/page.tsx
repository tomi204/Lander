'use client';
import React, { FC } from 'react';
import ChatSupport from '@/components/ChatSupport';

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const Chat: FC<CommonLayoutProps> = ({ children }) => {
  return (
    <>
      <ChatSupport />
    </>
  );
};

export default Chat;
