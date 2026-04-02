/* ---------------------------------------------------------
   generate-maps.js – creates sbs-map.json from the Keyman
   gff_sbs keyboard definition (v1.0.8).

   Usage:  node generate-maps.js
   Output: sbs-map.json  (804 entries)
   --------------------------------------------------------- */

const fs = require('fs');

/* ================================================================
   Consonant order (matches Keyman QubeeKeys store exactly)
   ================================================================ */
const CONS = ['b','j','d','h','w','z','x','y','k','l','m','n','s','f','q','r','t','g','c','p','v'];

/* ================================================================
   Vowel orders (0=base, 1-5=short a/u/i/e/o, 6-10=long aa/uu/ii/ee/oo)
   ================================================================ */
const VOWELS = ['','a','u','i','e','o','aa','uu','ii','ee','oo'];
const V_IPA  = ['','a','u','i','e','o','a\u02D0','u\u02D0','i\u02D0','e\u02D0','o\u02D0'];

/* ================================================================
   Exact PUA code points from Keyman stores.
   Each Orders* store has 63 entries: 21 regular + 21 geminated + 21 special.
   We parse the exact hex values from the Keyman file.
   ================================================================ */

function parseStore(hexStr) {
  return hexStr.trim().split(/\s+/).map(s => parseInt(s.replace('U+',''), 16));
}

/* OrdersConsonantsRegular (21 entries – consonant-alone forms) */
const REG_ALONE = parseStore(
  'U+E023 U+E03B U+E053 U+E06B U+E083 U+E09B U+E0CB U+E0E3 U+E0FB U+E113 U+E12B U+E143 U+E15B U+E173 U+E18B U+E1A3 U+E1B3 U+E1C3 U+E1D3 U+E1E3 U+E1F3'
);

/* OrdersConsonantsGeminated (21 entries – geminated consonant-alone forms) */
const GEM_ALONE = parseStore(
  'U+E02F U+E047 U+E05F U+E077 U+E08F U+E0A7 U+E0D7 U+E0EF U+E107 U+E11F U+E137 U+E14F U+E167 U+E17F U+E197 U+E1AF U+E1BF U+E1CF U+E1DF U+E1EF U+E1FF'
);

/* OrdersBase – 63 entries (21 regular + 21 geminated + 21 special) */
const ORD_BASE = parseStore(
  'U+E018 U+E024 U+E030 U+E03C U+E048 U+E054 U+E060 U+E06C U+E078 U+E084 U+E090 U+E09C U+E0A8 U+E0B4 U+E0C0 U+E0CC U+E0D8 U+E0E4 U+E0F0 U+E0FC U+E108 ' +
  'U+E114 U+E120 U+E12C U+E138 U+E144 U+E150 U+E15C U+E168 U+E174 U+E180 U+E18C U+E198 U+E1A4 U+E1B0 U+E1BC U+E1C8 U+E1D4 U+E1E0 U+E1EC U+E1F8 U+E204 ' +
  'U+E210 U+E21C U+E228 U+E234 U+E240 U+E24C U+E258 U+E264 U+E270 U+E27C U+E288 U+E294 U+E2A0 U+E2AC U+E2B8 U+E2C4 U+E2D0 U+E2DC U+E2E8 U+E2F4 U+E300 U+E30C'
);

/* OrdersShortA – 63 entries */
const ORD_A = parseStore(
  'U+E019 U+E025 U+E031 U+E03D U+E049 U+E055 U+E061 U+E06D U+E079 U+E085 U+E091 U+E09D U+E0A9 U+E0B5 U+E0C1 U+E0CD U+E0D9 U+E0E5 U+E0F1 U+E0FD U+E109 ' +
  'U+E115 U+E121 U+E12D U+E139 U+E145 U+E151 U+E15D U+E169 U+E175 U+E181 U+E18D U+E199 U+E1A5 U+E1B1 U+E1BD U+E1C9 U+E1D5 U+E1E1 U+E1ED U+E1F9 U+E205 ' +
  'U+E211 U+E21D U+E229 U+E235 U+E241 U+E24D U+E259 U+E265 U+E271 U+E27D U+E289 U+E295 U+E2A1 U+E2AD U+E2B9 U+E2C5 U+E2D1 U+E2DD U+E2E9 U+E2F5 U+E301 U+E30D'
);

