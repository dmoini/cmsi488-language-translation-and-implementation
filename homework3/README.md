1) Classify the following as a syntax error, semantic error, or not a compile time error. In the case where code is given, assume all identifiers are properly declared and in scope. All items refer to the Java language.
   1) `x+++-y`
      1) Not a compile time error.
   2) `x---+y`
      1) Not a compile time error.
   3) incrementing a read-only variable
      1) TODO <!-- want to say semantic error -->
   4) accessing a private field in another class
      1) Semantic error.
   5) Using an uninitialized variable
      1) Semantic error.
   6) Dereferencing a null reference
      1) TODO
   7) null instanceof C
      1) Not a compile time error.
   8) `!!x`
      1) Not a compile time error.
2) Here’s a code fragment in some generic language:
    ```
    var x = 3;          // line 1
    function f() {      // line 2
        print(x);       // line 3
        var x = x + 2;  // line 4
        print(x);       // line 5
    }                   // line 6
    f();                // line 7
    ```
    For each of the following outputs, state scope rules that would have caused them:
   1) `3`  
   `5`  
      1)  TODO
   2) `undefined NaN`
      1) TODO
   3) `Error on line 3: x is not declared`
      1) TODO
   4) `75354253672`  
    `75354253674`
      1) TODO
   5) `3`  
   `-23482937128`
      1) TODO
   6) `Error on line 4: x used in its own declaration`
      1) TODO
3) Describe the semantics of `private` in Ruby and C#. (Hint: they’re quite different.) Write well. You won’t get any points for a poorly written description.
   1) TODO