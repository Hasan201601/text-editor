import React, { Children, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";

var icons = Quill.import("ui/icons");
Quill.register("modules/imageResize", ImageResize);
icons["undo"] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
    <path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
  </svg>`;
icons["redo"] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
    <path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
  </svg>`;

class CustomQuill extends ReactQuill {
  destroyEditor() {
    if (!this.editor) return;
    this.unhookEditor(this.editor);
  }
}

function App() {
  const [text, setText] = React.useState("");
  console.log(text);

  const reactQuillRef = useRef();
  console.log(reactQuillRef);
  const undoHandler = () => {
    reactQuillRef.current.editor.history.undo("undo");
  };

  const redoHandler = () => {
    reactQuillRef.current.editor.history.redo("redo");
  };
  const modules = {
    toolbar: {
      history: {
        delay: 1000,
        maxStack: 100,
        userOnly: true,
      },
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        [{ align: [] }],
        ["undo", "redo"],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["code-block"],
        ["link", "image", "video"],
        ["clean"],
      ],
      handlers: { undo: undoHandler, redo: redoHandler },
    },

    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };
  return (
    <>
      <ReactQuill
        theme="snow"
        placeholder="Start Typing Something"
        modules={modules}
        onChange={(editor) => console.log(editor.getContents())}
        ref={reactQuillRef}
      />

      <div>
        <div dangerouslySetInnerHTML={{ __html: text }}></div>
      </div>
    </>
  );
}

export default App;