/* OrdersShortU – 63 entries */
const ORD_U = parseStore(
  'U+E01A U+E026 U+E032 U+E03E U+E04A U+E056 U+E062 U+E06E U+E07A U+E086 U+E092 U+E09E U+E0AA U+E0B6 U+E0C2 U+E0CE U+E0DA U+E0E6 U+E0F2 U+E0FE U+E10A ' +
  'U+E116 U+E122 U+E12E U+E13A U+E146 U+E152 U+E15E U+E16A U+E176 U+E182 U+E18E U+E19A U+E1A6 U+E1B2 U+E1BE U+E1CA U+E1D6 U+E1E2 U+E1EE U+E1FA U+E206 ' +
  'U+E212 U+E21E U+E22A U+E236 U+E242 U+E24E U+E25A U+E266 U+E272 U+E27E U+E28A U+E296 U+E2A2 U+E2AE U+E2BA U+E2C6 U+E2D2 U+E2DE U+E2EA U+E2F6 U+E302 U+E30E'
);

/* OrdersShortI – 63 entries */
const ORD_I = parseStore(
  'U+E01B U+E027 U+E033 U+E03F U+E04B U+E057 U+E063 U+E06F U+E07B U+E087 U+E093 U+E09F U+E0AB U+E0B7 U+E0C3 U+E0CF U+E0DB U+E0E7 U+E0F3 U+E0FF U+E10B ' +
  'U+E117 U+E123 U+E12F U+E13B U+E147 U+E153 U+E15F U+E16B U+E177 U+E183 U+E18F U+E19B U+E1A7 U+E1B3 U+E1BF U+E1CB U+E1D7 U+E1E3 U+E1EF U+E1FB U+E207 ' +
  'U+E213 U+E21F U+E22B U+E237 U+E243 U+E24F U+E25B U+E267 U+E273 U+E27F U+E28B U+E297 U+E2A3 U+E2AF U+E2BB U+E2C7 U+E2D3 U+E2DF U+E2EB U+E2F7 U+E303 U+E30F'
);

/* OrdersShortE – 63 entries */
const ORD_E = parseStore(
  'U+E01C U+E028 U+E034 U+E040 U+E04C U+E058 U+E064 U+E070 U+E07C U+E088 U+E094 U+E0A0 U+E0AC U+E0B8 U+E0C4 U+E0D0 U+E0DC U+E0E8 U+E0F4 U+E100 U+E10C ' +
  'U+E118 U+E124 U+E130 U+E13C U+E148 U+E154 U+E160 U+E16C U+E178 U+E184 U+E190 U+E19C U+E1A8 U+E1B4 U+E1C0 U+E1CC U+E1D8 U+E1E4 U+E1F0 U+E1FC U+E208 ' +
  'U+E214 U+E220 U+E22C U+E238 U+E244 U+E250 U+E25C U+E268 U+E274 U+E280 U+E28C U+E298 U+E2A4 U+E2B0 U+E2BC U+E2C8 U+E2D4 U+E2E0 U+E2EC U+E2F8 U+E304 U+E310'
);

