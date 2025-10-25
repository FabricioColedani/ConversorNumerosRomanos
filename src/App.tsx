import React, { useState, useEffect } from 'react';
import { Moon, Sun, History, ArrowRight, X } from 'lucide-react';

// Utilidades de conversión
const arabicToRoman = (num: number): string => {
  if (num < 1 || num > 3999) return '';
  
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  
  let result = '';
  for (let i = 0; i < values.length; i++) {
    while (num >= values[i]) {
      result += symbols[i];
      num -= values[i];
    }
  }
  return result;
};

const romanToArabic = (roman: string): number => {
  const romanMap: { [key: string]: number } = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50,
    'C': 100, 'D': 500, 'M': 1000
  };
  
  let result = 0;
  const upper = roman.toUpperCase();
  
  for (let i = 0; i < upper.length; i++) {
    const current = romanMap[upper[i]];
    const next = romanMap[upper[i + 1]];
    
    if (!current) return -1;
    
    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }
  
  return result;
};

const validateRoman = (roman: string): boolean => {
  if (!roman) return false;
  const pattern = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;
  return pattern.test(roman);
};

interface Conversion {
  id: string;
  arabic: number;
  roman: string;
  timestamp: number;
}

export default function RomanArabicConverter() {
  const [darkMode, setDarkMode] = useState(false);
  const [arabicInput, setArabicInput] = useState('');
  const [romanInput, setRomanInput] = useState('');
  const [history, setHistory] = useState<Conversion[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [arabicError, setArabicError] = useState('');
  const [romanError, setRomanError] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('conversionHistory');
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading history:', e);
      }
    }
  }, []);

  const addToHistory = (arabic: number, roman: string) => {
    const newConversion: Conversion = {
      id: Date.now().toString(),
      arabic,
      roman,
      timestamp: Date.now()
    };
    
    const newHistory = [newConversion, ...history.slice(0, 9)];
    setHistory(newHistory);
    sessionStorage.setItem('conversionHistory', JSON.stringify(newHistory));
  };

  const handleArabicChange = (value: string) => {
    setArabicInput(value);
    setArabicError('');
    
    if (!value) {
      setRomanInput('');
      return;
    }
    
    const num = parseInt(value);
    
    if (isNaN(num)) {
      setArabicError('Ingresa un número válido');
      setRomanInput('');
      return;
    }
    
    if (num < 1 || num > 3999) {
      setArabicError('Número debe estar entre 1 y 3999');
      setRomanInput('');
      return;
    }
    
    const roman = arabicToRoman(num);
    setRomanInput(roman);
    addToHistory(num, roman);
  };

  const handleRomanChange = (value: string) => {
    setRomanInput(value);
    setRomanError('');
    
    if (!value) {
      setArabicInput('');
      return;
    }
    
    const upper = value.toUpperCase();
    
    if (!validateRoman(upper)) {
      setRomanError('Notación romana inválida');
      setArabicInput('');
      return;
    }
    
    const arabic = romanToArabic(upper);
    
    if (arabic < 1 || arabic > 3999) {
      setRomanError('Resultado fuera de rango (1-3999)');
      setArabicInput('');
      return;
    }
    
    setArabicInput(arabic.toString());
    addToHistory(arabic, upper);
  };

  const clearHistory = () => {
    setHistory([]);
    sessionStorage.removeItem('conversionHistory');
  };

  const loadFromHistory = (conversion: Conversion) => {
    setArabicInput(conversion.arabic.toString());
    setRomanInput(conversion.roman);
    setShowHistory(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className={`text-3xl md:text-4xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Conversor Números
            </h1>
            <p className={`text-sm md:text-base mt-1 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Arábigos ↔ Romanos
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              } shadow-md`}
              aria-label="Historial"
            >
              <History size={24} />
            </button>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              } shadow-md`}
              aria-label="Cambiar tema"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </div>

        {/* Historial */}
        {showHistory && history.length > 0 && (
          <div className={`mb-6 p-4 rounded-lg shadow-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-semibold ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Conversiones Recientes
              </h3>
              <button
                onClick={clearHistory}
                className={`text-sm px-3 py-1 rounded transition-colors ${
                  darkMode
                    ? 'text-red-400 hover:bg-gray-700'
                    : 'text-red-600 hover:bg-red-50'
                }`}
              >
                Limpiar
              </button>
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => loadFromHistory(item)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    darkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono">{item.arabic}</span>
                    <ArrowRight size={16} className="mx-2 opacity-50" />
                    <span className="font-semibold">{item.roman}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Conversores */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Arábigo a Romano */}
          <div className={`p-6 rounded-xl shadow-xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Arábigo → Romano
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Número (1-3999)
                </label>
                <input
                  type="number"
                  value={arabicInput}
                  onChange={(e) => handleArabicChange(e.target.value)}
                  placeholder="Ej: 2024"
                  min="1"
                  max="3999"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                    arabicError
                      ? 'border-red-500'
                      : darkMode
                      ? 'border-gray-600 bg-gray-700 text-white'
                      : 'border-gray-300 bg-white'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {arabicError && (
                  <p className="text-red-500 text-sm mt-1">{arabicError}</p>
                )}
              </div>
              
              {!arabicError && arabicInput && (
                <div className={`p-4 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-blue-50'
                }`}>
                  <p className={`text-sm mb-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Resultado:
                  </p>
                  <p className={`text-3xl font-bold ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {romanInput}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Romano a Arábigo */}
          <div className={`p-6 rounded-xl shadow-xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Romano → Arábigo
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Número Romano
                </label>
                <input
                  type="text"
                  value={romanInput}
                  onChange={(e) => handleRomanChange(e.target.value)}
                  placeholder="Ej: MMXXIV"
                  className={`w-full px-4 py-3 rounded-lg border-2 uppercase transition-colors ${
                    romanError
                      ? 'border-red-500'
                      : darkMode
                      ? 'border-gray-600 bg-gray-700 text-white'
                      : 'border-gray-300 bg-white'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {romanError && (
                  <p className="text-red-500 text-sm mt-1">{romanError}</p>
                )}
              </div>
              
              {!romanError && romanInput && (
                <div className={`p-4 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-indigo-50'
                }`}>
                  <p className={`text-sm mb-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Resultado:
                  </p>
                  <p className={`text-3xl font-bold ${
                    darkMode ? 'text-indigo-400' : 'text-indigo-600'
                  }`}>
                    {arabicInput}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className={`mt-8 p-4 rounded-lg ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-md`}>
          <h3 className={`font-semibold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Símbolos Romanos
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-2 text-center">
            {[
              ['I', '1'],
              ['V', '5'],
              ['X', '10'],
              ['L', '50'],
              ['C', '100'],
              ['D', '500'],
              ['M', '1000']
            ].map(([roman, arabic]) => (
              <div key={roman} className={`p-2 rounded ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className={`font-bold ${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {roman}
                </div>
                <div className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {arabic}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guía de uso */}
        <div className={`mt-6 p-6 rounded-lg ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-md`}>
          <h3 className={`text-xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            ¿Cómo Funcionan los Números Romanos?
          </h3>
          
          <div className="space-y-6">
            {/* Regla 1 */}
            <div>
              <h4 className={`font-semibold mb-2 flex items-center ${
                darkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                <span className="mr-2"></span>
                1. Regla de Adición
              </h4>
              <p className={`mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Cuando un símbolo aparece después de uno de mayor o igual valor, se <strong>suman</strong>.
              </p>
              <div className={`p-3 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-blue-50'
              }`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="text-center">
                    <span className={`font-mono text-lg ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>VI</span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}> = V + I = 5 + 1 = </span>
                    <span className="font-bold">6</span>
                  </div>
                  <div className="text-center">
                    <span className={`font-mono text-lg ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>XII</span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}> = X + I + I = 10 + 1 + 1 = </span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="text-center">
                    <span className={`font-mono text-lg ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>LXVII</span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}> = 50 + 10 + 5 + 2 = </span>
                    <span className="font-bold">67</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Regla 2 */}
            <div>
              <h4 className={`font-semibold mb-2 flex items-center ${
                darkMode ? 'text-indigo-400' : 'text-indigo-600'
              }`}>
                <span className="mr-2"></span>
                2. Regla de Sustracción
              </h4>
              <p className={`mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Cuando un símbolo menor aparece <strong>antes</strong> de uno mayor, se <strong>resta</strong>.
              </p>
              <div className={`p-3 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-indigo-50'
              }`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="text-center">
                    <span className={`font-mono text-lg ${
                      darkMode ? 'text-indigo-400' : 'text-indigo-600'
                    }`}>IV</span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}> = V - I = 5 - 1 = </span>
                    <span className="font-bold">4</span>
                  </div>
                  <div className="text-center">
                    <span className={`font-mono text-lg ${
                      darkMode ? 'text-indigo-400' : 'text-indigo-600'
                    }`}>IX</span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}> = X - I = 10 - 1 = </span>
                    <span className="font-bold">9</span>
                  </div>
                  <div className="text-center">
                    <span className={`font-mono text-lg ${
                      darkMode ? 'text-indigo-400' : 'text-indigo-600'
                    }`}>XL</span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}> = L - X = 50 - 10 = </span>
                    <span className="font-bold">40</span>
                  </div>
                </div>
              </div>
              <p className={`mt-2 text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Solo se permiten estas restas: IV (4), IX (9), XL (40), XC (90), CD (400), CM (900)
              </p>
            </div>

            {/* Regla 3 */}
            <div>
              <h4 className={`font-semibold mb-2 flex items-center ${
                darkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>
                <span className="mr-2"></span>
                3. Regla de Repetición
              </h4>
              <p className={`mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Los símbolos I, X, C y M pueden repetirse hasta <strong>3 veces</strong> seguidas.
              </p>
              <div className={`p-3 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-purple-50'
              }`}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
                  <div>
                    <span className={`font-mono text-lg ${
                      darkMode ? 'text-purple-400' : 'text-purple-600'
                    }`}>III</span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}> = </span>
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <span className={`font-mono text-lg ${
                      darkMode ? 'text-purple-400' : 'text-purple-600'
                    }`}>XXX</span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}> = </span>
                    <span className="font-bold">30</span>
                  </div>
                  <div>
                    <span className={`font-mono text-lg ${
                      darkMode ? 'text-purple-400' : 'text-purple-600'
                    }`}>CCC</span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}> = </span>
                    <span className="font-bold">300</span>
                  </div>
                  <div>
                    <span className={`font-mono text-lg ${
                      darkMode ? 'text-purple-400' : 'text-purple-600'
                    }`}>MMM</span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}> = </span>
                    <span className="font-bold">3000</span>
                  </div>
                </div>
              </div>
              <p className={`mt-2 text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                V, L y D <strong>nunca</strong> se repiten (usa IV en lugar de IIII)
              </p>
            </div>

            {/* Ejemplos complejos */}
            <div>
              <h4 className={`font-semibold mb-2 flex items-center ${
                darkMode ? 'text-green-400' : 'text-green-600'
              }`}>
                <span className="mr-2"></span>
                Ejemplos Paso a Paso
              </h4>
              <div className={`p-4 rounded-lg space-y-3 ${
                darkMode ? 'bg-gray-700' : 'bg-green-50'
              }`}>
                <div className={`p-3 rounded ${
                  darkMode ? 'bg-gray-600' : 'bg-white'
                }`}>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <span className={`font-mono text-xl font-bold ${
                      darkMode ? 'text-green-400' : 'text-green-600'
                    }`}>
                      MCMXCIV
                    </span>
                    <span className={`text-sm mt-2 md:mt-0 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      M (1000) + CM (900) + XC (90) + IV (4)
                    </span>
                    <span className="font-bold text-lg mt-2 md:mt-0">= 1994</span>
                  </div>
                </div>
                
                <div className={`p-3 rounded ${
                  darkMode ? 'bg-gray-600' : 'bg-white'
                }`}>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <span className={`font-mono text-xl font-bold ${
                      darkMode ? 'text-green-400' : 'text-green-600'
                    }`}>
                      MMXXIV
                    </span>
                    <span className={`text-sm mt-2 md:mt-0 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      MM (2000) + XX (20) + IV (4)
                    </span>
                    <span className="font-bold text-lg mt-2 md:mt-0">= 2024</span>
                  </div>
                </div>

                <div className={`p-3 rounded ${
                  darkMode ? 'bg-gray-600' : 'bg-white'
                }`}>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <span className={`font-mono text-xl font-bold ${
                      darkMode ? 'text-green-400' : 'text-green-600'
                    }`}>
                      CDXLIV
                    </span>
                    <span className={`text-sm mt-2 md:mt-0 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      CD (400) + XL (40) + IV (4)
                    </span>
                    <span className="font-bold text-lg mt-2 md:mt-0">= 444</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dato curioso */}
            <div className={`p-4 rounded-lg border-2 ${
              darkMode 
                ? 'bg-gray-700 border-yellow-500/50' 
                : 'bg-yellow-50 border-yellow-400'
            }`}>
              <h4 className={`font-semibold mb-2 flex items-center ${
                darkMode ? 'text-yellow-400' : 'text-yellow-700'
              }`}>
                <span className="mr-2"></span>
                ¿Sabías que...?
              </h4>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Los romanos no tenían un símbolo para el <strong>cero</strong>. El concepto del cero llegó mucho después a Europa desde el mundo árabe e indio. Por eso los números romanos comienzan desde el 1.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}