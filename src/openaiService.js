import axios from 'axios';
import OpenAI from 'openai';
//const express = require("express");
const config = require('./config');

// import { Configuration, OpenAIApi } from "openai";
const openai = new OpenAI({
  apiKey: config.app.APIKey,
  dangerouslyAllowBrowser: true
});

export async function getOpenAIResponse(prompt) {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
      });
    console.log("IM HERE LOOK HERE")
    console.log(chatCompletion.choices[0].message.content)
    return chatCompletion.choices[0].message.content;
}

export async function getListOfSongs(prompt) {
    let inputString = await getOpenAIResponse(prompt)
    // console.log("PARSING HERE:")
    // console.log(inputString)
    const lines = inputString.split('\n').filter(line => line.trim() && !line.includes('PLAYLIST'));
    const result = [];

    lines.forEach(line => {
        const [indexAndTitle, artist, year] = line.split(';').map(part => part.trim());
        const songTitle = indexAndTitle.split('. ');
        songTitle[1].replace('\"', '');
        result.push([songTitle[1], artist, year]);
    });
    
    // console.log(result)
    return result;
}

