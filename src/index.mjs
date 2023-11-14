import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 3000;

const prisma = new PrismaClient();

app.use(cors());

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.get('/users', async (_req, res) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
  }
});

app.post('/user/add', async (_req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: 'Rich',
        email: 'hello@prisma.com',
        posts: {
          create: {
            title: 'My first post',
            body: 'Lots of really interesting stuff',
            slug: 'my-first-post',
          },
        },
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: true });
  }
});

app.post('/user/update', async (_req, res) => {
  const user = await prisma.user.update({
    where: {
      name: 'Rich',
    },
    data: {
      name: 'Rich',
      email: 'hello@prisma.com',
      posts: {
        create: {
          title: 'My first post',
          body: 'Lots of really interesting stuff',
          slug: 'my-first-post',
        },
      },
    },
  })
  res.status(201).json(user);
});

app.post('/user/delete', async (_req, res) => {
  const user = await prisma.user.delete({
    where: {
      name: 'Rich',
    },
  });
  res.status(204).json(user);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
