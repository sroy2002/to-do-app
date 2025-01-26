import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleAddBtn = () => {
    setTasks((prev) => [...prev, inputValue]);
    setInputValue("");
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
          onClick={handleAddBtn}
        >
          Add
        </button>
      </div>
      <div>
        {tasks.map((task) => (
          <div className=" flex gap-2">
            <div>{task}</div>
            <div> delete</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
