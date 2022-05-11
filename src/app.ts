import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.post("/register", async(req: Request, res: Response) => {
    const {name, email, password} = req.body;
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password
        },
    });
    res.json(user);
});


app.post("/login", async (req: Request, res: Response) => {
    const {email, password} = req.body;
    
})
app.get("/", async (req, res) => {
    res.send("ola");
})

app.listen(4000, () => console.log('Server is running on port 4000.'));