/* OrdersShortO – 63 entries */
const ORD_O = parseStore(
  'U+E01D U+E029 U+E035 U+E041 U+E04D U+E059 U+E065 U+E071 U+E07D U+E089 U+E095 U+E0A1 U+E0AD U+E0B9 U+E0C5 U+E0D1 U+E0DD U+E0E9 U+E0F5 U+E101 U+E10D ' +
  'U+E119 U+E125 U+E131 U+E13D U+E149 U+E155 U+E161 U+E16D U+E179 U+E185 U+E191 U+E19D U+E1A9 U+E1B5 U+E1C1 U+E1CD U+E1D9 U+E1E5 U+E1F1 U+E1FD U+E209 ' +
  'U+E215 U+E221 U+E22D U+E239 U+E245 U+E251 U+E25D U+E269 U+E275 U+E281 U+E28D U+E299 U+E2A5 U+E2B1 U+E2BD U+E2C9 U+E2D5 U+E2E1 U+E2ED U+E2F9 U+E305 U+E311'
);

/* OrdersLongA – 63 entries */
const ORD_AA = parseStore(
  'U+E01E U+E02A U+E036 U+E042 U+E04E U+E05A U+E066 U+E072 U+E07E U+E08A U+E096 U+E0A2 U+E0AE U+E0BA U+E0C6 U+E0D2 U+E0DE U+E0EA U+E0F6 U+E102 U+E10E ' +
  'U+E11A U+E126 U+E132 U+E13E U+E14A U+E156 U+E162 U+E16E U+E17A U+E186 U+E192 U+E19E U+E1AA U+E1B6 U+E1C2 U+E1CE U+E1DA U+E1E6 U+E1F2 U+E1FE U+E20A ' +
  'U+E216 U+E222 U+E22E U+E23A U+E246 U+E252 U+E25E U+E26A U+E276 U+E282 U+E28E U+E29A U+E2A6 U+E2B2 U+E2BE U+E2CA U+E2D6 U+E2E2 U+E2EE U+E2FA U+E306 U+E312'
);

/* OrdersLongU – 63 entries */
const ORD_UU = parseStore(
  'U+E01F U+E02B U+E037 U+E043 U+E04F U+E05B U+E067 U+E073 U+E07F U+E08B U+E097 U+E0A3 U+E0AF U+E0BB U+E0C7 U+E0D3 U+E0DF U+E0EB U+E0F7 U+E103 U+E10F ' +
  'U+E11B U+E127 U+E133 U+E13F U+E14B U+E157 U+E163 U+E16F U+E17B U+E187 U+E193 U+E19F U+E1AB U+E1B7 U+E1C3 U+E1CF U+E1DB U+E1E7 U+E1F3 U+E1FF U+E20B ' +
  'U+E217 U+E223 U+E22F U+E23B U+E247 U+E253 U+E25F U+E26B U+E277 U+E283 U+E28F U+E29B U+E2A7 U+E2B3 U+E2BF U+E2CB U+E2D7 U+E2E3 U+E2EF U+E2FB U+E307 U+E313'
);

/* OrdersLongI – 63 entries */
const ORD_II = parseStore(
  'U+E020 U+E02C U+E038 U+E044 U+E050 U+E05C U+E068 U+E074 U+E080 U+E08C U+E098 U+E0A4 U+E0B0 U+E0BC U+E0C8 U+E0D4 U+E0E0 U+E0EC U+E0F8 U+E104 U+E110 ' +
  'U+E11C U+E128 U+E134 U+E140 U+E14C U+E158 U+E164 U+E170 U+E17C U+E188 U+E194 U+E1A0 U+E1AC U+E1B8 U+E1C4 U+E1D0 U+E1DC U+E1E8 U+E1F4 U+E200 U+E20C ' +
  'U+E218 U+E224 U+E230 U+E23C U+E248 U+E254 U+E260 U+E26C U+E278 U+E284 U+E290 U+E29C U+E2A8 U+E2B4 U+E2C0 U+E2CC U+E2D8 U+E2E4 U+E2F0 U+E2FC U+E308 U+E314'
);

