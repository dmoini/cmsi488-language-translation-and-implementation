const ohm = require("ohm-js");

const GRAMMARS = {
  CanadianPostalCode: `CanadianPostalCode {
    exp               = firstHalf space secondHalf              --code
    firstHalf         = firstAlpha digit goodAlpha
    secondHalf        = digit goodAlpha digit
    firstAlpha        = ~badFirst upper
    goodAlpha         = ~badAlpha upper 
    badAlpha          = "D" | "F" | "I" | "O" | "Q" | "U"
    badFirst          = badAlpha | "W" | "Z"
  }`,
  
  Visa: `Visa {
    exp               = "4" lastDigits
    lastDigits        = threeDigits threeDigits threeDigits threeDigits threeDigits?
    threeDigits       = digit digit digit
  }`,
  
  MasterCard: `MasterCard {
    exp               = firstDigits lastDigits
    firstDigits       = caseA | caseB
    caseA             = "5" "1".."5" digit digit          
    caseB             = "222" digit                             --rangeOne
                      | "22" "3".."9" digit                     --rangeTwo
                      | "2" "3".."6" digit digit                --rangeThree
                      | "27" "0".."1" digit                     --rangeFour
                      | "2720"                         
    lastDigits        = fourDigits fourDigits fourDigits 
    fourDigits        = digit digit digit digit
  }`,
  
  AdaFloat: `AdaFloat {
    numlit            = exp
    exp               = baselit 
                      | declit
    declit		        = numeral ("." numeral)? exponent?
    baselit			      = base "#" basenum ("." basenum)? "#" exponent?
    exponent          = ("e" | "E") ("+" | "-")? numeral
    basenum			      = hexDigit+ ("_" hexDigit+)* 			
    numeral           = digit+ ("_" digit+)*					
    base 				      = ("1".."2") digit     					          --tensAndTwenties
                      | "3" "0".."2"       				              --thirties
                      | "2".."9"							                  --twoToNine
  }`,
  
  NotThreeEndingInOO: `NotThreeEndingInOO {
    exp               = (overThreeString | threeString | oneTwoStrings)?
    oneTwoStrings     = letter letter?
    threeString       = letter ~(caseInsensitive<"oo">) letter letter 
    overThreeString   = letter letter letter letter+
  }`,
  
  DivisibleBy32: `DivisibleBy32 {
    exp          	    = (~("00000" end) ("0" | "1"))* "00000"		--nonZero
    				          | "0" "0"? "0"? "0"?				              --zero
}`,
  
  TwoThroughThirtySix: `TwoThroughThirtySix {
    number            = "1".."2" "0".."9"                       --tensAndTwenties
                      | "3" "0".."6"                            --thirties
                      | "2".."9"
  }`,
  
  // TODO: double check with Toal
  MLComment: `MLComment {
    comment           = "(*" exp "*)" 
    exp               = (~"*)" any)*                            --notComment
  }`,
  
  // TODO
  // NotForFileFindNoLookAround: `NotForFileFindNoLookAround {
  //   exp               = (noFile | noFor | noFind | other)?
  //   noFile            = "fil" ("a".."d" | "f".."z") | "file" letter+ | letter+ "file"
  //   noFor             = "fo" ("a".."q" | "s".."z") | "for" letter+ | letter+ "for"
  //   noFind            = "fin" ("a".."c" | "e".."z") | "find" letter+ | letter+ "find"
  //   other             = ("a".."e" | "g".."z") letter+                      --nonF
  //                     | "f" ("a".."h" | "j".."n" |"p".."z") letter+       --f
  //                     | "fi" ("a".."k" | "m" | "o".."z") letter+          --fi
  //                     | "fo" ("a".."q" | "s".."z") letter+                --fo
  // }`,
  NotForFileFindNoLookAround: `NotForFileFindNoLookAround {
    exp               = (other | noFile | noFind | noFor)?
    noFor             = foString | fString                                --noFor
    noFile            = filString | fiString | fString                    --noFile
    noFind            = finString | fiString | fString                    --noFind
    other             = forString | fileString | findString | noFString   --other        
    noFString         = ("a".."e" | "g".."z") letter+                     --noFString
    fString           = "f" (("a".."h" | "j".."n" | "p".."q") letter*)?   --fString
    foString          = "fo" (("a".."q" | "s".."z") letter*)?             --foString
    fiString          = "fi" (("a".."k" | "m" | "o".."z") letter*)?       --fiString
    filString         = "fil" (("a".."d" | "f".."z") letter*)?            --filString
    finString         = "fin" (("a".."c" | "e".."z") letter*)?            --finString
    forString         = "for" letter+                                     --letterFor
                      | letter+ "for"                                     --forLetter
    fileString        = "file" letter+                                    --letterFile
                      | letter+ "file"                                    --fileLetter
    findString        = "find" letter+                                    --letterFind
                      | letter+ "find"                                    --findLetter
  }`,

  
  NotForFileFindWithLookAround: `NotForFileFindWithLookAround {
    exp               = ~badWords (A-Za-z)*
    badWords          = ("file" | "for" | "find") end
  }`
}

Object.entries(GRAMMARS).forEach(([name, grammar]) => {
  exports[`is${name}`] = (s) => ohm.grammar(grammar).match(s).succeeded();
})