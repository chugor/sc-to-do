import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

const AddFab = (props) => {
  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
      }}
      {...props}
    >
      <AddIcon />
    </Fab>
  );
};

export default AddFab;
