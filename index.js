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
    
  
  var typecheck = function(check, against, strict){ // advanced type-checking made easy
    
    //setup
    var c, a, s = true, u = 'undefined';

/*---------------------------------------------------------------------*/

    var resolve = function(){
      
      var _c = defined( check ), 
          _a = defined( against ),
          _s = defined( strict );
      
      if(DEBUG){
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
      if( _c  ){
        //assign check
        c = check;
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
            return "typecheck( check, strict )";
          }          
        }
        return "typecheck( check )";
      }      
    };
    
    var signature = resolve();

/*---------------------------------------------------------------------*/

    //the business logic
    
    //setup
    var t, m, r, f;
    
    //Object.prototype.toString.call by default
    t = toString( c ); 
    
    //if not strict, try to do a soft {toString} conversion
    if( !s ) try { t = c.toString(); } catch (e){};
    
    //return undefined if {check} is root object
    if( t === toString(root) ){      
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

    if( DEBUG ){
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
}(false));