/* OrdersLongE – 63 entries */
const ORD_EE = parseStore(
  'U+E021 U+E02D U+E039 U+E045 U+E051 U+E05D U+E069 U+E075 U+E081 U+E08D U+E099 U+E0A5 U+E0B1 U+E0BD U+E0C9 U+E0D5 U+E0E1 U+E0ED U+E0F9 U+E105 U+E111 ' +
  'U+E11D U+E129 U+E135 U+E141 U+E14D U+E159 U+E165 U+E171 U+E17D U+E189 U+E195 U+E1A1 U+E1AD U+E1B9 U+E1C5 U+E1D1 U+E1DD U+E1E9 U+E1F5 U+E201 U+E20D ' +
  'U+E219 U+E225 U+E231 U+E23D U+E249 U+E255 U+E261 U+E26D U+E279 U+E285 U+E291 U+E29D U+E2A9 U+E2B5 U+E2C1 U+E2CD U+E2D9 U+E2E5 U+E2F1 U+E2FD U+E309 U+E315'
);

/* OrdersLongO – 63 entries */
const ORD_OO = parseStore(
  'U+E022 U+E02E U+E03A U+E046 U+E052 U+E05E U+E06A U+E076 U+E082 U+E08E U+E09A U+E0A6 U+E0B2 U+E0BE U+E0CA U+E0D6 U+E0E2 U+E0EE U+E0FA U+E106 U+E112 ' +
  'U+E11E U+E12A U+E136 U+E142 U+E14E U+E15A U+E166 U+E172 U+E17E U+E18A U+E196 U+E1A2 U+E1AE U+E1BA U+E1C6 U+E1D2 U+E1DE U+E1EA U+E1F6 U+E202 U+E20E ' +
  'U+E21A U+E226 U+E232 U+E23E U+E24A U+E256 U+E262 U+E26E U+E27A U+E286 U+E292 U+E29E U+E2AA U+E2B6 U+E2C2 U+E2CE U+E2DA U+E2E6 U+E2F2 U+E2FE U+E30A U+E316'
);

/* Build 11-order block arrays for each consonant index */
const ORDERS = [ORD_BASE, ORD_A, ORD_U, ORD_I, ORD_E, ORD_O, ORD_AA, ORD_UU, ORD_II, ORD_EE, ORD_OO];

/* ================================================================
   Special vowels (glottal stop & pharyngeal)
   ================================================================ */

/* Glottal stop vowels */
const GLOTTAL_SHORT = [0xE001, 0xE002, 0xE003, 0xE004, 0xE005];
const GLOTTAL_LONG  = [0xE006, 0xE007, 0xE008, 0xE009, 0xE00A];
const GLOTTAL_GEM_SHORT = [0xE00D, 0xE00E, 0xE00F, 0xE010, 0xE011];
const GLOTTAL_GEM_LONG  = [0xE012, 0xE013, 0xE014, 0xE015, 0xE016];

/* Pharyngeal vowels */
const PHAR_SHORT = [0xE2A1, 0xE2A2, 0xE2A3, 0xE2A4, 0xE2A5];
const PHAR_LONG  = [0xE2A6, 0xE2A7, 0xE2A8, 0xE2A9, 0xE2AA];
const PHAR_GEM_SHORT = [0xE2AD, 0xE2AE, 0xE2AF, 0xE2B0, 0xE2B1];
const PHAR_GEM_LONG  = [0xE2B2, 0xE2B3, 0xE2B4, 0xE2B5, 0xE2B6];

/* ================================================================
   Punctuation & digits
   ================================================================ */
const WORD_SEP  = 0xE322;
const FULL_STOP = 0xE323;
const DIGITS    = [0xE318, 0xE319, 0xE31A, 0xE31B, 0xE31C,
                   0xE31D, 0xE31E, 0xE31F, 0xE320, 0xE321];

/* ================================================================
   Build the three mapping objects
   ================================================================ */
const QUBEE_TO_SBS = {};
const SBS_TO_QUBEE = {};
const SBS_META     = {};

