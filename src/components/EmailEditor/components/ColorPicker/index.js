import { useState } from "react";
import { Popover } from "antd";
import { ChromePicker } from "react-color";
import InputColor from "react-input-color";

const ColorPicker = ({ color, setColor }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  console.log(color);

  return (
    <Popover
      zIndex={1070}
      content={<InputColor initialValue={color} onChange={setColor} />}
      trigger="click"
      open={popoverOpen}
      onOpenChange={setPopoverOpen}
    >
      <button
        className="color-picker-button"
        style={{ background: color }}
      ></button>
    </Popover>
  );
};

export default ColorPicker;
