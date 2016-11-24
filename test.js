module.exports = (function(){
/*---------------------------------------------------------------------*/
  
  var typecheck = require('./index'),
          debug = require('dsb-debugger').create('typecheck'),
           each = require('dsb-each');
  
  
  var obj = {
    aval: 'value',
    typecheck: typecheck
  };

/***********************************************************************/
  
  debug.method( 'typecheck', function( fn, test, name ){

/*---------------------------------------------------------------------*/

    var p = debug.presets,
//        p = { object: { my: 'obj' } },
        u = 'undefined',
       _u,

/*---------------------------------------------------------------------*/

        // type = string of what it should return
        // value = item to check against
        // callit = boolean to also test as 'this' method
        t = function(type, value, callit){
          
          var c = callit !== void 0 ? callit : true;
          
          //standard tests (should return type as string)
          var t = fn( value );
          test( type, t, type );
          
          //check against valid type (should return Boolean:true)
          var t2 = fn( value, type );
          test( type+' against '+type, t2, true );
          
          //check undefined against valid type (should return Boolean:false)
          var t2 = fn( _u, type );
          test( u+' against '+type, t2, false );
          
          //run inside another object to ensure no 'this' conflict 
          //var ti = obj[name]( value ); test( type+'(in object)', ti, type );
          
          //if call boolean is set, attempt as native
          if( c ){
            var ok;
            try {
              ok = fn.call( value, type );
            }
            catch(error){
              debug.log( 'Native support is unavailable on '+name );
            }
            //console.log('ok returning ',ok);
            //if( ok ) test( type+' *call', ok, true );
          }
        };

/*---------------------------------------------------------------------*/

    //test each type of preset against each other
    each( p, function( v, k ){ t( k, v ); } );

/*---------------------------------------------------------------------*/

    //test undefined
    test( 'undefined', fn( _u ), u );
    test( 'undefined(against)', fn( _u, u ), true );
    
/*---------------------------------------------------------------------*/

    //test root
    var root = require('dsb-root'),
         env = require('dsb-env');
         
    test( 'root', fn( root ), ( env === 'node' ? 'global' : 'window' ) );
    
/*---------------------------------------------------------------------*/
    
  }, typecheck );
  
 /***********************************************************************/
 
  debug.complete();

/*---------------------------------------------------------------------*/
  
  return debug;

/*---------------------------------------------------------------------*/  
}());