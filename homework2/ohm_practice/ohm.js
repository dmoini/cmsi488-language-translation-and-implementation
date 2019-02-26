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
  
  MLComment: `MLComment {
    comment           = "(*" exp "*)" 
    exp               = (~"*)" any)*                            --notComment
  }`,

  NotForFileFindNoLookAround: `NotForFileFindNoLookAround {
    exp               = noF | for | fo | file | find | fil | fin | fi | f                 --valid
    f                 = "f" (("a".."h" | "j".."n" | "p".."q" | "A".."Z") asciiLetter*)?   --f
    fi                = "fi" (("a".."k" | "m" | "o".."z" | "A".."Z") asciiLetter*)?       --fi
    fin               = "fin" (("a".."c" | "e".."z" | "A".."Z") asciiLetter*)?            --fin
    find              = asciiLetter+ "find"                                               --letterFind
                      | "find" asciiLetter+                                               --findLetter
                      | asciiLetter+ "find" asciiLetter+                                  --letterFindLetter
    fil               = "fil" (("a".."d" | "f".."z" | "A".."Z") asciiLetter*)?            --fil
    file              = asciiLetter+ "file"                                               --letterFile
                      | "file" asciiLetter+                                               --fileLetter
                      | asciiLetter+ "file" asciiLetter+                                  --letterFileLetter
    fo                = "fo" (("a".."q" | "s".."z" | "A".."Z") asciiLetter*)?             --fo
    for               = asciiLetter+ "for"                                                --letterFor
                      | "for" asciiLetter+                                                --forLetter
                      | asciiLetter+ "for" asciiLetter+                                   --letterForLetter
    noF               = ~"f" asciiLetter*                                                 --noF
    asciiLetter       = "a".."z" | "A".."Z"                                               --asciiLetter
  }`,

  
  NotForFileFindWithLookAround: `NotForFileFindWithLookAround {
    exp               = ~badWords asciiLetter*
    badWords          = ("file" | "for" | "find") end
    asciiLetter      = "a".."z" | "A".."Z"
  }`
}

Object.entries(GRAMMARS).forEach(([name, grammar]) => {
  exports[`is${name}`] = (s) => ohm.grammar(grammar).match(s).succeeded();
})