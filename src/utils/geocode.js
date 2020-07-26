const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic291cmFiaDExIiwiYSI6ImNrY3hianF3MTA0Y2kyc29wdWF1bWhiZGIifQ.R-xxVEjDmr73fYfAxUmeJA&limit=1'
    request({url, json:true},(error, {body})=>{                                  // request({url:url, json:true},(error,response)=>{ 
                if(error){                                                  //we have used shorthand property in url:url
               callback('No internet connection',undefined)           // we have used destructuring property in response and used body
           }                                                            //we have used ES-6 properties here
           else if(body.features.length===0){
               callback('Re-check Location',undefined)
                    }
           else{ 
               callback(undefined,{
                    lat:body.features[0].center[1],
                     long:body.features[0].center[0],
                     location:body.features[0].place_name
               })
          
               }
})
}
module.exports=geocode