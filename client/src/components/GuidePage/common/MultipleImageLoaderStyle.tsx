// @ts-ignore
export const thumbsContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "15px",
};

export const thumb: React.CSSProperties = {
  position: "relative",
  display: "inline-flex",
  borderRadius: "15px",
  width: 100,
  height: 100,
  boxSizing: "border-box",
};

export const thumbInner: React.CSSProperties = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

export const img: React.CSSProperties = {
  display: "block",
  width: "auto",
  height: "100%",
  borderRadius: "10px",
};

export const deleteButton: React.CSSProperties = {
  position: "absolute",
  top: 0,
  right: 0,
  background: "rgba(255, 255, 255, 0.7)",
  borderRadius: "50%",
};
