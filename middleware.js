const koa =require('koa');
const app=new koa();


app.use((ctx, next) => {
    const start = Date.now();
    return next().then(() => {
      const ms = Date.now() - start;
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
  });

app.use((ctx, next)=>{
    ctx.body="hello koa js ";
})


app.listen(3001, ()=>{
    console.log("server is running");
})