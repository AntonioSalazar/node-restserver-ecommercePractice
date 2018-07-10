


//==========
// PORT
//==========


process.env.PORT = process.env.PORT || 8080



//==========
// ENVIROMENT
//==========

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//==========
// TOKEN EXPIRATION DATE
//==========


process.env.EXP_TOKEN =  60 * 60 * 24 * 30;



//==========
// AUTHENTICATION SEED

process.env.SEED = process.env.SEED || 'this-is-the-development-seed';

//==========

//==========
// DATA BASE
//==========

let dbURL;

 if( process.env.NODE_ENV === 'dev'){

    dbURL = 'mongodb://localhost:27017/ecommerceTest'
} else{
    dbURL = process.env.MONGO_URL
}


process.env.DBURL = dbURL;