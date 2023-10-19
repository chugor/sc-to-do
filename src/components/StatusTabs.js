import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const StatusTabs = ({ tab, onTabChange }) => {
  return (
    <ToggleButtonGroup
      value={tab}
      exclusive
      onChange={onTabChange}
      color="primary"
    >
      <ToggleButton value="all">All</ToggleButton>
      <ToggleButton value="done">Done</ToggleButton>
      <ToggleButton value="undone">Undone</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default StatusTabs;
