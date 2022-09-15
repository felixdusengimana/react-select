import React from "react";
export interface IconProps {
  fill?: string;
  size?: string | number;
  height?: string | number;
  width?: string | number;
  name?: string;
}

const Icon: React.FC<IconProps> = ({fill,height, width,name, ...props}) => {
  return (
    <img src={`icons/${name}.svg`} alt="" aria-label={name} width={width} height={height}/>
  );
};

export default Icon;