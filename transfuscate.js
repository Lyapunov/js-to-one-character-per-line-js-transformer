#!/usr/bin/node 
var args = process.argv.slice(2);

if ( args.length != 1 ) {
   console.log("USAGE:");
   console.log("   ./transfuscate.js '[javascript code, no tabs, no carriage returns, just ascii chars between 32-126]'");
   console.log();
   console.log("EXAMPLE:");
   console.log("   ./transfuscate.js 'console.log(\"Hello world!\");'");
   console.log("   ./transfuscate.js 'console.log(global);'");
   console.log("   ./transfuscate.js 'x = 5; y = 3;console.log(\"The result is\", x + y);'");
   console.log("   ./transfuscate.js 'x=1;y=1;while(y < 10000){z=y;y=x+y;x=z;console.log(x)};'");
   process.exit(0);
}

// Example:
// var targetCode = 'x = 5; y = 3;console.log("The result is", x + y)'
var targetCode = args[0];

// Generate auxiliary variables for the ascii transcription, for ascii values between 32-126
var transcriptionTable={};
{
   var counter = 0;
   var currentVar = "";
   var backtick = "`";
   for ( var i=32; i<127; ++i ) {
      if ( counter % 5 == 0 ) {
         if ( i > 32 ) {
            console.log(backtick);
            console.log(";");
         }
         currentVar = ( String.fromCharCode(97+(counter/5)) )
         console.log(currentVar);
         console.log("=");
         console.log(backtick);
      }
      console.log( i == 96 ? "#" :  String.fromCharCode(i) );
      transcriptionTable[String.fromCharCode(i)] = currentVar + "\n[\n" + (1 + ( counter % 5 ) * 2).toString() + "\n]";
      ++counter;
   }
   console.log(backtick);
}

function transcribeString(str) {
   var retval = [];
   str.split("").forEach( function (x){
      var trans = transcriptionTable[x];
      if ( trans == undefined ) {
         throw "Ooops";
      }
      retval.push( trans ); 
   } );
   return retval.join("\n+\n");
}

// Generate the portions of the secret weapon:
// ""["trim"]["bind"]("a")["constructor"]("console.log('Hello world')")();
// variable t is for trim
// variable u is for bind
// variable v is for contructor
// variable w is for the code
{
   console.log("t");
   console.log("=");
   console.log(transcribeString("trim"));
   console.log(";");
   console.log("u");
   console.log("=");
   console.log(transcribeString("bind"));
   console.log(";");
   console.log("v");
   console.log("=");
   console.log(transcribeString("constructor"));
   console.log(";");
   console.log("w");
   console.log("=");
   console.log(transcribeString(targetCode));
   console.log(";");
}

// Now there is nothing else to do than printing the secret weapon out.
// t[t][u](t)[v](w)();
{
   console.log("t");
   console.log("[");
   console.log("t");
   console.log("]");
   console.log("[");
   console.log("u");
   console.log("]");
   console.log("(");
   console.log("t");
   console.log(")");
   console.log("[");
   console.log("v");
   console.log("]");
   console.log("(");
   console.log("w");
   console.log(")");
   console.log("(");
   console.log(")");
}
