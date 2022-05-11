import React, { FC, useContext, useState } from 'react';
import { ProfileContext } from 'src/common/context/NavigatorContext';
import { WrapContentStyles } from './styles';

type WrapContentProps = {
  title: string
};

const WrapContent: FC<WrapContentProps> = ({ children, title }) => {
  const { data } = useContext(ProfileContext);
  // console.log("data: ", data);

  return (
    <WrapContentStyles>
      <h4 className="welcom">Xin chào {data?.name}</h4>
      <h2 className="title">{title}</h2>
      {children}
    </WrapContentStyles>
  );
};

export default WrapContent;
