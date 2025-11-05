const { romanToArabic, arabicToRoman } = require('./server');

console.log('🧪 Ejecutando tests...\n');

// Tests romanToArabic
console.log('📝 Tests: Romano → Arábigo');
const romanTests = [
  ['I', 1],
  ['IV', 4],
  ['V', 5],
  ['IX', 9],
  ['X', 10],
  ['MCMXCIV', 1994],
  ['MMXXIV', 2024],
  ['CDXLIV', 444]
];

let passedRoman = 0;
romanTests.forEach(([roman, expected]) => {
  const result = romanToArabic(roman);
  const status = result === expected ? '✅' : '❌';
  if (result === expected) passedRoman++;
  console.log(`${status} ${roman} → ${result} (esperado: ${expected})`);
});

console.log(`\n✨ Romano → Arábigo: ${passedRoman}/${romanTests.length} tests pasados\n`);

// Tests arabicToRoman
console.log('📝 Tests: Arábigo → Romano');
const arabicTests = [
  [1, 'I'],
  [4, 'IV'],
  [5, 'V'],
  [9, 'IX'],
  [10, 'X'],
  [1994, 'MCMXCIV'],
  [2024, 'MMXXIV'],
  [444, 'CDXLIV']
];

let passedArabic = 0;
arabicTests.forEach(([arabic, expected]) => {
  const result = arabicToRoman(arabic);
  const status = result === expected ? '✅' : '❌';
  if (result === expected) passedArabic++;
  console.log(`${status} ${arabic} → ${result} (esperado: ${expected})`);
});

console.log(`\n✨ Arábigo → Romano: ${passedArabic}/${arabicTests.length} tests pasados\n`);

const total = romanTests.length + arabicTests.length;
const passed = passedRoman + passedArabic;
console.log(`🎯 RESUMEN: ${passed}/${total} tests pasados (${((passed/total)*100).toFixed(1)}%)\n`);