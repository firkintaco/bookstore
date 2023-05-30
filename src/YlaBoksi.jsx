import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddBook from "./AddBook";
const YlaBoksi = ({ addBook }) => {
  return (
    <AppBar
      position="static"
      sx={{ marginBottom: "1rem", background: "#B70404" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5">Bookstore.fi</Typography>
        <AddBook addBook={addBook} />
      </Toolbar>
    </AppBar>
  );
};

export default YlaBoksi;
