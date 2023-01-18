

import express from "express";
import mysql from "mysql";

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Barbie1490",
  database: "employee",
});

app.get("/", (req, res) => {
  res.json("Hello");
});

app.get("/management", (req, res) => {
  const q = "SELECT * FROM management";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/management/:Employee_Name", (req, res) => {
  const ename = req.params.Employee_Name;

  const q = "SELECT * FROM management WHERE Employee_Name = ?";
  db.query(q, [ename],(err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/management", (req, res) => {
  const q = "INSERT INTO management(`Employee_Name`, `Salary`, `Paid_Leaves`, `Date_of_birth`, `Position`, `Department`) VALUES (?)";

  const values = [
    req.body.Employee_Name,
    req.body.Salary,
    req.body.Paid_Leaves,
    req.body.Date_of_birth,
    req.body.Position,
    req.body.Department,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/management/:id", (req, res) => {
  const Employee_Name = req.params.id;
  const q = " DELETE FROM management WHERE Employee_Name = ? ";

  db.query(q, [Employee_Name], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});


app.put("/management/:id", (req, res) => {
  const id1 = req.params.id;
  const q = "UPDATE management SET `Employee_Name`= ?, `Salary`= ?, `Paid_Leaves`= ?, `Date_of_birth` = ?, `Position` = ?, `Department` = ? WHERE Employee_Id = ?";

  const values = [
    req.body.Employee_Name,
    req.body.Salary,
    req.body.Paid_Leaves,
    req.body.Date_of_birth,
    req.body.Position,
    req.body.Department
  ];

  db.query(q, [...values,id1], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});