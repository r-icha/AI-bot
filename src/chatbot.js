import React, { useState } from 'react';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    const model = new ChatGoogleGenerativeAI({
      model: 'gemini-pro',
      maxOutputTokens: 2048,
       apiKey: "AIzaSyBN3uf_57W5bF12W3FPqQI2n2zv-_t__tE",
    
    });

    const inputObj = { role: 'human', content: input };
    try {
      const response = await model.invoke([inputObj]);
      const content = response.content; 
      setResponse(content);
    } catch (error) {
      console.error(error);
      setResponse('Error generating response');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
   
      <h1 class=" text-5xl  font-bold  text-center mx-auto mt-9 mb-9">Gemini-Bot 🤖</h1>
  
      
<form onSubmit={handleSubmit} class="max-w-md mx-auto ">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input
        type="text"
        value={input}
        onChange={handleInput}
        placeholder="Ask a question..."

          id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>


<div className="bg-transparent text-center p-4 rounded  w-full h-full overflow-y-auto">
  <div className="chat-response-area">
    {loading ? (
      <p>Loading...</p>
    ) : (
      <p className="text-lg">{response}</p>
    )}
  </div>
</div>
    </>
  );
};

export default Chatbot;