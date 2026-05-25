import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import todoRoutes from "./routes/todo.routes.js"

const app = express()

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://ak-todo-app.vercel.app"
  ],
  credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/auth',authRoutes)
app.use('/todos',todoRoutes)
app.get("/", (req, res) => {
  res.send("API is running");
});


app.listen(
    process.env.PORT || 3003,"0.0.0.0",
    ()=>console.log('Server is running')
)