import React, { FC } from "react";
import { Button } from "../ui/button";

interface ErrorComponentProps {
  onRetry: () => void;
}

const ErrorComponent: FC<ErrorComponentProps> = ({ onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div className="text-red-500 text-2xl font-bold">Bir hata oluştu!</div>
      <Button
        variant={"secondary"}
        onClick={onRetry}
        className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200"
      >
        Tekrar Dene
      </Button>
    </div>
  );
};

export default ErrorComponent;
