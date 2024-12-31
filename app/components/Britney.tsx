'use client';
import {ChangeEvent, FormEvent, useState} from 'react';

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

  // Réponses génériques style pop
  const responses = [
    "All you people look at me like I'm a little girl",
    'All my people on the floor',
    'Let me see you dance (let me see ya)',
    'Oh, baby, baby',
    "Baby, I'm so into you",
    'Baby, you spin me around',
    'You drive me crazy',
    "I just can't sleep",
    'All my people in the crowd, grab a partner take it down',
    'Let me see you dance (let me see ya)',
    'This is a story about a girl named Lucky',
    "She's so lucky, she's a star",
    'Oops, I did it again',
    'I played with your heart, got lost in the game',
    'All eyes on me in the center of the ring just like a circus',
    'I feel the adrenaline moving through my veins',
    'Stronger than yesterday',
    'Now get to work, bitch! (ah-ah)',
    'You better work, bitch',
    'Say hello to the girl that I am',
    "You're gonna have to see through my perspective",
    'But my life has been so overprotected',
    "Baby, can't you see I'm calling?",
    'A guy like you should wear a warning',
    'And every time I try to fly I fall without my wings',
    'I guess I need you baby',
  ];

  const getResponse = (input: string) => {
    let result = "Ce n'est pas très Britney 👀";
    const matched: Array<string> = [];

    responses.filter((response) => {
      const lyrics = removePunctuation(response).toLowerCase();
      const lyric = removePunctuation(input).toLowerCase();
      const index = lyrics.indexOf(lyric);

      if (index > -1) {
        console.log('🪼', lyrics);
        matched.push(lyrics.slice(index));
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
