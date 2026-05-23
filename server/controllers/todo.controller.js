import db from "../config/db.js"

export async function getTodos(req,res){
    try{
        const user_id = req.user.id
            
        const response = await db.query(
            'SELECT id, title, completed FROM todos WHERE user_id = $1',
            [user_id])
        
        return res.status(200).json(response.rows)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch todos' });
    } 
}
export async function addTodo(req,res){
    try{
        const user_id = req.user.id
        
        const { id, title } = req.body
        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Title is required"
            });
        }
        
        const result = await db.query(
            'INSERT INTO todos(id, user_id, title, completed)  VALUES($1,$2,$3,$4) RETURNING *',
            [id, user_id, title, false])

        return res.status(201).json(result.rows[0])

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}
export async function checkTodo(req,res){
    try{
        const { id, completed } = req.body
    await db.query(
        'UPDATE todos SET completed = $1 WHERE id = $2 AND user_id = $3',
        [completed, id, req.user.id]
    )
        return res.status(200).json({message:'todo status toggled successfully'})
    }catch(err){
        console.error(err);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}
export async function deleteTodo(req, res) {
  try {
    const completedTodosID = req.body;

    await db.query(
      'DELETE FROM todos WHERE id = ANY($1) AND user_id = $2',
      [completedTodosID, req.user.id]
    );

    return res.status(200).json({message:'todos were deleted successfully'})
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
}