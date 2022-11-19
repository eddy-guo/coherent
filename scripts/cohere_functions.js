const cohere = require("cohere-ai");
cohere.init(`${process.env.COHERE_API_KEY}`);

export async function create_prompts(input_words, prev_message, conv_summary) {
    var custom_prompt1 = '';
    var custom_prompt2 = '';
    if (input_words == '' && prev_message == '' && conv_summary == '') {
        return []
    }
    
    if (prev_message != '') {
        custom_prompt1 = `Respond to the sentence '${prev_message}'`

        if (input_words != '') {
            custom_prompt1 += ` including the words '${input_words.trim().replace(' ', ', ')}'`
            custom_prompt2 = `Create a sentence using the words '${input_words.trim().replace(' ', ', ')}'.`
        }
        if (conv_summary != '') {
            custom_prompt1 += ` given that ${conv_summary}`
        }
        custom_prompt1 += '.'
    } else {
        custom_prompt1 = `Create a sentence using the words '${input_words.trim().replace(' ', ', ')}'.`
    }

    var out_arr = [];
    
    if (custom_prompt2 != '') {
        let [response1, response2] = await Promise.allSettled([generate_response(custom_prompt1, 2), generate_response(custom_prompt2, 1)]);
        console.log(response1.value.body.generations);
        console.log(response2.value.body.generations);

        for (let i = 0; i < response1.value.body?.generations?.length; i++) {
            if (!out_arr.includes(response1.value.body.generations?.[i].text.trim())) {
                out_arr.push(response1.value.body.generations?.[i].text.trim());
            }
        }
        for (let i = 0; i < response2.value.body?.generations?.length; i++) {
            if (!out_arr.includes(response2.value.body.generations?.[i].text.trim())) {
                out_arr.push(response2.value.body.generations?.[i].text.trim());
            }
        }
    } else {
        let response = await generate_response(custom_prompt1, 3);

        for (let i = 0; i < response.body.generations?.length; i++) {
            if (!out_arr.includes(response.body.generations?.[i].text.trim())) {
                out_arr.push(response.body.generations?.[i].text.trim());
            }
        }
    }

    return out_arr

}

async function generate_response(prompt, generations) {
    const response = await cohere.generate({
        prompt: prompt,
        model: "command-xlarge-20221108",
        num_generations: generations,
        temperature: 0.5,
        frequency_penalty: 0.0,
    });

    return response
}

export async function autocomplete_word(words, prev_message) { 
    let words_arr = words.split(' ')
    let incomplete_word = words_arr.pop()

    const response = await cohere.generate({
        prompt: `Create a word starting with '${incomplete_word}' relating to ${prev_message}`,
        model: "command-xlarge-20221108",
        num_generations: 1,
        temperature: 0.7
    });

    console.log(response.body.generations)
    words_arr.push(response.body.generations?.[0].text.trim())
    console.log(words_arr)
    return words_arr.join(' ')
}

