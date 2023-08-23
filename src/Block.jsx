import React from "react";

export default function Block(props) {
  return (
    <div
      style={{
        backgroundColor: props.isPressed ? "#59E391" : "white",
      }}
      onClick={props.onClick}
    >
      {props.value}
    </div>
  );
}
