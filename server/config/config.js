


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
    dbURL = 'mongodb://admin:superadmin1@ds131531.mlab.com:31531/ecommercedb'
}


process.env.DBURL = dbURL;