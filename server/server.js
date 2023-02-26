import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';


dotenv.config(); 

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Welcome to Travelia',
    })
});


const botProfile = "## Who you are ## Wanderbot is a personal virtual tour guide for travel experiences and high end copywriter, 21 years old.## Your Profile and characteristics ## You are friendly, polite and have a young and adventurous spirit. It can provide accurate and up-to-date information about main accommodations and travel sites in any destination, and interpret all messages like a human tour guide. Additionally, Wanderbot can create hyper-detailed articles about any location, and offer a personalized experience tailored to your interests. By using Wanderbot, users can have access to a knowledgeable and approachable virtual tour guide to assist with trip planning and provide accurate information about destinations.## Final Message of Witch Response ## A short message should be sent to clients at the end of each command, Wanderbot should ask if it can help with anything else.";

const botFunction = "Your fundamental job is write a long, fully markdown formatted article. The article should contain rich and comprehensive, very detailed paragraphs, with lots of details. Providing users with comprehensive information in an engaging and entertaining way. I give you the URL [https://medium.com/@laterza.henrique/find-out-about-your-next-destination-edcfe9258903](https://medium.com/@laterza.henrique/find-out-about-your-next-destination-edcfe9258903) of an article that you need to use to the structure your own article, this includes: all topics with emojis. But you will rewrite the main content considering that the trip will be made to: ";

const dontDo = "## Rules to follow no matter what ## Do not echo my prompt. Do not remind me what I asked you for. Do not apologize. Do not self-reference. Do not use generic filler phrases. Do use useful subheadings with keyword-rich titles. Do not do recomendations when user just sent 'hi'. Get to the point precisely and accurate. Do not explain what and why, just give me your best possible article. All output shall be in English.";

const remember = " After getting user response remember all these things: 'I give you the URL [https://medium.com/@laterza.henrique/find-out-about-your-next-destination-edcfe9258903](https://medium.com/@laterza.henrique/find-out-about-your-next-destination-edcfe9258903) of an article that you need to copy the structure, this includes: all topics with emojis. But you will rewrite the main text with rich, comprehensive, very detailed paragraphs, with lots of detailscontent considering that the trip will be made to what user send in 'prompt'. rememebr too about" + dontDo;

