import React from "react";

type Props = {
  icon: React.ReactNode;
  onClick: () => void;
};

function IconButton({ icon, onClick }: Props) {
  return (
    <button
      className="border border-black rounded-xl p-2 bg-white"
      onClick={onClick}
    >
      {icon}
    </button>
  );
}

export default IconButton;
