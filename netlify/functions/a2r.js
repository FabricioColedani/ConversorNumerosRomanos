exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };

  const arabic = parseInt(event.queryStringParameters.arabic);

  if (!arabic || arabic <= 0) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Parámetro 'arabic' inválido." })
    };
  }

  const map = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
  ];

  let roman = "";
  let value = arabic;

  for (const [num, rom] of map) {
    while (value >= num) {
      roman += rom;
      value -= num;
    }
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ roman })
  };
};
