import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 30px;
  margin: 10px 0px;
  font-weight: bold;
`;

const Main = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const Category = styled.select`
  margin: 15px 0px;
  background-color: whitesmoke;
  border: 2px solid whitesmoke;
  padding: 6px;
  border-radius: 10px;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  console.log(toDos);
  return (
    <Body>
      <Title>To Do List 📝 </Title>
      <hr />
      <Main>
        <Category value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>해야 함✊🏻</option>
          <option value={Categories.DOING}>하는 중..💦</option>
          <option value={Categories.DONE}>끝🤯</option>
        </Category>
        <CreateToDo />
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </Main>
    </Body>
  );
}

export default ToDoList;
