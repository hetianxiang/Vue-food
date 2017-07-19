// 后台只提供接口，前端只调用接口
let http = require('http');
let fs = require('fs');
let url = require('url');
let sliders = require('./slider');
function read(callback) {
  fs.readFile('./food.json','utf8',function (err,data) {
    data = data.length===0?[]:JSON.parse(data);
    callback(data);
  });
}
/**
 *
 * @param data 要写入的数据
 * @param callback 写入成功后的回调
 */
function write(data,callback) {
  fs.writeFile('./food.json',JSON.stringify(data),callback)
}


http.createServer(function (req,res) {
  let {pathname,query} = url.parse(req.url,true);
  let id = query.id; //如果传递id 将id保留下来
  if(pathname === '/api/slider'){
    return res.end(JSON.stringify(sliders));
  }
  if(pathname === '/api/hot'){
      read(function (data) { //data表示读到的结果
        var foods = data.reverse().slice(0,9);
            res.end(JSON.stringify(foods));
      });
      return;
  }
  // 美食的增删改查
  if(pathname === '/api/food'){
    switch (req.method){
      case 'GET':
        if(id){ //获取美食
          read(function (foods) {
            let food = foods.find(item=>item.id == id);
            res.end(JSON.stringify(food));
          })
        }else{
          read(function (data) {//data代表所有数据
            res.end(JSON.stringify(data));
          });
        }
        break;
      case 'POST':
        //发送过来的请求体默认就是对象格式{}
        var str = '';
        req.on('data',function (data) {
          str+=data;
        });
        req.on('end',function () {
          var food = JSON.parse(str);
          read(function (foods) { //读取所有的美食 获取最后一项的id 累加
            food.id = foods.length>0?foods[foods.length-1].id+1:1;
            foods.push(food);//将新书放回去
            write(foods,function () {
              res.end(JSON.stringify(food));
            })
          });
        });
        break;
      case 'DELETE':
        // /api/food?id=1;
        read(function (foods) {
          foods = foods.filter(item=>id!=item.id);
          write(foods,function () {
            res.end(JSON.stringify({}));
          });
        });
        break;
      case 'PUT':
        var str = '';
        req.on('data',function (data) {
          str+=data;
        });
        req.on('end',function () {
          //food代表的是要修改成什么样
          let food = JSON.parse(str);
          read(function (foods) {
            foods = foods.map(item=>{
                if(item.id == id){
                  return food;
                }
                return item;
            });
            write(foods,function () {
                res.end(JSON.stringify(food));
            });
          })
        });
        break;
    }
  }
}).listen(3000,function () {
  console.log('success');
});
