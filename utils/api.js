import axios from 'axios';

export const fetchGames = async ({ pageParam = 0, query = '', vendors = [] }) => {
  const limit = 20;
  let vendorParam = vendors.length ? `&vendor=${vendors.join(',')}` : '';
  if (query) {
    const { data } = await axios.get(
      `https://jpapi-staging.jackpot.bet/casino/games/search?query=${encodeURIComponent(query)}`
    );
    return { items: data.data.items ?? [], nextOffset: null };
  }
  const { data } = await axios.get(
    `https://jpapi-staging.jackpot.bet/casino/games?limit=${limit}&offset=${pageParam}${vendorParam}`
  );
  return {
    items: data.data.items,
    nextOffset: data.data.items.length === limit ? pageParam + limit : null,
  };
}; 