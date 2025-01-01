'use client';
import {ChangeEvent, FormEvent, useState} from 'react';
import lyrics from '@/lib/db/lyric-samples.json';

type Message = {
  isUser: boolean;
  text: string;
};

const removePunctuation = (text: string): string => {
  const punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()\[\]<>"""''']/g;

  if (!text || typeof text !== 'string') {
    return '';
  }
  return text.replace(punctuationRegex, '');
};

const BritneyAI = () => {
  const [counter, setCounter] = useState(0);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const responses = lyrics.lyrics;

  const getResponse = (input: string) => {
    let result = "Ce n'est pas très Britney 👀";
    const matched: Array<string> = [];

    responses.filter((response) => {
      const lyrics = removePunctuation(response).toLowerCase();
      const lyric = removePunctuation(input).toLowerCase();
      const index = lyrics.indexOf(lyric);

      if (index > -1) {
        // console.log('🪼', lyrics);
        matched.push(lyrics.slice(index + lyric.length));
      }
    });

    if (matched.length > 0) {
      const randomIndex = Math.floor(Math.random() * matched.length);
      result = matched[randomIndex];
    }

    return result;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    // const userMessage = {text: input.trim(), isUser: true};
    const aiResponse = {text: getResponse(input), isUser: false};

    // setMessages((prevMessages) => [...prevMessages, userMessage, aiResponse]);
    setMessages([aiResponse]);
    setCounter((prev) => prev + 1);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setCounter(0);
  };

  return (
    <div className="w-96 max-w-2xl mx-auto text-black">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Is it Britney? 🎤
        </h1>

        <form onSubmit={handleSubmit} className="my-2 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            className="flex-1 p-2 border rounded bg-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 active:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Générer
          </button>
        </form>

        <div className="mb-4 min-h-48 overflow-y-auto bg-gray-50 rounded-lg p-4">
          {messages.map((msg: Message, idx) => (
            <div
              key={idx}
              className={`mb-2 p-3 rounded-lg ${
                msg.isUser ? 'bg-slate-200 ml-12' : 'bg-slate-300 mr-12'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div id="counter" className="text-sm">
          (nombre de tests : {counter})
        </div>
      </div>
    </div>
  );
};

export default BritneyAI;
