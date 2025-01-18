const db = require('../dbConnection/connection');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createTask = async (req, res) => 
{
    const { title, description, status = 'pending' } = req.body;
    console.log(req.body)
    try 
    {
        const [rows] = await db.query('INSERT INTO tasks (title, description, status, userId) VALUES (?, ?, ?, ?)', [title, description, status, req.user.id]);
        res.status(201).json({ message: 'Task Created', taskId: rows.insertId });
    } 
    catch (err) 
    {
        res.status(400).json({ message: 'Error Creating Task', error: err.message });
    }
};

const updateTask = async (req, res) => 
{
    const { id } = req.params;
    const { title, description, status } = req.body;
    console.log(req.body)

    if (status && !['pending', 'completed'].includes(status)) 
    {
        return res.status(400).send('Invalid status. Must be either "pending" or "completed".');
    }

    try 
    {
        const [result] = await db.query('UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND userId = ?', [title, description, status, id, req.user.id]);
        if (result.affectedRows === 0) 
        {
            return res.status(404).send('Task Not Found');
        }
        res.status(200).json({ message: 'Task Updated' });
    } 
    catch (err) 
    {
        res.status(400).send('Error Updating Task');
    }
};

const deleteTask = async (req, res) => 
{
    const { id } = req.params;
    try 
    {
        const [result] = await db.query('DELETE FROM tasks WHERE id = ? AND userId = ?', [id, req.user.id]);
        if (result.affectedRows === 0)
        {
            return res.status(404).send('Task Not Found');
        }
        res.status(200).json({ message: 'Task Deleted' });
    } 
    catch (err) 
    {
        res.status(400).send('Error Deleting Task');
    }
};

const getTasks = async (req, res) => 
{
    const { status } = req.query;
    try 
    {
        let query = 'SELECT * FROM tasks WHERE userId = ?';
        const params = [req.user.id];
        if (status) 
        {
            query += ' AND status = ?';
            params.push(status);
        }
        const [tasks] = await db.query(query, params);
        res.json(tasks);
        // return res.json({"tasks" : tasks});
    } 
    catch (err) 
    {
        res.status(400).send('Error Fetching Tasks');
    }
};

const getTaskById = async (req, res) => 
{
    const { id } = req.params;

    try 
    {
        const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
        
        if (rows.length === 0) 
        {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(rows[0]);
    } 
    catch (err) 
    {
        console.error('Error fetching task by ID:', err);
        res.status(500).json({ message: 'Error fetching task' });
    }
}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getTasks,
    getTaskById
}

