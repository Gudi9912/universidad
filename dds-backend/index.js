import express from "express";
// const express = require("express");

const app = express();

app.get("/", (req, res)=> {
  res.send("Backend inicial dds-backend!");
})

const port = 3000;

app.listen(port, ()=>{
  console.log(`Sitio levantado en el puerto ${port}`);
});

console.log("andando2")