const Koa = require('koa');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(bodyParser());  // 解析request的body

const router = require('koa-router')()
router.get('/', async (ctx, next) => {
	// todo
})
app.use(router.routes());
app.listen(9000);
console.log('app started at port 9000...123')

const conn = mongoose.createConnection(

  // 连接地址，MongoDB 的服务端口为27017
  // dbtest是我要使用的数据库名，当往其中写数据时，MongoDB 会自动创建一个名为dbtest的数据库，不用事先手动创建。
  'mongodb://127.0.0.1:27017/admin', 

  // 一些兼容配置，必须加，你不写运行的时候会提示你加。
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
   }
)
conn.on('open', () => {
	console.log('打开 mongodb 连接');
})
conn.on('err', (err) => {
	console.log('err:' + err);
})

// 创建schema
let PeopleSchema = new mongoose.Schema({
   name: String,
   age: Number
})

// 通过connection和schema创建model
let People = conn.model('peoples', PeopleSchema);

// 通过实例化model创建文档
let studentDoc = new People({
    name: '崔鹏飞111',
    age: 30
})

// 将文档插入到数据库，save方法返回一个Promise对象。
studentDoc.save().then((doc) => {
    console.log(doc)
})