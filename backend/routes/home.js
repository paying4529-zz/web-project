import express from "express"
const router =  express.Router();

router.get('/', (req, res) => {
    res.send('GET is evoked');
    console.log("GET is evoked")
});
router.post('/', (req, res) => {
    console.log(req.body.text);
    res.send('Received a POST HTTP method');
    // cmd:    curl -X POST -H "Content-Type: application/json" -d "{\"text\": \"Hi again, World\"}" http://localhost:4000
    // output: Received a POST HTTP method
});
router.put('/', (req, res) => {
    res.send('Received a PUT HTTP method');
});
router.delete('/', (req, res) => {
    res.send('Received a DELETE HTTP method');
});

export default router