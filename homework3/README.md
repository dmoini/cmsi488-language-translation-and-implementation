<!-- Double check with Toal -->

1. Classify the following as a syntax error, semantic error, or not a compile time error. In the case where code is given, assume all identifiers are properly declared and in scope. All items refer to the Java language.
   1. `x+++-y`
      1. Not a compile time error.
   2. `x---+y`
      1. Not a compile time error.
   3. incrementing a read-only variable
      1. Semantic error.
   4. accessing a private field in another class
      1. Semantic error.
   5. Using an uninitialized variable
      1. Semantic error.
   6. Dereferencing a null reference
      1. Not a compile time error. (Runtime error)
   7. null instanceof C
      1. Not a compile time error.
   8. `!!x`
      1. Not a compile time error.
2. Here’s a code fragment in some generic language:

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

   1. `3`  
      `5`

      1. The scope starts when the declaration of the variable is finished and completed. Within the function `f()`, the first `print(x)` refers to the variable `x` that had already been declared outside the function. Its scope continues until after `var x = x + 2` is declared. After `var x = x + 2` is declared, it has its own "
         "inner" scope within the "outer" scope, and the global `var x = 3` also remains within the scope of `var x = x + 2`, because that value `3` is used within `var x = x + 2`. The second `print(x)` thus refers to and exists within the local scope of `var x = x + 2` which had already been completed and declared.

   2. `undefined NaN`

      1. The scope begins within the function `f()`. When it prints `x`, since `x` has not been declared within the function, it becomes `undefined`. When `var x = x + 2` is declared, an attempt to add an `undefined` to a `2` results in `NaN`.

   3. `Error on line 3: x is not declared`

      1. Like number 2, the scope also begins inside the function `f()`. However, unlike problem 2 where `x` defaults to `undefined`, `x` in this case needs to be declared at the beginning of the function before it can be accessed.

   4. `75354253672`  
      `75354253674`

      1. The scope begins within the function. Since the variable `x` was never properly initialized because its scope begins within the function, it never points to the global `var x = 3` and thus looks like it is just some memory address. This looks to be similar to C/C++, where accessing an un-initialized variable can give undefined behavior and the compiler can do literally whatever it wants. In this case, it looks like it may have assigned some unused memory address.

   5. `3`  
      `-23482937128`

      1. The scope starts during declaration but does _not care_ about anything after the declaration (during initialization). For `var x = 3`, the variable is declared and initialized properly, and thus the first print statement outputs the value of `3`. For `var x = x + 2`, however, it has its own scope _but_ since the scope does not look or care for anything after the `var x`, the `x` in `x + 2` never refers to the outermost scope's `var x = 3` and thus that value is just junk. Thus, the declaration of that second variable is just adding `2` to some junk memory address.

   6. `Error on line 4: x used in its own declaration`
      1. The scope begins inside the function and looks to also check when the variable is being declared and completed (maybe a combination of both). The reason for this is because it specifically does not throw an error at the initial `print(x)` but waits until the variable is declared and _also within the scope of the function_. Because of this scoping, when `var x = x + 2` tries to compile, the `x` within the initialization has no reference (other than its name already defined in the declaration) and thus errors out during compilation.

3. Describe the semantics of `private` in Ruby and C#. (Hint: they’re quite different.) Write well. You won’t get any points for a poorly written description.
   1. In **C#**, the `private` keyword is a member access modifier. Any member of the `private` keyword means that those members are _only_ accessible within the body of the class or struct in which they are declared. For **Ruby**, the `private` keyword is applied to methods: they are local to the instantiated objects to which they belong to, not accessible from outside the object, and can only be called implicitly in regards to `self`. Ruby private methods _cannot_ be called with an explicit receiver, which means that the methods can be called only in the context of the current object instance; you can't invoke another object's private methods. The big difference here is that for C++, the word `private` means _"private to this class"_, whereas in Ruby it means _"private to the instance of this object"_.
