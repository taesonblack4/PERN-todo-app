const express = require('express');
const cors = require('cors');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/todos', async (req, res) => {
    const todos = await prisma.todo.findMany();
    res.json(todos);
});

app.post('/todos', async (req, res) => {
    const { title } = req.body;
    const todo = await prisma.todo.create({
        data: {title}
    })
    res.json(todo);
});


app.put('/todos/:id', async (req,res) => {
    const { id } = req.params;
    const {title, completed} = req.body;
    const todo = await prisma.todo.update({
        where: {id: parseInt(id)},
        data: {title, completed}
    })

    res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
    const {id} = req.params;
    await prisma.todo.delete({
        where: {id: parseInt(id) }
    })
    res.json('todo deleted');
});

app.listen(3000, () => {
    console.log('App is running');
});