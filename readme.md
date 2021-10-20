# :pencil: Parser 
## :sparkles: Public interface
The module has the following public classes and methods:

```parse(text)```: The method to run the modules.
- Takes a string as an argument. The string can represent one or more sentences. Sentences must end with a valid end token. Accepted end tokens are: '.', '!' and '?'.
- Returns a ```Document``` object.

```Document```
- ```fetchAllSentences()```: returns a ```Sentences``` object
- ```fetchRegularSentences()```: returns an array with ```RegularSentence``` objects
- ```fetchExpressions()```: returns an array with ```Expression``` objects
- ```fetchQuestions```: returns an array with ```Question``` objects

```Sentences```
- ```parsedSentences```: a getter that returns an array with ```RegularSentence```, ```Expression``` and ```Question``` objects

```RegularSentence```, ```Expression``` and ```Question```
- ```getStringSentence```: a getter that returns the sentence in a string format

## :rocket: How to use 
The module can be downloaded from npm using the command: ```npm install @rebaxe/parser```



Example: 
```javascript 
import { parse } from '@rebaxe/parser'

const parsedDocument = parse('This is a text. I wish to parse it!')

// Get all sentences
// Returns a Sentences-object
parsedDocument.fetchAllSentences()

// Get all regular sentences (meaning: sentences that ends with a '.')
// Returns an array with RegularSentence-objects
parsedDocument.fetchRegularSentences()

// Get all expressions (meaning: sentences that ends with a '!')
// Returns an array with Expression-objects
parsedDocument.fetchExpressions()

// Get all questions (meaning: sentences that ends with a '.')
// Returns an array with questions objects
parsedDocument.fetchQuestions()
```