// import * as grammar from '../Configurations/grammer3.json' with { type: 'json' };
export {};
// function buildGrammarString(lhsVariable : string, grammarRules : GrammarRules, depth : number, maxDepth = 10) {
//     depth += 1
//     if (depth >= maxDepth) return "_"
//     let currentRule = getRandomRule(grammarRules[lhsVariable]) 
//     let outputString = ''
//     for (let i = 0; i < currentRule.length; i++) {
//         const rhsVariable = currentRule[i]
//     if (isTerminal(rhsVariable, grammarRules)) {
//         outputString += rhsVariable + " " // boy, girl, a, an
//         continue
//     } 
//         outputString += buildGrammarString(rhsVariable, grammarRules, depth)
//     }
//     return outputString
// }
// const isTerminal = (word : string, grammarRules : GrammarRules) => {return !(word in grammarRules)}
// const getRandomRule = (rules : string[][]) : string[] => {
//     if (rules.length <= 0) throw "Cannot get random rule of a list of size zero!"
//     return rules[Math.floor(Math.random()*(rules.length))]
// }
// interface GrammarRules {
//     [index: string]: string[][];
// }
// const rules: GrammarRules = grammar
// console.log(buildGrammarString('character-background', rules, 0))
// // Balance randomness with narrative coherence
// // Replacable words
// // choices influence selection (weighted randomness)
// // thematic cluster
// // Avoid repittive patterns
// // include transitions
// // compound/ complex sentences, or descriptive adjectives
//# sourceMappingURL=Grammer.js.map