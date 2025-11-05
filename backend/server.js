const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Permitir peticiones desde Netlify
app.use(express.json());

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Conversor Romano ↔ Arábigo',
    endpoints: {
      romanToArabic: '/r2a?roman=MMXXIV',
      arabicToRoman: '/a2r?arabic=2024'
    }
  });
});

// Romanos a Arábigos
app.get('/r2a', (req, res) => {
  const romanNumeral = req.query.roman;
  
  if (!romanNumeral) {
    return res.status(400).json({ error: 'Parámetro roman requerido.' });
  }

  const arabicNumber = romanToArabic(romanNumeral);
  
  if (arabicNumber === null) {
    return res.status(400).json({ error: 'Número romano inválido.' });
  }

  return res.json({ 
    roman: romanNumeral.toUpperCase(),
    arabic: arabicNumber 
  });
});

// Arábigos a Romanos
app.get('/a2r', (req, res) => {
  const arabicNumber = parseInt(req.query.arabic, 10);
  
  if (isNaN(arabicNumber)) {
    return res.status(400).json({ error: 'Parámetro arabic requerido.' });
  }

  const romanNumeral = arabicToRoman(arabicNumber);
  
  if (romanNumeral === null) {
    return res.status(400).json({ error: 'Número arábigo inválido (debe estar entre 1 y 3999).' });
  }

  return res.json({ 
    arabic: arabicNumber,
    roman: romanNumeral 
  });
});

// Función: Romano a Arábigo
function romanToArabic(roman) {
  if (!roman || typeof roman !== 'string') {
    return null;
  }

  const romanMap = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50,
    'C': 100, 'D': 500, 'M': 1000
  };

  const upper = roman.toUpperCase().trim();
  
  // Validación básica
  const pattern = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
  if (!pattern.test(upper)) {
    return null;
  }

  let result = 0;
  
  for (let i = 0; i < upper.length; i++) {
    const current = romanMap[upper[i]];
    const next = romanMap[upper[i + 1]];
    
    if (!current) {
      return null;
    }
    
    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }
  
  if (result < 1 || result > 3999) {
    return null;
  }

  return result;
}

// Función: Arábigo a Romano
function arabicToRoman(arabic) {
  if (typeof arabic !== 'number' || isNaN(arabic)) {
    return null;
  }

  if (arabic < 1 || arabic > 3999) {
    return null;
  }
  
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  
  let result = '';
  let num = arabic;
  
  for (let i = 0; i < values.length; i++) {
    while (num >= values[i]) {
      result += symbols[i];
      num -= values[i];
    }
  }
  
  return result;
}

// Iniciar servidor
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor de conversión Romano ↔ Arábigo escuchando en el puerto ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
  });
}

module.exports = { app, romanToArabic, arabicToRoman };