import React from "react";

type Props = {
  icon: React.ReactNode;
  onClick: () => void;
};

function IconButton({ icon, onClick }: Props) {
  return (
    <button
      className="border-2 border-black rounded-xl py-2 px-3 bg-white"
      onClick={onClick}
    >
      {icon}
    </button>
  );
}

export default IconButton;
