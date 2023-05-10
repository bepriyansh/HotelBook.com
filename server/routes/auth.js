import Express from "express";
const router = Express.Router();

router.get('/', (req, res)=> {
    res.send("Hello from authRoutes");
})  
router.get('/register', (req, res)=> {
    res.send("Hello from auth/register");
})

export default router;