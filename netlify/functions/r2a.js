exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };

  const roman = event.queryStringParameters.roman;

  if (!roman || !/^[IVXLCDM]+$/i.test(roman)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Parámetro 'roman' inválido." })
    };
  }

  const map = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
  const str = roman.toUpperCase();

  let total = 0;

  for (let i = 0; i < str.length; i++) {
    const curr = map[str[i]];
    const next = map[str[i+1]];

    if (next && curr < next) total -= curr;
    else total += curr;
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ arabic: total })
  };
};
