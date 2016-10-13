module.exports = (function(){
/*---------------------------------------------------------------------*/

  /*
   * typecheck test
   */
  
  var typecheck = require('./index'),
          debug = require('dsb-debugger').create('typecheck'),
           each = require('dsb-each');        
  
  
  var obj = {
    aval: 'value',
    typecheck: typecheck
  };
  
/*---------------------------------------------------------------------*/  
  
  /*    
   * typecheck
   */
  
  debug.method( 'typecheck', function( fn, test, name ){
    var p = debug.presets,
        u = 'undefined',
       _u,
       
        // type = string of what it should return
        // value = item to check against
        // callit = boolean to also test as 'this' method
        t = function(type, value, callit){
          
          var c = callit !== void 0 ? callit : true;
          
          //standard tests          
          var t = fn( value );
          test( type, t, type );
          
          //run inside another object
          var ti = obj[name]( value );
          test( type, ti, type );
          
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
        //console.log(p);
    //test each type of preset against each other
    each(p, function( v, k ){ t( k, v ); });
    //test undefined
    t( u, _u, false );
  }, typecheck );
 
   debug.complete();

/*---------------------------------------------------------------------*/
  
  return debug;

/*---------------------------------------------------------------------*/  
}());