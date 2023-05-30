import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "./App.css";
import YlaBoksi from "./YlaBoksi";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [books, setBooks] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { field: "title", sortable: true, filter: true },
    { field: "author", sortable: true, filter: true },
    { field: "year", sortable: true, filter: true },
    { field: "isbn", sortable: true, filter: true },
    { field: "price", sortable: true, filter: true },
    {
      field: "id",
      cellRenderer: (props) => (
        <IconButton
          onClick={() => deleteBook(props.value)}
          size="small"
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ]);

  const fetchItems = () => {
    fetch(
      "https://bookstore-2148c-default-rtdb.europe-west1.firebasedatabase.app/books/.json"
    )
      .then((response) => response.json())
      .then((data) => addKeys(data))
      .catch((err) => console.error(err));
  };
  // Add keys to the todo objects
  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) =>
      Object.defineProperty(item, "id", { value: keys[index] })
    );
    setBooks(valueKeys);
  };
  // Delete book by id
  const deleteBook = (id) => {
    fetch(
      `https://bookstore-2148c-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => fetchItems())
      .catch((err) => console.error(err));
  };
  // Add Books
  const addBook = (newBook) => {
    fetch(
      "https://bookstore-2148c-default-rtdb.europe-west1.firebasedatabase.app/books/.json",
      {
        method: "POST",
        body: JSON.stringify(newBook),
      }
    )
      .then((response) => fetchItems())
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <div className="App">
      <YlaBoksi addBook={addBook} />
      <div
        className="ag-theme-material"
        style={{ height: "600px", width: "100%", margin: "auto" }}
      >
        <AgGridReact rowData={books} columnDefs={columnDefs}></AgGridReact>
      </div>
    </div>
  );
}

export default App;
