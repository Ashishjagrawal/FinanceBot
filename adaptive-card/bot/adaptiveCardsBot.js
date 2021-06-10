// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory, CardFactory } = require('botbuilder');

//import Adaptive Cards
const AgendaCard = require('../cards/AgendaCard.json');
const FoodOrderCard = require('../cards/FoodOrderCard.json');
const SportEventCard = require('../cards/SportEventCard.json');
const StockUpdateCard = require('../cards/StockUpdate.json');
const WeatherCard = require('../cards/WeatherCard.json');
const FlightCard = require('../cards/Flightcard.json');
const GalaryCard = require('../cards/GalaryCard.json');


//Create Array of Adaptive Cards Content
const CARDS = [
    AgendaCard,
    FoodOrderCard,
    SportEventCard,
    StockUpdateCard,
    WeatherCard,
    FlightCard,
    GalaryCard
]

const WELCOME_TEXT = 'This is Random Adaptive Cards generator Bot, type anything to see an Adaptive Card'

//Bot
class AdaptiveCardsBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            const randomlySelectedCard = CARDS[Math.floor((Math.random() * CARDS.length - 1) + 1)];
            await context.sendActivity({
                text: 'Here is an Adaptive Card:',
                attachments: [CardFactory.adaptiveCard(randomlySelectedCard)]
            });
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(`Welcome to Adaptive Cards Bot ${ membersAdded[cnt].name}. ${ WELCOME_TEXT}`);
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.AdaptiveCardsBot = AdaptiveCardsBot;