function add(token, cp, name, ipa) {
  const ch = String.fromCodePoint(cp);
  QUBEE_TO_SBS[token] = ch;
  SBS_TO_QUBEE[ch]    = token;
  SBS_META[ch]        = { name, ipa };
}

function sylName(cons, vowel) {
  const v = vowel.toUpperCase();
  return `SHEEK BAKRII SAPHALOO SYLLABLE ${cons.toUpperCase()}${v}`;
}

/* ---- Regular consonants (21 × 11 = 231) ---- */
CONS.forEach((c, ci) => {
  add(c, REG_ALONE[ci],
    `SHEEK BAKRII SAPHALOO SYLLABLE ${c.toUpperCase()}`, c);
  for (let v = 1; v <= 10; v++) {
    const token = c + VOWELS[v];
    const cp = ORDERS[v][ci];
    add(token, cp, sylName(c, VOWELS[v]), c + V_IPA[v]);
  }
});

/* ---- Geminated consonants (21 × 11 = 231) ---- */
CONS.forEach((c, ci) => {
  const gem = c + c;
  const gi = ci + 21;
  add(gem, GEM_ALONE[ci],
    `SHEEK BAKRII SAPHALOO SYLLABLE ${gem.toUpperCase()}`, gem);
  for (let v = 1; v <= 10; v++) {
    const token = gem + VOWELS[v];
    const cp = ORDERS[v][gi];
    add(token, cp, sylName(gem, VOWELS[v]), gem + V_IPA[v]);
  }
});

/* ---- Special forms (21 × 11 = 231) ----
   These are the digraphs and other special consonant forms.
   Indices 42-62 in the Orders* stores.
   We assign Latin tokens based on the Keyman digraph rules. */

/* Special form labels (21 entries) based on Keyman digraph analysis:
   0: ch   (c+h)
   1: sh   (s+h)
   2: ny   (n+y)
   3: fh   (f+h)
   4: cch  (geminated ch)
   5: ssh  (geminated sh)
   6: nny  (geminated ny)
   7: ffh  (geminated fh)
   8: by   (b+y)
   9: my   (m+y)
   10: bby (geminated by)
   11: mmy (geminated my)
   12: cx  (c+x)
   13: sx  (s+x)
   14: nx  (n+x)
   15: fx  (f+x)
   16: ccx (geminated cx)
   17: ssx (geminated sx)
   18: nnx (geminated nx)
   19: ffx (geminated fx)
   20: ts  (t+s) */

const SPECIAL_LABELS = [
  'ch','sh','ny','fh',
  'cch','ssh','nny','ffh',
  'by','my','bby','mmy',
  'cx','sx','nx','fx',
  'ccx','ssx','nnx','ffx',
  'ts'
];

SPECIAL_LABELS.forEach((label, si) => {
  const idx = 42 + si;
  if (idx >= 63) return;
  /* consonant-alone form */
  add(label, ORD_BASE[idx],
    `SHEEK BAKRII SAPHALOO SYLLABLE ${label.toUpperCase()}`, label);
  /* 10 vowel orders */
  for (let v = 1; v <= 10; v++) {
    const token = label + VOWELS[v];
    const cp = ORDERS[v][idx];
    add(token, cp, sylName(label, VOWELS[v]), label + V_IPA[v]);
  }
});

/* tss (geminated ts) – from Keyman S-digraph geminated rule */
const TSS_BASE = 0xE317;
add('tss', TSS_BASE,
  'SHEEK BAKRII SAPHALOO SYLLABLE TSS', 'tss');
for (let v = 1; v <= 10; v++) {
  const token = 'tss' + VOWELS[v];
  const cp = TSS_BASE + v;
  add(token, cp, sylName('tss', VOWELS[v]), 'tss' + V_IPA[v]);
}

/* ---- Glottal vowels (20) ---- */
const GL_SHORT_T = ['a','u','i','e','o'];
const GL_LONG_T  = ['aa','uu','ii','ee','oo'];
const GL_GS_T    = ['ax','ux','ix','ex','ox'];
const GL_GL_T    = ['aax','uux','iix','eex','oox'];

