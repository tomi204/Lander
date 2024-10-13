export const getTalentByWallet = async (wallet: string) => {
  const apikey = process.env.NEXT_PUBLIC_TALENT_API_KEY;
  if (!apikey) {
    throw new Error('TALENT_API_KEY is not set');
  }
  const response = await fetch(
    `https://api.talentprotocol.com/api/v2/passports/${wallet}`,
    {
      method: 'GET',
      headers: {
        'X-API-KEY': apikey,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const getAllTalent = async (page: number = 1) => {
  const apikey = process.env.NEXT_PUBLIC_TALENT_API_KEY;
  if (!apikey) {
    throw new Error('TALENT_API_KEY is not set');
  }

  const response = await fetch(
    `https://api.talentprotocol.com/api/v2/passports?page=${page}`,
    {
      method: 'GET',
      headers: {
        'X-API-KEY': apikey,
      },
    }
  );

  const data = await response.json();
  return data;
};
