import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";

const Text = styled.span`
  font-size: 13px;
  font-weight: bold;
`;

const Btn = styled.button`
  margin: 5px 5px;
  background-color: whitesmoke;
  color: ${(props) => props.theme.textColor};
  font-size: 10px;
  border: 2px solid whitesmoke;
  border-radius: 5px;
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
    border: 2px solid ${(props) => props.theme.accentColor};
    cursor: pointer;
  }
`;

const TextBox = styled.div`
  text-align: center;
  border: 2px solid whitesmoke;
  border-radius: 5px;
  padding: 0px 5px;
`;
const Btns = styled.div`
  display: flex;
  justify-content: space-around;
`;

const List = styled.li`
  list-style: none;
  margin: 5px 10px;
  displat: flex;
  flex-direction: column;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const onDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      return oldToDos.filter(
        (toDo) => toDo.id !== Number(event.currentTarget.id)
      );
    });
  };

  return (
    <List>
      <TextBox>
        <Text>{text}</Text>
        <Btns>
          {category !== Categories.DOING && (
            <Btn name={Categories.DOING} onClick={onClick}>
              하는 중..💦
            </Btn>
          )}
          {category !== Categories.TO_DO && (
            <Btn name={Categories.TO_DO} onClick={onClick}>
              해야 함✊🏻
            </Btn>
          )}
          {category !== Categories.DONE && (
            <Btn name={Categories.DONE} onClick={onClick}>
              끝🤯
            </Btn>
          )}
          <Btn onClick={onDeleteClick} id={`${id}`}>
            지우기🎈
          </Btn>
        </Btns>
      </TextBox>
    </List>
  );
}

export default ToDo;
