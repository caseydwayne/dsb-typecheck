(function(){

  /* @method typecheck
   * returns the real type of an object
   * @param {any} check object to check
   * @return {string} truetype (object, array, regexp, ...)
   * @native
   */
  
  
  var lowercase = function(v){ return String.prototype.toLowerCase.call( v || this ); };
  var defined = require('dsb-defined');
  var toString = require('dsb-to-string');
  var root = this;
  var rx = /\[\w+ (.*)\]/;
  
  
  var typecheck = function(check, extra){ // advanced type-checking made easy
    var x, c, u = 'undefined';
    if( defined( this ) ){
      x = this; c = check;//, u = true;
    } else {
      x = check; c = extra || false;
    }
    //if( c === 'undefined' && u ) return true;
    var t, m, r, f;
    t = toString( x ); //Object.prototype.toString.call(     
    if( t === toString(root) ) return c ? c === u : u;
    m = t.match( rx );
    r = m.length > 1 ? lowercase( m[1] ) : t;
    
    f = typeof c === 'string' ? r.indexOf( lowercase( c ) ) >-1 : r;
    //alert( 'Found '+t+' | stripped: '+r+' | check: '+c+' contains? '+f ); 
    return f;
  };  
  
  return module.exports = typecheck;

}());