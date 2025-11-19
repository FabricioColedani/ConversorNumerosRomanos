export const handler = async (event) => {
  const arabic = event.queryStringParameters?.arabic;

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };

  if (!arabic || isNaN(arabic)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid or missing arabic parameter" }) };
  }

  const num = Number(arabic);

  if (num < 1 || num > 3999) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Number out of range (1-3999)" }) };
  }

  const map = [
    ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
    ["C", 100], ["XC", 90], ["L", 50], ["XL", 40],
    ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]
  ];

  let result = "";
  let n = num;

  for (const [roman, value] of map) {
    while (n >= value) {
      result += roman;
      n -= value;
    }
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ roman: result })
  };
};
