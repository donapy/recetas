import React from "react";

const SweetWhimsicalColors = () => {
  const colors = [
    {name: "Pale yellow", code: "#F5D183"},
    {name: "Muted peach", code: "#FFD3B5"},
    {name: "Burnt orange", code: "#FF7F51"},
    {name: "Rust brown", code: " #8B3D0F"},
    {name: "Olive green", code: "#556B2F"},
  ];

  return (
    <div className="text-center mx-auto">
      {colors.map((color) => (
        <div
          key={color.code}
          style={{
            backgroundColor: color.code,
            width: "100px",
            height: "100px",
            display: "inline-block",
            margin: "15px",
          }}
        >
          <p>{color.name}</p>
          <p>{color.code}</p>
        </div>
      ))}
    </div>
  );
};

export default SweetWhimsicalColors;
