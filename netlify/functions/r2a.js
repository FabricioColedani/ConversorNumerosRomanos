export const handler = async (event) => {
  const roman = event.queryStringParameters?.roman;

  // CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };

  if (!roman) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing roman parameter" }) };
  }

  const value = roman.toUpperCase();

  // Regex oficial para validar Romanos auténticos del 1 al 3999
  const validRomanRegex =
    /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

  if (!validRomanRegex.test(value)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid roman numeral" }) };
  }

  const map = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };

  let total = 0;
  for (let i = 0; i < value.length; i++) {
    const curr = map[value[i]];
    const next = map[value[i + 1]] || 0;

    if (curr < next) total -= curr;
    else total += curr;
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ arabic: total })
  };
};
