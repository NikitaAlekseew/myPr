// @ts-ignore
import { Quill } from "react-quill";
import BlotFormatter, {
  AlignAction,
  DeleteAction,
  ImageSpec,
  ResizeAction,
} from "quill-blot-formatter";
import MagicUrl from "quill-magic-url";

import "./EditorFonts.css";
import "./EditorSizes.css";

Quill.register("modules/blotFormatter", BlotFormatter);
Quill.register("modules/magicUrl", MagicUrl);

class CustomImageSpec extends ImageSpec {
  getActions() {
    return [AlignAction, DeleteAction, ResizeAction];
  }
}

const UNDO_ICON = `<svg viewbox="0 0 18 18">
<polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
<path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
</svg>`;
const REDO_ICON = `<svg viewbox="0 0 18 18">
<polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
<path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
</svg>`;

const icons = Quill.import("ui/icons");
icons["undo"] = UNDO_ICON;
icons["redo"] = REDO_ICON;

const allowedSizes = [
  "12pt",
  "14pt",
  "16pt",
  "18pt",
  "20pt",
  "22pt",
  "24pt",
  "26pt",
  "28pt",
  "36pt",
  "48pt",
  "72pt",
];
const Size = Quill.import("attributors/style/size");
Size.whitelist = allowedSizes;
Quill.register(Size, true);

const allowedFonts = ["Geologica"];
const Font = Quill.import("attributors/style/font");
Font.whitelist = allowedFonts;
Quill.register(Font, true);

function undoHandler() {
  this.quill.history.undo();
}

function redoHandler() {
  this.quill.history.redo();
}

export const formats = [
  "align",
  "blockquote",
  "bold",
  "bullet",
  "color",
  "font",
  "image",
  "indent",
  "italic",
  "link",
  "list",
  "script",
  "size",
  "strike",
  //'table',
  "underline",
];

export const modules = {
  blotFormatter: {
    specs: [CustomImageSpec],
    overlay: {
      style: {
        border: "2px solid red",
      },
    },
  },
  clipboard: {
    matchVisual: false,
  },
  history: {
    delay: 1000,
    maxStack: 50,
    userOnly: true,
  },
  magicUrl: true,
  //table: true,
  toolbar: {
    handlers: {
      undo: undoHandler,
      redo: redoHandler,
    },
    container: [
      [{ size: allowedSizes }],
      [{ color: [] }],
      [
        "bold",
        "italic",
        "underline",
        "strike",
        { script: "sub" },
        { script: "super" },
        "blockquote",
      ],
      [
        { list: "ordered" },
        { list: "bullet" },
        { align: [] },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      //['table'],
      ["undo", "redo"],
      ["clean"],
    ],
  },
};
