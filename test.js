module.exports = (function(DEBUG){
/*----------------------------------------------------------------------------*/

  var typecheck = require('./index'),
          debug = require('dsb-debug-mini').create('typecheck'),
             __ = {
               //each: require('dsb-each'), //see note on line #53
               root: require('dsb-root'),
               env: require('dsb-env'),
               presets: require('dsb-debug-presets')
             };

/******************************************************************************/

  debug.method( 'typecheck', function( fn, test, name ){

/*----------------------------------------------------------------------------*/

    var p = __.presets,
        u = 'undefined',
       _u,

/*----------------------------------------------------------------------------*/

        // type = string of what it should return
        // value = item to check against
        t = function( type, value ){

          if( DEBUG > 1 ) console.log( 'checking', type, 'against', value );

          var arr = ( type === 'array' );

          var a = arr ? [value] : value;

          if( DEBUG ) console.log( 'checking if', a, 'is', type );

          if( DEBUG > 3 ) return;

          //standard tests (should return type as string)
          test( type, [a], type );

          //check against valid type (should return Boolean:true)
          test( type+' against '+type, [ value, type ], true );

          //check undefined against valid type (should return Boolean:false)
          test( u+' against '+type, [ _u, type ], false );

        };

/*----------------------------------------------------------------------------*/

    //test each type of preset against each other
    //__.each( p, function( v, k ){ t( k, v ); } ); //can't use dsb-each because dsb-each's test.js uses dsb-typecheck.
    var internal_test = function( v, k ){ t( k, v ); };
    for( var i in p ){
      var k = i, v = p[i];
      internal_test( v, k );
    }

/*----------------------------------------------------------------------------*/

    //test undefined
    test( 'undefined', _u, u );
    test( 'undefined(against)', [ _u, u ], true );

/*----------------------------------------------------------------------------*/

    //test root
    var e = ( __.env === 'node' ? 'global' : 'window' );
    test( 'root', __.root, e  );

/*----------------------------------------------------------------------------*/

  }, typecheck );

/******************************************************************************/

  return debug.complete();

/*----------------------------------------------------------------------------*/
}(0));
