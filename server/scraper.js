const request = require('request-promise');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const axios = require( 'axios');
const Amazonlisting = require('./models/amazonProduct');

const data = [];

    connectToMongoDb = async () => {
        await mongoose.connect(
            'mongodb+srv://pranjali4ever:Lalit6113@cluster0.wlmw4gp.mongodb.net/RateChecker?retryWrites=true&w=majority',{ useNewUrlParser: true }
            );
        console.log('connected to MongoDb');
    }

const searchItem = [
    'shirts',
    'jeans',
    'pants',
    'redmi 5',
    'redmi 6',
    'latestmobiles'
]

//named export not a default export.
module.exports = {
    amazon : () => {
            for(index = 0; index <= searchItem.length; index++){
            amazonHeader = async () =>{
                
                    const result = await axios.get('https://www.amazon.in/s?k=shirts', {});
                    const $ = await cheerio.load(result);
                    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
                    console.log($)
                  
                    $('.s-result-item div').each((i,el)=> {
                        console.log("Inside for loop");
                        const id = $(el).attr('data-asin');
                        console.log("ID:"+id)
                        const brand = $(el).find('h5 .a-size-base-plus').text();
                        const name = $(el).find('h2 span').text();  
                        const price = $(el).find('.a-price-whole').text();
                        const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
                        const image = $(el).find('.s-image').attr('src');
                        const link = 'https://www.amazon.in'+$(el).find('.a-link-normal').attr('href');
                        const datas = {id,brand,name,price,rating,image,link};
                        data.push(datas)
                         Amazonlisting.create({
                              id : id,
                              brand: brand,
                              name: name,
                              price:price,
                              rating:rating,
                              image:image,
                              link:link
                          })
                          .then((listing)=> {
                              console.log(listing)
                          }); 
                        
                    });
                
            return data;
        }
     
         
        
        const main = async () =>{
            await connectToMongoDb();
            const amazonHead = await amazonHeader();
            console.log("Total scrapped : " + amazonHead.length);
          return amazonHead;
        }

        main();
        }
    } 
}