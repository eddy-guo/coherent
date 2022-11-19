const cohere = require("cohere-ai");
cohere.init(`${process.env.COHERE_API_KEY}`);

export async function generate_response(input_words, prev_message, conv_summary) {
    var custom_prompt = '';
    if (input_words == '' && prev_message == '' && conv_summary == '') {
        return []
    }
    
    if (prev_message != '') {
        custom_prompt = `Respond to the sentence '${prev_message}'`
        if (conv_summary != '') {
            custom_prompt += ` given that ${conv_summary}`
        }
        if (input_words != '') {
            custom_prompt += ` including the words '${input_words.trim().replace(' ', ', ')}'`
        }
        custom_prompt += '.'
    } else {
        custom_prompt = `Create a sentence using the words '${input_words.trim().replace(' ', ', ')}'.`
    }

    var out_arr = [];
    const response = await cohere.generate({
        prompt: custom_prompt,
        model: "command-xlarge-20221108",
        num_generations: 3,
        temperature: 0.75,
        frequency_penalty: 0.0,
    });

    for (let i = 0; i < response.body.generations?.length; i++) {
        if (!out_arr.includes(response.body.generations?.[i].text.trim())) {
            out_arr.push(response.body.generations?.[i].text.trim());
        }
    }

    return out_arr

}


// export async function autocomplete_word()
