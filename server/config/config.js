


//==========
// PORT
//==========


process.env.PORT = process.env.PORT || 8080



//==========
// ENVIROMENT
//==========

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//==========
// DATA BASE
//==========

let dbURL;

 if( process.env.NODE_ENV === 'dev'){

    dbURL = 'mongodb://localhost:27017/ecommerceTest'
} else{
    dbURL = MONGO_URL
}


process.env.DBURL = dbURL;