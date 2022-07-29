const Express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const jsforce = require('jsforce');
const redir = process.env.REDIRECT_URI || "http://localhost:" + PORT + "/token";
console.log('redir:', redir);
const {SF_LOGIN_URL, SF_USERNAME, SF_PASSWORD} = process.env;
const app = new Express();
app.use(Express.json());

const conn = new jsforce.Connection({
    loginUrl: SF_LOGIN_URL
});

conn.login(SF_USERNAME, SF_PASSWORD, (error, userInfo) => {
    if (error) {
        console.error(error);
    } else {
        // console.log('User Id: ', userInfo.id);
        // console.log('Org Id: ', userInfo.organizationId);
        // console.log(conn.accessToken);
        // console.log(conn.instanceUrl);
    }
});

app.post('/', (req, res) => {
    // console.log(req.body);
    res.status(200).json(`Server worked with redirect ${redir}`);
})

app.get('/', (req, res) => {
    conn.query("SELECT Id, Name FROM Account", function(err, result) {
        if (err) { return console.error(err); }
        // console.log("total : " + result.totalSize);
        // console.log("fetched : " + result.records.length);
        // console.log("total : ", result.records);
        res.status(200).json(result.records);
    });

})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
