(function(){
  
  /*
   * typecheck test
   */
  
  var typecheck = require('./index'),
          debug = require('dsb-debugger').create('typecheck'),
           each = require('dsb-each');        
  
  
  
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
          test( type, fn( value ), type );
          if( c ){
            try {
              test( type+' *call', fn.call( value, type ), true );
            }
            catch(error){}
          }
        };
    //test each type of preset against each other
    each(p, function( v, k ){ t( k, v ); });
    //test undefined
    t( u, _u, false );
  }, typecheck );
 
   debug.complete();
  /**/        
}());