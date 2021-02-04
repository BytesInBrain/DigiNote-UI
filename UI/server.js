const express  = require('express')
const morgan = require('morgan')
var bodyParser = require('body-parser')
app = express()
app.use(morgan('dev'))

app.use(express.static(__dirname + '/static'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.render('notebook')
})

app.get('/notebook/:id',(req,res)=>{
    res.render('index')
})


app.listen(5001,()=>console.log("Server started on port 5001"))