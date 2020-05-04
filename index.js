module.exports = (function(DEBUG){
/*----------------------------------------------------------------------------*/

  //setup the vitals
  var defined = require('dsb-defined');
  var toString = require('dsb-to-string');

  var rx, lowercase;

  if( typeof dsb === 'object' ) {
    rx = require('dsb-rx/objectType');
    lowercase = require('dsb-lowercase');
  } else {
    rx = /\[\w+ (.*)\]/;
    lowercase = function(v){
      return String.prototype.toLowerCase.call( v );
    };
  }

/******************************************************************************/

  /*
   * @method typecheck
   * advanced type-checking made easy (or returns the real type of an object)
   * @param check {any} object to check
   * @param [against] {string} string to check type against (via contains())
   * @param [strict=true] {boolean} if false, will do a shallow typecheck (may not be true type, but useful for some scenarios)
   * @return truetype {string} i.e., object, array, regexp, ...
   */

/*----------------------------------------------------------------------------*/


  var typecheck = function( check, against, strict ){

    //setup
    var c = check, a = against, s = true, u = 'undefined', undefined;

/*----------------------------------------------------------------------------*/

    var resolve = function(){

      var _c = defined( check ), //root adaption handled later
          _a = defined( against ),
          _s = defined( strict );

      if( DEBUG > 3 ){
        console.log( { cd: _c, ad: _a, sd: _s } );
      }

      //check for full signature
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

/******************************************************************************/

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

    //attempt to match
    m = t.match( rx );

    //register match or set {r} as type string
    r = m && m.length > 1 ? lowercase( m[1] ) : t;

    //if against is a string, check against check's {r}
    f = (typeof a === 'string') ? r.indexOf( lowercase( a ) ) >-1 : r;

/*----------------------------------------------------------------------------*/

    if( DEBUG > 2 ){
      console.log('\n-----------------------');
      console.log('Calling '+signature );
      var to = { check: toString(c), against: a, strict: s, returning: f };
      //printr is probably headed for open-source, but not declared yet
      //console.log( require('dsb-printr')( to ) );
      console.log(to);
      console.log('-----------------------\n');
    }

/*----------------------------------------------------------------------------*/

    return f;

/*----------------------------------------------------------------------------*/

  };//end typecheck

/******************************************************************************/

  return typecheck;

/*----------------------------------------------------------------------------*/
}(0));
