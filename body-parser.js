const koa =require('koa');
const Validator = require('validatorjs');
const bodyParser = require('koa-bodyparser');


const app=new koa();
app.use(bodyParser());

const validationRules={
    name: 'required|string',
    age: 'required|integer|min:18',
}

app.use(async(ctx, next)=>{
    try{
       const validator=new Validator(ctx.request.body, validationRules);
       if(validator.fails()){
        ctx.status=400;
        ctx.body={errors:validator.errors.all()};
        console.log(validator.errors.all());

       }else{
        await next();
       }
    }
    catch(err) {
      ctx.status=500;
      ctx.body={error: 'Internal Server Error'};
      console.log("server error");
    }
})


app.use(async(ctx, next)=>{
    ctx.body="hello koa";
    ctx.status=200;
    ctx.body={message:"data received successfully"};
});


app.listen(3001, ()=>{
    console.log("server is running port 3001");
})

