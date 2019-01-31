// TODO: Extend this Ael compiler to compile the extended exponent functionality we added to the 
// interpreter file.


// A compiler for Ael.
//
// Example usage:
//
//   $ node ael.js --target=[c|js|stack] filename.ael'

/* SYNTAX */

const ohm = require('ohm-js');

const aelGrammar = ohm.grammar(`Ael {
  Program = Exp
  Exp     = Exp addop Term     --binary
          | Term
  Term    = Term mulop Factor  --binary
          | Factor
  Factor  = "-" Primary        --negate
          | Primary
  Primary = "(" Exp ")"        --parens
          | number
  addop   = "+" | "-"
  mulop   = "*" | "/"
  number  = digit+
  space  := " " | "\t"
}`);

/* ABSTRACT SYNTAX */

class Program {
  constructor(expression) {
    this.body = expression;
  }
}

class Expression {
}

class BinaryExpression extends Expression {
  constructor(left, op, right) {
    super();
    this.left = left;
    this.op = op;
    this.right = right;
  }
}

class UnaryExpression extends Expression {
  constructor(op, operand) {
    super();
    this.op = op;
    this.operand = operand;
  }
}

class NumericLiteral extends Expression {
  constructor(value) {
    super();
    this.value = value;
  }
}

// CST -> AST
const semantics = aelGrammar.createSemantics().addOperation('tree', {
  Program(body) { return new Program(body.tree()); },
  Exp_binary(left, op, right) { return new BinaryExpression(left.tree(), op.sourceString, right.tree()); },
  Term_binary(left, op, right) { return new BinaryExpression(left.tree(), op.sourceString, right.tree()); },
  Factor_negate(op, operand) { return new UnaryExpression('-', operand.tree()); },
  Primary_parens(open, expression, close) { return expression.tree(); },
  number(chars) { return new NumericLiteral(+this.sourceString); },
});

/* CODE GENERATORS */

class Generator {
  visit(e) { return this[`visit${e.constructor.name}`](e); }
}

class JavaScriptGenerator extends Generator {
  visitProgram(p) { return `console.log(${this.visit(p.body)});`; }
  visitBinaryExpression(e) { return `(${this.visit(e.left)} ${e.op} ${this.visit(e.right)})`; }
  visitUnaryExpression(e) { return `(${e.op} ${this.visit(e.operand)})`; }
  visitNumericLiteral(e) { return `${e.value}`; }
}

class CGenerator extends JavaScriptGenerator {
  visitProgram(p) {
    return `#include <stdio.h>
int main() {
    printf("%d\\n", ${this.visit(p.body)});
    return 0;
}`;
  }
}

class StackGenerator extends Generator {
  constructor() { super(); this.instructions = []; }
  emit(instruction) { this.instructions.push(instruction); }
  visitProgram(p) { this.visit(p.body); this.emit('OUTPUT'); return this.instructions.join('\n'); }
  visitBinaryExpression(e) { this.visit(e.left); this.visit(e.right); this.emit(StackGenerator.ops[e.op]); }
  visitUnaryExpression(e) { this.visit(e.operand); this.emit('NEG'); }
  visitNumericLiteral(e) { this.emit(`PUSH ${e.value}`); }
}
StackGenerator.ops = { '+': 'ADD', '-': 'SUB', '*': 'MUL', '/': 'DIV' };

/* MAIN */

function compile(source, generator, callback) {
  const match = aelGrammar.match(source);
  if (match.succeeded()) {
    const ast = semantics(match).tree();
    callback(null, generator.visitProgram(ast));
  } else {
    callback(match.message, null);
  }
}

if (process.argv.length !== 4 || !['-C', '-JavaScript', '-Stack'].includes(process.argv[2])) {
  console.error('Syntax: node ael-compiler.js -<C|JavaScript|Stack> program');
  process.exitCode = 1;
} else {
  const generators = { CGenerator, JavaScriptGenerator, StackGenerator };
  const generator = generators[`${process.argv[2].substring(1)}Generator`];
  compile(process.argv[3], Reflect.construct(generator, []), (err, targetCode) => {
    if (err) {
      console.log(err);
      process.exitCode = 2;
    } else {
      console.log(targetCode);
    }
  });
}