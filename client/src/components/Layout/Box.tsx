import React, { CSSProperties } from 'react';
import styled from 'styled-components';

interface IBox {
  color?: string;
  bgColor?: string;
  width?: string | number;
  height?: string | number;
  vCenter?: string;
  hCenter?: string;
  borderRadius?: string | number;
  borderColor?: string;
  flex?: string;
  testId?: string;
  onClick?: () => void;
  style?: CSSProperties;
  children?: React.ReactElement | React.ReactElement[];
}

const Box: React.FC<IBox> = ({
  color,
  bgColor,
  width,
  height,
  vCenter,
  hCenter,
  borderRadius,
  borderColor,
  flex,
  testId,
  onClick,
  style,
  children,
}) => {
  return onClick ? (
    <StyledButton
      testId={testId}
      onClick={onClick}
      color={color}
      bgColor={bgColor}
      height={size(height)}
      width={size(width)}
      vCenter={vCenter}
      hCenter={hCenter}
      borderRadius={borderRadius}
      borderColor={borderColor}
      flex={flex}
      style={{ ...style }}
    >
      {children}
    </StyledButton>
  ) : (
    <StyledBox
      testId={testId}
      color={color}
      bgColor={bgColor}
      height={size(height)}
      width={size(width)}
      vCenter={vCenter}
      hCenter={hCenter}
      borderRadius={borderRadius}
      borderColor={borderColor}
      flex={flex}
      style={{ ...style }}
    >
      {children}
    </StyledBox>
  );
};

const StyledBox = styled.div<IBox>`
  display: flex;
  flex-direction: column;
  word-break: break-word;
  flex: ${(props) => (props.flex ? 1 : undefined)};
  justify-content: ${(props) => (props.vCenter ? 'center' : undefined)};
  align-items: ${(props) => (props.hCenter ? 'center' : undefined)};
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : 'transparent'};
  color: ${(props) => (props.color ? props.color : 'white')};
  width: ${(props) => (props.width ? props.width : 'auto')};
  height: ${(props) => (props.height ? props.height : 'auto')};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : 0)};
  border: ${(props) =>
    props.borderColor ? '1px solid ' + props.borderColor : undefined};
`;

const StyledButton = styled.button<IBox>`
  display: flex;
  flex-direction: column;
  flex: ${(props) => (props.flex ? 1 : undefined)};
  justify-content: ${(props) => (props.vCenter ? 'center' : undefined)};
  align-items: ${(props) => (props.hCenter ? 'center' : undefined)};
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : 'transparent'};
  color: ${(props) => (props.color ? props.color : 'white')};
  width: ${(props) => (props.width ? props.width : 'auto')};
  height: ${(props) => (props.height ? props.height : 'auto')};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : 0)};
  border: ${(props) =>
    props.borderColor ? '1px solid ' + props.borderColor : undefined};
`;

const size = (prop?: string | number) => {
  if (typeof prop === 'string') {
    return prop;
  }

  return prop + 'px';
};

export default Box;