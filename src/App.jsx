import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset } from "./feature/counter/counterSlice";
import { addTodo, deleteTodo, toggleTodo } from "./feature/todos/todoSlice";
import { logout } from "./feature/authentication/authSlice";

import "./App.css";
import Auth from "./components/Auth";

function App() {                                                        
  const { isAuthenticate, user } = useSelector((state) => state.auth);
  const count = useSelector((state) => state.counter.value);
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      dispatch(addTodo(task));
      setTask("");
    }
  };

  const handleLogout = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      storedUser.isLoggedIn = false;
      localStorage.setItem("user", JSON.stringify(storedUser));
    }
    dispatch(logout());
  };

  return (
    <>
      {!isAuthenticate ? (
        <Auth />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 transition-all duration-500">
          <div>
          <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
            Welcome, {user?.username}! 👋
          </h1>
          <button
            onClick={handleLogout}
            className="mt-4 px-6 py-3 bg-red-500 hover:bg-red-600 transition-all duration-300 rounded-lg text-white font-semibold shadow-md"
          >
            Logout
          </button>
          </div>
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Counter Section */}
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl transform transition-all duration-300">
              <h1 className="text-2xl font-bold mb-6 text-gray-800">Counter</h1>
              <div className="flex items-center justify-center mb-8">
                <span className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {count}
                </span>
              </div>
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={() => dispatch(increment())}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Increment
                </button>
                <button
                  onClick={() => dispatch(decrement())}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Decrement
                </button>
                <button
                  onClick={() => dispatch(reset())}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Todo Section */}
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl transform transition-all duration-300">
              <h1 className="text-2xl font-bold mb-6 text-gray-800">ToDo List</h1>
              <form
                onSubmit={handleSubmit}
                className="flex items-center space-x-4 mb-6"
              >
                <input
                  type="text"
                  value={task}
                  placeholder="What needs to be done?"
                  onChange={(e) => setTask(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-300 hover:border-gray-300"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
                >
                  Add Task
                </button>
              </form>

              <ul>
                {todos.map((todo) => (
                  <li key={todo.id}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => dispatch(toggleTodo(todo.id))}
                    />
                    {todo.text}
                    <button onClick={() => dispatch(deleteTodo(todo.id))}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


export default App;
