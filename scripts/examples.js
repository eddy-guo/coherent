const cohere = require("cohere-ai");
cohere.init(`${process.env.COHERE_API_KEY}`);

(async () => {
    const result = await cohere_functions.extract_keywords("Lets go to a restaurant tonight. Which restaurant do you want to go to? I want to get some mexican food.");
    const response = await cohere_functions.create_prompts('','Any particular reason you want mexican food?', result);
    console.log(response)
})();

// (async () => {
//   const completed_words = await cohere_functions.autocomplete_word('not fun i dont smoke', 'How was the party yesterday?');
//   const result = await cohere_functions.generate_response('not fun dont smoke','How was the party yesterday?', '');
//   console.log(result)
// })();


(async () => {
  const result = await cohere_functions.extract_keywords("Lets go to a restaurant tonight. Which restaurant do you want to go to? I want to get some mexican food.");
  const response = await cohere_functions.create_prompts('like','Any particular reason you want mexican food?', result);
  console.log(response)
})();



// (async () => {
//   const result = await cohere_functions.create_prompts('not bad','How was last nights party?', '');
//   console.log(result)
// })();

///////////////////////////////

// genereate sentence response example
(async () => {
    const response = await cohere.generate({
      prompt: "Respond to the phrase 'Did you enjoy yesterday's party?' including the words 'no'.",
      model: "command-xlarge-20221108",
      num_generations: 3,
      temperature: 0.75,
      frequency_penalty: 0.0,
    });
    console.log(response.body.generations);
  })();
  
// generate example
(async () => {
  const response = await cohere.generate({
    prompt: "Once upon a time in a magical land called",
  });
  //console.log(`Prediction: ${response.body.generations[0].text}`);
  // console.log(response.body.generations?.[0].text);
})();

// generate sentence example
(async () => {
  const response = await cohere.generate({
    prompt: "Write me a sentence relating to the words yesterday, party, great",
    model: "command-xlarge-20221108"
  });
  console.log(response.body.generations?.[0].text);
})();

// genereate sentence response example
(async () => {
  const response = await cohere.generate({
    prompt: "Respond to the sentence 'How was the party yesterday?' relating to the word 'bad'",
    model: "command-xlarge-20221108",
    num_generations: 5,
  });
  console.log(response.body.generations);
})();