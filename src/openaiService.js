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
}

