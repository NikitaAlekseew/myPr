// import Quill from "quill";

// const ImageStyle = Quill.import("formats/image");

// export class CustomImageStyle extends ImageStyle {
//   static formats(node: HTMLElement): { "border-radius"?: string } {
//     return {
//       ...super.formats(node),
//       "border-radius": node.style.borderRadius,
//     };
//   }

//   static create(value: { "border-radius"?: string }): HTMLElement {
//     const node = super.create(value);
//     node.style.borderRadius = value["border-radius"] || "10px";
//     return node;
//   }
// }

// Quill.register(CustomImageStyle, true);

// @ts-ignore

import Quill from "quill";

const ImageStyle = Quill.import("formats/image");

export class CustomImageStyle extends ImageStyle {
  static formats(node: HTMLElement): { [key: string]: any } {
    const formats = super.formats(node);
    formats["border-radius"] = node.style.borderRadius;
    formats["width"] = node.getAttribute("width");
    formats["height"] = node.getAttribute("height");
    formats["style"] = node.style.cssText; // Сохраняем все стили
    return formats;
  }

  static create(value: { [key: string]: any }): HTMLElement {
    const node = super.create(value);
    node.style.borderRadius = value["border-radius"] || "10px";
    if (value["style"]) {
      node.style.cssText = value["style"];
    }
    if (value["width"]) {
      node.setAttribute("width", value["width"]);
    }
    if (value["height"]) {
      node.setAttribute("height", value["height"]);
    }
    return node;
  }
}
Quill.register(CustomImageStyle, true);
