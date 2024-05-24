require("dotenv").config();
const express = require("express");
const app = express();
const authUser = require("../src/authUser");
const connectDB = require("./db/connect");
const userRoutes = require("../src/routes/userRouter");
const postRoutes = require("../src/routes/postRouter");
const commentRoutes = require("../src/routes/commentRouter");
const likeRoutes = require("../src/routes/likeRouter");
const { jwtAuthMiddleware } = require("../src/jwt");

const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());

app.use("/api", authUser);
app.use("/api/users", jwtAuthMiddleware, userRoutes);
app.use("/api/posts", jwtAuthMiddleware, postRoutes);
app.use("/api/posts", jwtAuthMiddleware, commentRoutes);
app.use("/api", jwtAuthMiddleware, likeRoutes);

app.listen(PORT, () => {
  console.log(`${PORT} Yes I am connected`);
});

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.get("/", (req, res) => {
//   // res.send("hello");
//   res.render("index", { title: "Login System" });
// });
// const middleware = (req, res, next) => {
//   console.log("hello my middelware");
//   res.send("hi");
//   next();
// };
// app.use("/api/users", middleware, userRoutes);
