import CodeEditor from "./Components/CodeEditor/CodeEditor";

// App Component

function App() {
  

  return (
    <div className="App">
      <main className="container">
        <div className="container__content">
          <h1>ReactJS Simple Code Editor</h1>
          <p>Dive into coding with our simple yet powerful code editor. Perfect for quick edits, testing snippets, and learning new programming concepts.</p>
          <div className="container_editor_area">
            <CodeEditor />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
