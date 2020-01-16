import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { findAllByTestId } from '@testing-library/react';
import Sidebar from './Sidebar';

describe('<Sidebar /> 테스트', () => {
  const sampleUsers = [
    {
      id: 1,
      name: '홍길동'
    },
    { id: 2, name: '강남길' }
  ];


  it('사용자 목록 잘 포함되는지 테스트', () => {
    const initialProps = { users: sampleUsers };
    const utils = render(<Sidebar {...initialProps}  />);
    const { getByText } = utils;
    const usernode = getByText(sampleUsers[0].name);
    expect(usernode).toBeTruthy();
    expect(usernode).toHaveAttribute('user_id',sampleUsers[0].id.toString());
  });

  
});
