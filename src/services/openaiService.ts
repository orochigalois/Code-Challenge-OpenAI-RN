import axios from 'axios';
import { Config } from 'react-native-config';

export const fetchOpenAiData = async (content: string): Promise<string> => {
  try {
    console.log('fadfasdf'+Config.OPENAI_API_KEY);
    const response = await axios.post<string>(
      Config.OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: content, // Use the dynamic input content
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Config.OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.log(error)
    return 'Failed to fetch data from OpenAI API.\n'+ error;
  }
};
