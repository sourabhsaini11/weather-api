const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast') 

const app=express()

//Define Path for express config
const publiDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publiDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather',
        name:'Madara'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About',
        name:'Madara'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help',
        name:'Madara'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'Must provide an address'
        })
    }

    geocode(req.query.address,(error, {lat, long, location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(lat,long, (error, forecastData )=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/products',(req, res)=>{
    if(!req.query.search) {
        return res.send({
            error:'You Must provide a searh term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[] 
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'Help',
        name:'Madara',
        errormessage:'Help Article not Found'

    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'Madara',
        errormessage:'Page not Found'
    })
})

app.listen(3000,()=>{
    console.log('Up on 3000')
})


// const express=require('express')
// const path=require('path')
// const hbs=require('hbs')
// const geocode=require('./utils/geocode')
// const forecast=require('./utils/forecast') 

// const app=express()

// //Define Path for express config
// const publiDirectoryPath=path.join(__dirname,'../public')
// const viewsPath=path.join(__dirname, '../templates/views')
// const partialsPath=path.join(__dirname, '../templates/partials')

// //Setup handlebars engine and views location
// app.set('view engine','hbs')
// app.set('views', viewsPath)
// hbs.registerPartials(partialsPath)

// //Setup static directory to serve
// app.use(express.static(publiDirectoryPath))

// app.get('',(req, res)=>{
//     res.render('index',{
//         title:'Weather',
//         name:'Madara'
//     })
// })

// app.get('/about',(req, res)=>{
//     res.render('about',{
//         title:'About',
//         name:'Madara'
//     })
// })

// app.get('/help',(req, res)=>{
//     res.render('help',{
//         title:'Help',
//         name:'Madara'
//     })
// })

// app.get('/weather',(req, res)=>{
//     if(!req.query.address){
//         return res.send({
//             error:'Must provide an address'
//         })
//     }

//     geocode(req.query.address,(error, {lat, long, location}={})=>{
//         if(error){
//             return res.send({error})
//         }

//         forecast(lat,long, (error, forecastData )=>{
//             if(error){
//                 return res.send({error})
//             }

//             res.send({
//                 forecast:forecastData,
//                 location,
//                 address:req.query.address
//             })
//         })
//     })
// })

// app.get('/products',(req, res)=>{
//     if(!req.query.search) {
//         return res.send({
//             error:'You Must provide a searh term'
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         products:[] 
//     })
// })

// app.get('/help/*',(req, res)=>{
//     res.render('404',{
//         title:'Help',
//         name:'Madara',
//         errormessage:'Help Article not Found'

//     })
// })

// app.get('*',(req, res)=>{
//     res.render('404',{
//         title:'404',
//         name:'Madara',
//         errormessage:'Page not Found'
//     })
// })

// app.listen(3000,()=>{
//     console.log('Up on 3000')
// })