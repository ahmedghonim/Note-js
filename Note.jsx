import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import { Input, Form, Button } from 'antd';
import {
  ExpandOutlined,
  CheckOutlined,
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const Wrapper = styled.div`
  z-index: 99;
  width: ${({ minimus }) => (minimus ? '300px' : '150px')};
  height: 40px;
  border-radius: 5px 5px 0 0;
  position: absolute;
  font-family: 'Kalam', cursive;
  background: #fff;
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  font-size: 1.25rem !important;
  display: flex;
  align-items: center;
  .input {
    border: none;
    background: transparent;
    font-size: 1.25rem;
    resize: none;
  }
  ${({ top }) => css`
    top: ${top};
  `};

  ${({ left }) => css`
    left: ${left};
  `};
`;

const Container = styled.div`
  width: 290px;
  position: absolute;
  top: 40px;
  right: 0px;
  text-decoration: none;
  color: #000;
  ${({ bgColor }) => css`
    background-color: ${bgColor};
  `};
  border-radius: 0 0 5px 5px;
  display: block;
  height: 15em;
  width: 15em;
  padding: 0.5em;
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
`;

const ColorBtns = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 20px;
  :hover {
    gap: 5px;
    width: 80%;
  }
  span {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const Header = styled.div`
  padding: 0 0.5rem;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  .btn {
    display: flex;
    gap: 0.3rem;
  }
`;

const Number = styled.div`
  position: absolute;
  right: 0.5rem;
  font-size: 1.5rem;
`;

function Note({ setAddNote, number }) {
  const mainScroll = useRef();
  const [minimus, setMinimus] = React.useState(true);
  const [bgColor, setBgColor] = React.useState('#feff9c');
  const { top, left } = JSON.parse(localStorage.getItem(`note-${number}`));

  let offsetX;
  let offsetY;

  const move = (e) => {
    const el = mainScroll.current;
    el.style.left = `${e.pageX - offsetX}px`;
    el.style.top = `${e.pageY - offsetY}px`;
    localStorage.setItem(
      `note-${number}`,
      JSON.stringify({ left: el.style.left, top: el.style.top }),
    );
  };

  const add = (e) => {
    const el = mainScroll.current;
    offsetX = e.clientX - el.getBoundingClientRect().left;
    offsetY = e.clientY - el.getBoundingClientRect().top;
    el.addEventListener('mousemove', move);
  };

  const remove = () => {
    const el = mainScroll.current;
    el.removeEventListener('mousemove', move);
  };

  const bgColors = [
    '#ff7eb9',
    '#ff65a3',
    '#7afcff',
    '#feff9c',
    '#00ff00',
    '#00ffff',
    '#ffff00',
  ];

  return (
    <Wrapper
      ref={mainScroll}
      top={top}
      left={left}
      onMouseDown={(e) => {
        e.stopPropagation();
        add(e);
      }}
      onMouseUp={remove}
      minimus={minimus}
    >
      <Header>
        <div className="btn">
          <Button
            onClick={() => {
              remove();
              setAddNote((prev) => --prev);
            }}
            icon={<CheckOutlined />}
            type="danger "
          />
          <Button
            onClick={() => {
              remove();
              setAddNote((prev) => ++prev);
            }}
            icon={<PlusOutlined />}
            type="success "
          />
          <Button
            onClick={() => {
              remove();
              setMinimus((prev) => !prev);
            }}
            icon={!minimus ? <ExpandOutlined /> : <MinusOutlined />}
            type="primary"
          />
        </div>
        {minimus && (
          <ColorBtns>
            {bgColors.map((color) => (
              <span
                key={color}
                style={{ background: color }}
                onClick={(e) => {
                  e.stopPropagation(e);
                  setBgColor(color);
                }}
              />
            ))}
          </ColorBtns>
        )}
      </Header>
      <Number>{number + 1}</Number>
      {minimus && (
        <Container bgColor={bgColor}>
          <Form layout="vertical">
            <Form.Item>
              {/* <span>Title</span> */}
              <Input className="input" placeholder="Enter Title ..." />
            </Form.Item>
            <Form.Item>
              <Input.TextArea
                className="input"
                placeholder="Enter Text Content ..."
                rows="6"
              />
            </Form.Item>
          </Form>
        </Container>
      )}
    </Wrapper>
  );
}

export default Note;
