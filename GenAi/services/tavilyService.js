import { TavilySearch } from "@langchain/tavily";


const tvly = new TavilySearch({
    api_key: process.env.TAVILY_API_KEY,
    maxResults: 5
});

const tavilySearch = async ( query ) => {

    const result = await tvly.invoke(query)

    return JSON.stringify(result);
}

export default tavilySearch