GL_SHORT_T.forEach((t, i) => {
  add(t, GLOTTAL_SHORT[i], `SHEEK BAKRII SAPHALOO SYLLABLE ${t.toUpperCase()}`, V_IPA[i+1]);
});
GL_LONG_T.forEach((t, i) => {
  add(t, GLOTTAL_LONG[i], `SHEEK BAKRII SAPHALOO SYLLABLE ${t.toUpperCase()}`, V_IPA[i+6]);
});
GL_GS_T.forEach((t, i) => {
  add(t, GLOTTAL_GEM_SHORT[i], `SHEEK BAKRII SAPHALOO SYLLABLE ${t.toUpperCase()}`, V_IPA[i+1] + '\u02E4');
});
GL_GL_T.forEach((t, i) => {
  add(t, GLOTTAL_GEM_LONG[i], `SHEEK BAKRII SAPHALOO SYLLABLE ${t.toUpperCase()}`, V_IPA[i+6] + '\u02E4');
});

/* ---- Pharyngeal vowels (20) ---- */
const PH_SHORT_T = ['A','U','I','E','O'];
const PH_LONG_T  = ['AA','UU','II','EE','OO'];
const PH_GS_T    = ['Ax','Ux','Ix','Ex','Ox'];
const PH_GL_T    = ['AAx','UUx','IIx','EEx','OOx'];

PH_SHORT_T.forEach((t, i) => {
  add(t, PHAR_SHORT[i], `SHEEK BAKRII SAPHALOO SYLLABLE ${t}`, '\u0295' + V_IPA[i+1]);
});
PH_LONG_T.forEach((t, i) => {
  add(t, PHAR_LONG[i], `SHEEK BAKRII SAPHALOO SYLLABLE ${t}`, '\u0295' + V_IPA[i+6]);
});
PH_GS_T.forEach((t, i) => {
  add(t, PHAR_GEM_SHORT[i], `SHEEK BAKRII SAPHALOO SYLLABLE ${t}`, '\u0295\u02E4' + V_IPA[i+1]);
});
PH_GL_T.forEach((t, i) => {
  add(t, PHAR_GEM_LONG[i], `SHEEK BAKRII SAPHALOO SYLLABLE ${t}`, '\u0295\u02E4' + V_IPA[i+6]);
});

/* ---- Punctuation ---- */
add('\u00B7', WORD_SEP, 'SHEEK BAKRII SAPHALOO WORD SEPARATOR', '\u00B7');
add(':', WORD_SEP, 'SHEEK BAKRII SAPHALOO WORD SEPARATOR', '\u00B7');
add('.', FULL_STOP, 'SHEEK BAKRII SAPHALOO FULL STOP', '.');

/* ---- Digits (10) ---- */
const DIG_NAMES = ['ZERO','ONE','TWO','THREE','FOUR','FIVE','SIX','SEVEN','EIGHT','NINE'];
for (let d = 0; d <= 9; d++) {
  add(String(d), DIGITS[d],
    `SHEEK BAKRII SAPHALOO DIGIT ${DIG_NAMES[d]}`, String(d));
}

/* ================================================================
   Write sbs-map.json
   ================================================================ */
const total = Object.keys(QUBEE_TO_SBS).length;
fs.writeFileSync('sbs-map.json',
  JSON.stringify({ QUBEE_TO_SBS, SBS_TO_QUBEE, SBS_META }, null, 2));

console.log(`sbs-map.json generated – ${total} entries`);
console.log(`  QUBEE_TO_SBS: ${Object.keys(QUBEE_TO_SBS).length}`);
console.log(`  SBS_TO_QUBEE: ${Object.keys(SBS_TO_QUBEE).length}`);
console.log(`  SBS_META:     ${Object.keys(SBS_META).length}`);
