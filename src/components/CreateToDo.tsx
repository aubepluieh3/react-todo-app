import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

const Input = styled.input`
  outline: none;
  background: none;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.basicColor};
  text-align: center;
`;

const AddBtn = styled.button`
  margin: 25px 5px;
  background-color: ${(props) => props.theme.basicColor};
  border: 2px solid ${(props) => props.theme.basicColor};
  color: ${(props) => props.theme.textColor};
  font-size: 13px;
  border-radius: 5px;
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
    border: 2px solid ${(props) => props.theme.accentColor};
    cursor: pointer;
  }
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder={`${category}`}
      />
      <AddBtn>Add</AddBtn>
    </form>
  );
}

export default CreateToDo;
