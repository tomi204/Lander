export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get('wallet');
  const response = await fetch(
    `https://api.talentprotocol.com/api/v2/passports/${wallet}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TALENT_API_KEY}`,
      },
    }
  );
  const data = await response.json();

  return data;
}
