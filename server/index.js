import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import todoRoutes from "./routes/todo.routes.js"

const app = express()

app.use(cors({
  origin: true,
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/auth',authRoutes)
app.use('/todos',todoRoutes)



app.listen(
    process.env.PORT || 3003,"0.0.0.0",
    ()=>console.log('Server is running')
)