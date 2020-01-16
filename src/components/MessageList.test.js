import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { findAllByTestId } from '@testing-library/react';
import MessagesList from './MessagesList';

describe('<MessageList /> 테스트', () => {
  const sampleMessages = [
    {
      id:123,
      author: '작성자',
      message: '테스트 메시지입니다.'
    }]
  ;


  it('메시지가 포함되는지 테스트', () => {
    const initialProps = { 
      messages:sampleMessages
    };
    const utils = render(<MessagesList {...initialProps}  />);
    const { getByText } = utils;
    const author = getByText(sampleMessages[0].author);
    expect(author).toBeTruthy();
    const message = getByText(sampleMessages[0].message,{exact:false});
    expect( message).toBeTruthy();
  });

  
});
