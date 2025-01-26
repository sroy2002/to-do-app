import { useState } from "react";
import { GoCheckCircleFill, GoCircle } from "react-icons/go";

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
    <>
      <div>
        <h1 className="m-4 text-3xl">QuickTask</h1>
      </div>
      <div className="m-4 flex gap-2">
        <input
          type="text"
          value={inputValue}
          className="border-2 border-black"
          onChange={handleInputChange}
          placeholder="Enter your task"
        />
        <button
          type="button"
          className="border-2 border-black px-4"
          onClick={() => handleAddBtn()}
        >
          Add
        </button>
      </div>
    { tasks.length>0 && <div className="flex items-center gap-4">
        <p
          onClick={() => {
            setAllTasks(true);
            setAllCompletedTasks(false);
          }}
          className={`cursor-pointer pb-1 ${
            allTasks
              ? "border-b-4 border-blue-500"
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
          className={`cursor-pointer pb-1 ${
            allCompletedTasks
              ? "border-b-4 border-blue-500"
              : "border-b-4 border-transparent"
          }`}
        >
          Completed Tasks
        </p>
      </div>}
      {allTasks && (
        <div>
          {tasks.map((task, index) => (
            <div key={index} className=" flex gap-2 items-center">
              <div
                onClick={() => {
                  toggleTask(index);
                }}
                className={`cursor-pointer`}
              >
                {task.completed ? <GoCheckCircleFill /> : <GoCircle />}
              </div>
              <div
                className={`${
                  task.completed ? "line-through" : ""
                } cursor-pointer`}
              >
                {task.text}
              </div>
              <div
                className="text-red-500 hover:cursor-pointer"
                onClick={() => handleDelete(index)}
              >
                {" "}
                delete
              </div>
            </div>
          ))}
        </div>
      )}
      {allCompletedTasks && (
        <div>
          {tasks
            .filter((task) => task.completed)
            .map((task, index) => (
              <div key={index} className="flex gap-2 items-center">
                <GoCheckCircleFill />
                <div className="line-through cursor-pointer">{task.text}</div>
                <div
                  className="text-red-500 hover:cursor-pointer"
                  onClick={() => handleDelete(index)}
                >
                  {" "}
                  delete
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}

export default App;
