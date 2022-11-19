const cohere = require("cohere-ai");
cohere.init(`${process.env.COHERE_API_KEY}`);

export async function create_prompts(input_words, prev_message, conv_keywords) {
    var custom_prompt1 = '';
    var custom_prompt2 = '';
    if (input_words == '' && prev_message == '' && conv_summary == '') {
        return []
    }
    
    if (prev_message != '') {
        custom_prompt1 = `Respond to the sentence '${prev_message}`

        if (input_words != '') {
            custom_prompt1 += `' given the words '${input_words.trim().replace(' ', ', ')}`
        }
        if (conv_keywords != '') {
            custom_prompt1 += `, ${conv_keywords.trim()}`
        }
        custom_prompt1 += '\'.'
    } else {
        custom_prompt1 = `Create a sentence using the words '${input_words.trim().replace(' ', ', ')}'.`
    }

    var out_arr = [];
    
    let response = await generate_response(custom_prompt1, 3);

    for (let i = 0; i < response.body.generations?.length; i++) {
        if (!out_arr.includes(response.body.generations?.[i].text.trim())) {
            out_arr.push(response.body.generations?.[i].text.trim());
        }
    }


    return out_arr

}

async function generate_response(prompt, generations) {
    const response = await cohere.generate({
        prompt: prompt,
        model: "command-xlarge-20221108",
        num_generations: generations,
        temperature: 1.5,
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

export async function extract_keywords(previous_messages) {
    var ex_prompt = `This bot finds the most important subject from a conversation.
    Conversation: "What do you want to grab for lunch? I'm down for some burgers or a pizza. I want some pasta. Some fries would be nice.".
    Important subjects: "food".
    Conversation: "How was your day? My day was awful - I got fired from work. My dog chewed up my socks. Today is terrible!".
    Important subjects: "bad day".
    Conversation: "What are you doing tonight? I'm going out with some friends to a bar, what about you? I'm probably going to take it easy.".
    Important subjects: "plans".
    Conversation: "How was work today? It was pretty busy today, lots of stuff to do. I might take some time off soon."
    Important subjects: "work".
    Conversation: "${previous_messages}".
    Important subjects: "`

    const response = await cohere.generate({
        prompt: ex_prompt,
        model: 'large',
        stop_sequences: ['"'],
        temperature: 0.9,
        num_generations: 2
    })
    let out_arr = []

    for (let i = 0; i < response.body.generations?.length; i++) {
        for (var c of response.body.generations?.[i].text.replace('"', '').trim().split(' ')) {
            if (!out_arr.includes(c.toLowerCase())) {
                out_arr.push(c.toLowerCase())
            }
        }
    }

    console.log(out_arr.join(' '))

    return out_arr.join(', ')

}