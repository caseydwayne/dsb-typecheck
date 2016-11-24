module.exports = (function(DEBUG){
/*---------------------------------------------------------------------*/

  //setup the vitals
  
  var root = this;
  var defined = require('dsb-defined');
  var toString = require('dsb-to-string');  
  var rx = require('dsb-rx/objectType');
  var lowercase = function(v){
    return String.prototype.toLowerCase.call( v );
  };  
  
/***********************************************************************/

  /* @method typecheck
   * returns the real type of an object
   * @param check {any} object to check
   * @param [against] {string} string to check type against (via contains())
   * @param [strict] {boolean} if false, will do a shallow typecheck (may not be true type, but useful for some scenarios)
   * @return truetype {string} i.e., object, array, regexp, ...
   * @native supported
   */
  
/*---------------------------------------------------------------------*/
    
  
  var typecheck = function( check, against, strict ){ // advanced type-checking made easy
    
    //setup
    var c = check, a = against, s = true, u = 'undefined', undefined, z;

/*---------------------------------------------------------------------*/

    var resolve = function(){
      
      var _c = defined( check ), //root adaption handled later
          _a = defined( against ),
          _s = defined( strict );
      
      if( DEBUG > 3 ){
        console.log( { cd: _c, ad: _a, sd: _s } );
      }
      
      
      //check for full
      if( _s ){
        if( typeof strict === 'boolean' ){
          c = check;
          a = against;
          s = strict;
          return "typecheck( check, against, strict )";
        }
      }
      //make sure something is there to check
      if( _c ){ 
        //resolve against/strict
        if( _a ){
          //check for standard
          if( typeof against === 'string' ){
            a = against;
            return "typecheck( check, against )";
          }          
          //check for typecheck(soft)
          if( typeof against === 'boolean' ){
            s = against;
            a = undefined;
            return "typecheck( check, strict )";
          }          
        }
        return "typecheck( check )";
      }
    };
    
    var signature = resolve();
     
/***********************************************************************/

    //handle undefined {check}
    if( typeof c === 'undefined' ){      
      return defined(a) 
        ? ( a === u ) //there can only be 1 correct answer for {a} (undefined, 'undefined')
        : u; //return 'undefined' as type if no {against} provided
    }
    
    //setup
    var t, m, r, f;
    
    //Object.prototype.toString.call by default
    t = toString( c ); 
    
    //if not strict, try to do a soft {toString} conversion
    if( !s ) try { t = c.toString(); } catch (e){};
    
    //return undefined if {check} is root object
    //v1.2: removed to allow real item type (global|window|other)
    if( false && t === toString(root) ){
      if( DEBUG ) console.log('returning global object',t,'as',u);
      return a ? a === u : u;
    }
    
    //attempt to match
    m = t.match( rx );
    
    //register match or set {r} as type string
    r = m && m.length > 1 ? lowercase( m[1] ) : t;    
    //console.log(r);
    //if against is a string, check against check's {r}
    f = (typeof a === 'string') ? r.indexOf( lowercase( a ) ) >-1 : r;    
    
/*---------------------------------------------------------------------*/

    if( DEBUG > 2 ){
      console.log('\n-----------------------');
      
      console.log('Calling '+signature );
      var to = { check: c, against: a, strict: s, returning: f };
      console.log( require('dsb-printr')( to ) );
      console.log('-----------------------\n');
    }
    
/*---------------------------------------------------------------------*/

    return f;

/*---------------------------------------------------------------------*/
    
  };//end typecheck
  
/***********************************************************************/  

  return typecheck;

/*---------------------------------------------------------------------*/
}(1));