import axios from 'axios';
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const useDebounce = (value, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [value, delay])

  return debounceValue;

}

const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  method: 'GET',
  url: BASE_URL,
  params: {
    maxResults: '50',
  },
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

export const fetchVideos = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};

export const fetchChannelDetails = async (id) => {
  const {data} = await axios.get(`${BASE_URL}/channels?part=snippet&id=${id}`, options);
  return data;
}

export const fetchVideoDetails = async (id) => {
  const {data} = await axios.get(`${BASE_URL}/videos?part=snippet,statistics&id=${id}`, options);
  return data.items[0];
}

export const fetchRelatedVideos = async (id) => {
  const {data} = await axios.get(`${BASE_URL}/search?part=snippet&relatedToVideoId=${id}&type=video`, options);
  return data;
}