import React from "react";
export interface IconProps {
  fill?: string;
  size?: string | number;
  height?: string | number;
  width?: string | number;
  name?: string;
}

const Icon: React.FC<IconProps> = ({fill, size = 24, height =24, width,name, ...props}) => {
  return (
    <img src={`/assets/icons/${name}.svg`} alt="" aria-label={name}/>
  );
};

export default Icon;