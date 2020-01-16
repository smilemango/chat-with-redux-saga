import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { findAllByTestId } from '@testing-library/react';
import Message from './Message';

describe('<Message /> 테스트', () => {
  const sampleMessage = 
    {
      author: '작성자',
      message: '테스트 메시지입니다.'
    }
  ;


  it('메시지가 포함되는지 테스트', () => {
    const initialProps = { 
      message:sampleMessage.message,
      author:sampleMessage.author 
    };
    const utils = render(<Message {...initialProps}  />);
    const { getByText } = utils;
    const author = getByText(sampleMessage.author);
    expect(author).toBeTruthy();
    const message = getByText(sampleMessage.message,{exact:false});
    expect( message).toBeTruthy();
  });

  
});
