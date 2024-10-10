// // import { FC, useRef, useEffect } from "react";
// // import ReactQuill, { Quill } from "react-quill";
// // import "react-quill/dist/quill.snow.css";
// // import { modules, formats } from "./EditorToolbar";
// // import "./Editor.scss";

// // import { CustomImageStyle } from "./CustomImageStyle";

// // interface TextEditorProps {
// //   value: string;
// //   onChange: (value: string) => void;
// // }

// // const Editor: FC<TextEditorProps> = ({ value, onChange }) => {
// //   const quillRef = useRef<ReactQuill | null>(null);

// //   const handleChange = (value: string) => {
// //     onChange(value);
// //   };

// //   useEffect(() => {
// //     Quill.register(CustomImageStyle, true);
// //     const quill = quillRef.current.getEditor();
// //     quill.format("size", "12pt");
// //   }, []);

// //   const theme = "snow";

// //   return (
// //     <ReactQuill
// //       ref={quillRef}
// //       theme={theme}
// //       value={value}
// //       onChange={handleChange}
// //       modules={modules}
// //       formats={formats}
// //     />
// //   );
// // };

// // export default Editor;

// @ts-ignore

import { FC, useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "./EditorToolbar";
import "./Editor.scss";

import { CustomImageStyle } from "./CustomImageStyle";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: FC<TextEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    Quill.register(CustomImageStyle, true);
    const quill = quillRef.current?.getEditor();
    if (quill) {
      quill.format("size", "12pt");
    }
  }, []);

  useEffect(() => {
    const quill = quillRef.current?.getEditor();

    if (quill) {
      const images = quill.root.querySelectorAll("img");
      images.forEach((img) => {
        console.log("Image styles:", img.style.cssText);
        console.log(
          "Image attributes:",
          img.getAttribute("data-align"),
          img.getAttribute("style"),
          img.getAttribute("width"),
          img.getAttribute("height")
        );
      });
    }
  }, [value]);

  const handleChange = (content: string) => {
    onChange(content);
  };

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      onChange={handleChange}
      modules={modules}
      formats={formats}
    />
  );
};

export default Editor;
