const request=require('request')
const forecast=(lat,long,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&%20exclude=hourly,daily&appid=1b1b6b66a60a2fbb24fbed7ccb9a3a0f&units=metric'
   
   
   
        request({url, json:true},(error,{body})=>{                   // request({url:url, json:true},(error,response)=>{ 
            if(error){                                                     //we have used shorthand property in url:url
                callback('No internet connection',undefined);           // we have used destructuring property in response and used body
            }                                                           //we have used ES-6 properties here
            else if(body.message){
                callback('Re-check Location',undefined);
            }
            else{
            //  const str=response.body.daily[0].weather[0].description+' It is currently '+response.body.current.temp+' degrres out.'
            console.log(body.daily[0].weather[0]);
               callback(undefined,body.daily[0].weather[0].description+' It is currently '+body.current.temp+' degrees out.Maximum Recorded Temperature is '+body.daily[0].temp.max+' degrees while Minimum Recorded Temperature is '+body.daily[0].temp.max+' degrees.')
           }
        })
}
module.exports=forecast
