import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TodoPage from './TodoPage';

function Home() {
  return (
    <div className="h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-6 rounded shadow w-96 text-center">
        <h1 className="text-2xl font-bold text-blue-800 mb-4">Xin Chào!</h1>
        <Link
          to="/todo"
          className="bg-blue-500 text-white px-4 py-2 rounded inline-block"
        >
          Đến trang Todo List
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;