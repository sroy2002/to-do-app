import { useState } from "react";
import { GoCheckCircleFill, GoCircle } from "react-icons/go";
import { IoMdTrash } from "react-icons/io";

type Task = {
  text: string;
  completed: boolean;
};

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [allTasks, setAllTasks] = useState(true);
  const [allCompletedTasks, setAllCompletedTasks] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleAddBtn = () => {
    if (inputValue === "") {
      alert("Empty task not allowed!");
      return;
    }
    setTasks((prev) => [{ text: inputValue, completed: false }, ...prev]);
    setInputValue("");
  };
  const handleDelete = (index: number) => {
    setTasks((prev) => prev.filter((_, i) => i != index));
  };

  const toggleTask = (index: number) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="w-full h-screen flex flex-col  items-center gradient-background">
      <div className="flex justify-center items-center my-8">
        <h1 className="m-4 text-5xl quicksand-600 text-[#577BC1]">QuickTask</h1>
      </div>
      <div className="my-3 mb-[3rem] flex gap-2 justify-center items-center w-[40%]">
        <input
          type="text"
          value={inputValue}
          className="border border-gray-300 rounded-full w-full px-8 py-3 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none quicksand-600"
          onChange={handleInputChange}
          placeholder="Enter your task"
        />
        <button
          type="button"
          className="border-none bg-[#344CB7] px-8 py-3  text-white quicksand-600 font-bold rounded-full hover:scale-105 transition-all duration-300 ease-in-out hober:shadow-md"
          onClick={() => handleAddBtn()}
        >
          Add
        </button>
      </div>
      {tasks.length > 0 && (
        <div className="flex items-center justify-around gap-8 mb-8 w-[40%] quicksand-600">
          <p
            onClick={() => {
              setAllTasks(true);
              setAllCompletedTasks(false);
            }}
            className={`cursor-pointer pb-1 text-xl text-[#344CB7] ${
              allTasks
                ? "border-b-4 border-[#344CB7]"
                : "border-b-4 border-transparent"
            }`}
          >
            All Tasks
          </p>
          <p
            onClick={() => {
              setAllTasks(false);
              setAllCompletedTasks(true);
            }}
            className={`cursor-pointer pb-1 text-xl text-[#344CB7] ${
              allCompletedTasks
                ? "border-b-4 border-[#344CB7]"
                : "border-b-4 border-transparent"
            }`}
          >
            Completed Tasks
          </p>
        </div>
      )}
      {allTasks && (
        <div className="w-[40%] text-lg montserrat-500 px-6">
          {tasks.map((task, index) => (
            <div
              key={index}
              className=" flex gap-2 items-center  border-b-2 border-gray-100 pb-2 mb-2"
            >
              <div
                onClick={() => {
                  toggleTask(index);
                }}
                className={`cursor-pointer`}
              >
                {task.completed ? <GoCheckCircleFill /> : <GoCircle />}
              </div>
              <div className="flex justify-between items-center w-full">
                <div
                  className={`${
                    task.completed ? "line-through" : ""
                  } cursor-pointer`}
                >
                  {task.text}
                </div>
                <div
                  className="text-red-500 hover:cursor-pointer text-lg"
                  onClick={() => handleDelete(index)}
                >
                  {" "}
                  <IoMdTrash />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {allCompletedTasks && (
        <div className="w-[40%] text-lg montserrat-500 flex flex-col px-6">
          {tasks
            .filter((task) => task.completed)
            .map((task, index) => (
              <div
                key={index}
                className="flex gap-2 items-center border-b-2 border-gray-100 pb-2 mb-2"
              >
                <GoCheckCircleFill />
                <div className="flex justify-between items-center w-full">
                  <div className="line-through cursor-pointer">{task.text}</div>
                  <div
                    className="text-red-500 hover:cursor-pointer text-lg "
                    onClick={() => handleDelete(index)}
                  >
                    {" "}
                    <IoMdTrash />
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
