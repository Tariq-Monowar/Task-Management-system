import { FC } from "react";
import "./loading.scss";

interface LoadingProps {
  width: number;
  size: number;
  bottom: number;
}

export const Loading1: FC<LoadingProps> = ({ width }) => {
  return (
    <span
      className="loader1"
      style={{ width: `${width}px`, height: `${width}px` }}
    ></span>
  );
};

export const Loading2: FC<LoadingProps> = ({ size, bottom, width }) => {
  return (
    <span
      className="loader2"
      style={{ fontSize: `${size}px`, marginTop: `${bottom}px` }}
    ></span>
  );
};
