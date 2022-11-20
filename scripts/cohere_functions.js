export async function create_prompts(input_words, prev_message, conv_keywords, cohere) {
    console.log(input_words)
    var custom_prompt1 = '';
    var custom_prompt2 = '';
    if (input_words == '' && prev_message == '' && conv_keywords == '') {
        return []
    }

    if (prev_message != '') {
        custom_prompt1 = `Respond to the sentence '${prev_message}`

        if (input_words != '') {
            custom_prompt1 += `' using the words '${input_words.trim()}',`
        }
        if (conv_keywords != '') {
            custom_prompt1 += ` relating to '${conv_keywords.trim()}'`
        }
        custom_prompt1 += '.'
    } else {
        custom_prompt1 = `Create a sentence using the words '${input_words.trim().replace(' ', ', ')}'.`
    }

    var out_arr = [];

    let response = await generate_response(custom_prompt1, 3, cohere);
    console.log(response)

    for (let i = 0; i < response.body.generations?.length; i++) {
        if (!out_arr.includes(response.body.generations?.[i].text.trim())) {
            out_arr.push(response.body.generations?.[i].text.trim());
        }
    }

    console.log(out_arr)

    return out_arr

}

async function generate_response(prompt, generations, cohere) {
    const response = await cohere.generate({
        prompt: prompt,
        model: "command-xlarge-20221108",
        num_generations: generations,
        temperature: 0.8,
        frequency_penalty: 0.0,
    });

    return response
}

export async function autocomplete_word(words, prev_message, cohere) {
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

export async function extract_keywords(previous_messages, cohere) {
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


export async function get_sentiment(message, cohere) {
    let examples = [
        {"text":"I had a great day", "label": '😁'},
        {"text":"I am happy", "label": '😁'},
        {"text":"I'm so sad", "label": '😢'},
        {"text": "I'm feeling angry today", "label": '😡'},
        {"text": "I can't believe it!", "label":'😮'},
        {"text": "Can you believe it?", "label": '😮'},
        {"text": "hahahahahaha haha", "label": '😂'},
        {"text": "That's hilarious", "label": '😂'},
        {"text": "That's so funny", "label": '😂'},
        {"text": "I am sad today", "label": '😢'},
        {"text": "Today was a bad day", "label": '😢'},
        {"text": "Sorry", "label": '😢'},
        {"text": "I'm sorry, but", "label": '😢'},
        {"text": "Got my paycheck today", "label":'😁'},
        {"text": "Nice!", "label": '😁'},
        {"text": "You can't be serious!", "label":'😮'},
        {"text": "I'm seriously pissed off right now...", "label": '😡'},
        {"text": "Shut up!", "label":'😡'},
        {"text": "nice joke!", "label": '😂'}
    ];



    let input = [message];

    const response = await cohere.classify({inputs: input, examples: examples});
    console.log(response.body.classifications?.[0].confidence)
    console.log(message)
    return response.body.classifications?.[0].prediction;
}

// emoji list (5)
// &#128514; laughing 😂
// &#128513; happy 😁
// &#128545; angry 😡
// &#128546; sad 😢
// &#128558; surprised 😮