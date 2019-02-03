// TODO: Check our solution with Toal!

const ohm = require('ohm-js');

const aelGrammar = ohm.grammar(`Ael {
  Exp     = Exp "+" Term     --plus
          | Exp "-" Term     --minus
          | Term
  Term    = Term "*" Factor  --times
          | Term "/" Factor  --divide
          | Base
          | Factor
  Factor  = "-" Primary      --negate
          | Primary
          | Base
  Base    = Base "**" Expo    --exponentiation
          | Primary
  Expo    = Base
  Primary = "(" Exp ")"      --parens
          | number
  number  = digit+
  space  := " " | "\t"
}`);

// This language is so simple, we don't need an AST.
const semantics = aelGrammar.createSemantics().addOperation('eval', {
  Exp_plus(e, _, t) {
    return e.eval() + t.eval();
  },
  Exp_minus(e, _, t) {
    return e.eval() - t.eval();
  },
  Term_times(t, _, f) {
    return t.eval() * f.eval();
  },
  Term_divide(t, _, f) {
    return t.eval() / f.eval();
  },
  Factor_negate(_, p) {
    return -p.eval();
  },
  Base_exponentiation(b, _, p) {
    return b.eval() ** p.eval();
  },
  Primary_parens(_1, e, _2) {
    return e.eval();
  },
  number(chars) {
    return +this.sourceString;
  },
});

const match = aelGrammar.match(process.argv[2]);
if (match.succeeded()) {
  console.log(semantics(match).eval());
} else {
  console.error(match.message);
  process.exitCode = 1;
}
