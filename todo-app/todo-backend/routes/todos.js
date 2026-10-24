const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const redis = require('../redis');

/* GET all todos. */
router.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.find({});
    res.send(todos);
  } catch (err) {
    next(err);
  }
});

/* POST a new todo. */
router.post('/', async (req, res, next) => {
  try {
    const todo = await Todo.create({
      text: req.body.text,
      done: false,
    });

    await redis.incr('todoCounter');

    res.status(200).send(todo);
  } catch (err) {
    next(err);
  }
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    req.todo = await Todo.findById(id);

    if (!req.todo) {
      return res.sendStatus(404);
    }

    next();
  } catch (err) {
    next(err);
  }
};

/* DELETE a todo. */
singleRouter.delete('/', async (req, res, next) => {
  try {
    await req.todo.deleteOne();

    await redis.decr('todoCounter');

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

/* GET a single todo. */
singleRouter.get('/', (req, res) => {
  res.json(req.todo);
});

/* UPDATE a todo. */
singleRouter.put('/', async (req, res, next) => {
  try {
    const { text, done } = req.body;

    if (text === undefined && done === undefined) {
      return res.status(400).json({
        error: 'At least one of text or done must be provided',
      });
    }

    if (text !== undefined && typeof text !== 'string') {
      return res.status(400).json({
        error: 'text must be a string',
      });
    }

    if (done !== undefined && typeof done !== 'boolean') {
      return res.status(400).json({
        error: 'done must be a boolean',
      });
    }

    if (text !== undefined) req.todo.text = text;
    if (done !== undefined) req.todo.done = done;

    await req.todo.save();

    res.json(req.todo);
  } catch (err) {
    next(err);
  }
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;