const exampleToPrompt = `Find out about your next destination
Are you planning a trip to Paris, the “City of Lights” and one of the most visited cities in the world? Before you embark on your journey, it’s important to be aware of some important travel planning information to make your trip as smooth and enjoyable as possible.

Visa requirements and application process 🛂
Visitors from certain countries may require a visa to enter France. The visa application process can vary depending on your country of origin, so it’s important to check with the French embassy or consulate in your home country well in advance of your trip. You may need to provide proof of travel plans, accommodations, and financial means, among other requirements.

Travel restrictions and advisories 🚫
As of February 2023, France has lifted many of its COVID-19 related travel restrictions for vaccinated travelers. However, it’s always a good idea to check for any current travel advisories or restrictions before you go. You can find up-to-date information on the websites of the French embassy or consulate in your home country, as well as on the official website of the French government.

Currency exchange rates and options for payment 💰
The currency used in France is the euro (EUR). You can exchange your currency at banks, exchange offices, or ATMs. Credit cards are widely accepted in most places, but it’s a good idea to carry some cash for smaller purchases or in case of emergencies.

Transportation options 🚇
Paris has an excellent public transportation system, including buses, metro, and trains. The metro is the most convenient and affordable way to get around the city, with multiple lines and stations located throughout Paris. Car rental is also available, but be aware that traffic in Paris can be heavy, and parking can be expensive.

Accommodation options 🏨
Paris offers a wide range of accommodation options to suit every budget, from luxury hotels to hostels and vacation rentals. The most popular areas to stay are in the city center, near major tourist attractions such as the Eiffel Tower, Notre Dame, and the Louvre Museum.

Climate and weather patterns 🌤️
Paris has a temperate climate with mild winters and warm summers. The best time to visit Paris is in the spring (April-June) or fall (September-November), when the weather is mild and there are fewer tourists.

Popular tourist attractions and activities 🗼
Paris is home to some of the world’s most iconic landmarks and attractions, including the Eiffel Tower, Notre Dame Cathedral, the Louvre Museum, and the Palace of Versailles. Other popular activities include exploring the city’s charming neighborhoods, shopping on the Champs-Elysées, and dining on delicious French cuisine.

Safety and security concerns 🔒
Paris is generally a safe city for travelers, but it’s always important to be aware of your surroundings and take precautions to avoid petty theft and pickpocketing. It’s also a good idea to avoid certain areas, such as the outskirts of the city, late at night.

Health considerations 🏥
Visitors to France may be required to have certain vaccinations, such as the measles, mumps, and rubella (MMR) vaccine. It’s also important to be aware of any prevalent illnesses or diseases in the region, and to take appropriate precautions, such as using insect repellent to prevent mosquito-borne illnesses.

Emergency contact information 🆘
In case of an emergency, you can call the European emergency number 112 to reach local authorities, or contact your embassy or consulate for assistance. It’s a good idea to keep a copy of your passport and travel documents in a safe place, such as a hotel safe or with a trusted friend or family member.

Time difference ⏰
Paris is located in the Central European Time (CET) zone, which is 1 hour ahead of Greenwich Mean Time (GMT+1). Depending on your home country, you may need to adjust your watch when arriving in Paris. It is also important to note that France observes daylight saving time, which typically begins on the last Sunday in March and ends on the last Sunday in October.

Availability of Internet and Mobile Phone Service 📱
Paris has a well-developed telecommunications infrastructure with excellent internet and mobile phone service coverage. Many hotels, cafes, and public places offer free Wi-Fi. Visitors can also purchase SIM cards with data plans from local service providers, which can be a convenient and cost-effective option for staying connected while in Paris.

Recurring Problems 🔙
Like any major city, Paris has its share of recurring problems that visitors should be aware of. Pickpocketing and petty theft are relatively common in crowded tourist areas, particularly around major attractions such as the Eiffel Tower and Notre-Dame. Visitors should be mindful of their belongings and keep valuable items such as passports, wallets, and cameras close at hand. It is also important to be cautious of street vendors who may try to scam tourists with offers of cheap souvenirs or goods.

Cultural Information 🎭
Paris is a multicultural city with a rich history and diverse population. Visitors should be mindful of local customs and cultural norms, particularly when visiting religious sites or interacting with locals. French is the official language of Paris, but English is widely spoken, particularly in tourist areas. However, it is always a good idea to learn a few basic French phrases to show respect for the local culture.

Local laws and regulations, including alcohol and drug policies: 🚭
Paris has strict laws and regulations regarding alcohol and drugs. The legal drinking age is 18, and it is illegal to consume alcohol in public spaces. Marijuana and other drugs are strictly prohibited and can result in severe legal penalties. Visitors should also be aware that smoking is prohibited in many public spaces, including cafes, restaurants, and bars.

Availability of public restrooms and toilet facilities: 🚻
Public restrooms can be found throughout Paris, particularly in tourist areas and major transportation hubs. However, visitors should be aware that some public restrooms may charge a small fee for use. It is also important to note that toilet facilities may differ from what you are accustomed to in your home country, with some public restrooms featuring squat-style toilets rather than seated toilets.

Dress code and clothing recommendations for cultural and climate considerations 🧥
Paris is known for its fashion and style, and visitors should be mindful of local dress codes and clothing recommendations. In general, Parisians tend to dress elegantly and conservatively, with an emphasis on classic styles and neutral colors. Visitors should also be mindful of the local climate, with cooler temperatures in the fall and winter and warmer temperatures in the spring and summer.

Tipping practices and expectations 💰
Tipping is not generally expected in Paris, as a service charge is typically included in the bill at restaurants and cafes. However, it is common to leave a small amount of change or round up to the nearest euro as a gesture of appreciation for good service. Tipping is also common in other service industries, such as hairdressers and taxi drivers.

Local holidays or festivals that may affect your travel plans 🎉
Paris is home to a number of annual festivals and cultural events that may affect your travel plans. Some of the most popular events include the Fête de la Musique in June, Bastille Day celebrations on July 14th, and the Paris Fashion Week in September. It is important to be aware of these events when planning your trip, as they may result in increased crowds and higher prices for accommodations and activities.

Etiquette for interacting with locals and demonstrating cultural sensitivity 🤝
When interacting with locals in Paris, it is important to demonstrate cultural sensitivity and respect for local customs and traditions. This includes using basic French phrases, greeting locals with tipping practices and expectations may vary in Paris, so it’s important to be aware of local customs. In restaurants, a service charge is often included in the bill, so tipping is not required. However, it is common to leave a few extra euros for exceptional service or if the service charge was not included. Tipping in bars is not expected, but rounding up the bill to the nearest euro is appreciated.

Recommendations for comfortable travel🚶‍♀️
Paris is known for its fashion, and the dress code can be quite formal in some areas. It’s a good idea to dress neatly and conservatively when visiting museums, churches, or other formal establishments. However, casual dress is acceptable in most other areas. Comfortable walking shoes are recommended, as Paris is a city best explored on foot.

If you’re traveling to Paris during a major holiday or festival, be prepared for larger crowds and potential disruptions to transportation or business hours. Some businesses may be closed during holidays or have limited hours. It’s a good idea to check ahead of time and plan accordingly.

When interacting with locals, it’s important to demonstrate cultural sensitivity and respect. French is the official language of Paris, but many locals also speak English. It’s always polite to greet locals with “Bonjour” (Good day) or “Bonsoir” (Good evening), and using basic French phrases such as “Merci” (Thank you) or “S’il vous plaît” (Please) can go a long way in demonstrating respect. Remember to be patient and polite, and avoid speaking too loudly or aggressively.

Financial information for Paris travel 💳
In terms of financial information, the currency used in Paris is the Euro (EUR). Major credit cards such as Visa and Mastercard are widely accepted, but it’s a good idea to carry some cash for smaller purchases or in case of emergency. ATMs are readily available throughout the city for cash withdrawals. Sales tax is included in the price of goods and services, but some hotels may charge an additional city tax per night. It’s always a good idea to check with your hotel or the establishment in advance to avoid any surprises.

Overall, with proper planning and a bit of cultural awareness, a trip to Paris can be an unforgettable experience. Whether you’re interested in history, art, food, or fashion, there is something for everyone in the City of Light.`



app.post('/', async (req, res) =>{
    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${dontDo} ${botProfile} ${botFunction} ${prompt}`,
            temperature: 0,
            max_tokens: 3600,
            top_p:1,
            stop:["\"\"\""],

        });

        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error })

    }
})

app.listen(5000, () => console.log('Server ir running on port http://localhost:5000'))