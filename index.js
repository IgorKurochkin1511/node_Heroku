const Express = require('express');
const PORT = process.env.PORT || 5000;

const app = new Express();
app.use(Express.json());

app.post('/', (req, res) =>{
    console.log(req.body);
    res.status(200).json('Server worked');
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
