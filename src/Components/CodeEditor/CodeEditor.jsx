import React, { useState, useRef, useEffect } from "react";
import { Highlight, themes } from "prism-react-renderer";
import "./CodeEditor.css";

// CodeEditor Component which combines both the texarea and the SyntaxHighlighter

const CodeEditor = () => {

  // Demo code
  const [code, setCode] = useState(` /* ReactJS */
    const App = ( props ) => {
    return (
      <div>
        <h1> Simple Code Editor </h1>
        <div>Awesome Syntax Highlighter</div>
      </div>
    );
  };
  `);
  
  // Used refs for the scroll synchronization

  const textareaRef = useRef(null);
  const syntaxHighlighterRef = useRef(null);

  const handleScroll = () => {
    if (textareaRef.current && syntaxHighlighterRef.current) {
      syntaxHighlighterRef.current.scrollTop = textareaRef.current.scrollTop;
      syntaxHighlighterRef.current.scrollLeft = textareaRef.current.scrollLeft;
      
    }
  };

  // handling Space using Tab key
  const handleKeyDown = (event) => {
    if (event.keyCode === 9) { // Tab key
      event.preventDefault();
      const textarea = event.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Set textarea value to: text before caret + tab + text after caret
      setCode(code.substring(0, start) + '\t' + code.substring(end));

      // Put caret at right position again
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    }
  };


  // Ensure both elements have the same height on load
  useEffect(() => {
    if (textareaRef.current && syntaxHighlighterRef.current) {
      
      syntaxHighlighterRef.current.height = `${textareaRef.current.scrollHeight}px`;
      
    }
  }, [code]);



  return (
    <div className="editor-container">
      <textarea
        className="code-editor"
        ref={textareaRef}
        onScroll={handleScroll}
        value={code}
        onKeyDown={handleKeyDown}
        onChange={(event) => setCode(event.target.value)}
        spellCheck="false"
        placeholder="Enter your code here..."
        wrap="off"
      />
      <pre className="syntax-highlighter-container" ref={syntaxHighlighterRef}>
        <Highlight
          theme={themes.oneDark}
          language="jsx"
          code={code}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </pre>
    </div>
  );
};

export default CodeEditor;
