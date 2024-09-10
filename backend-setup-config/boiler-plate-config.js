
module.exports = {
  content: `
const express = require("express");
const app = express();
const route = require("./routes/routes");
const cors = require('cors');
const PORT = process.env.PORT || 8000;
require('dotenv').config();
if(process.env.DB){
    require("./connections/connections");  
}
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000' ,'http://localhost:5173/'], // add your frontend URL
  credentials: true,
}));
app.use(express.json());
app.use("/", route);
app.listen(PORT, () => {
  console.log("SERVER STARTED AT PORT:", PORT);
});`,
  reqpackages: `{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "nodemon": "^3.1.0",
    "mongoose": "^7.2.2",
    "uuid": "^9.0.1"
  }
}`,
  routesboilerplate: `{/* write your routes here */}    
  const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
res.send('HELLO FROM SERVER 🫡');
});
module.exports = router;
  `,
  mongoconnections: `const mongoose = require("mongoose");
  mongoose.connect(process.env.DB).
      then(() => console.log("MONGOOSE CONNECTED")).catch((error) => {
          console.log(error);
      });
  `
};
