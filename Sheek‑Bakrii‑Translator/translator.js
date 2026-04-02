/* -----------------------------------------------------------
   Sheek Bakrii Saphaloo ↔ Latin Qubee translator
   -----------------------------------------------------------
   Loads sbs-map.json at startup, then provides:
     - latinToSbs()   – Latin Qubee → SBS glyphs
     - sbsToLatin()   – SBS glyphs → Latin Qubee
     - validateSbs()  – check every SBS char against the official repertoire
   ----------------------------------------------------------- */

/* ---- Load the mapping data ---- */
// Mapping data embedded for offline use (no fetch needed)
const MAPS = {
  "QUBEE_TO_SBS": {
    "0": "",
    "1": "",
    "2": "",
    "3": "",
    "4": "",
    "5": "",
    "6": "",
    "7": "",
    "8": "",
    "9": "",
    "b": "",
    "ba": "",
    "bu": "",
    "bi": "",
    "be": "",
    "bo": "",
    "baa": "",
    "buu": "",
    "bii": "",
    "bee": "",
    "boo": "",
    "j": "",
    "ja": "",
    "ju": "",
    "ji": "",
    "je": "",
    "jo": "",
    "jaa": "",
    "juu": "",
    "jii": "",
    "jee": "",
    "joo": "",
    "d": "",
    "da": "",
    "du": "",
    "di": "",
    "de": "",
    "do": "",
    "daa": "",
    "duu": "",
    "dii": "",
    "dee": "",
    "doo": "",
    "h": "",
    "ha": "",
    "hu": "",
    "hi": "",
    "he": "",
    "ho": "",
    "haa": "",
    "huu": "",
    "hii": "",
    "hee": "",
    "hoo": "",
    "w": "",
    "wa": "",
    "wu": "",
    "wi": "",
    "we": "",
    "wo": "",
    "waa": "",
    "wuu": "",
    "wii": "",
    "wee": "",
    "woo": "",
    "z": "",
    "za": "",
    "zu": "",
    "zi": "",
    "ze": "",
    "zo": "",
    "zaa": "",
    "zuu": "",
    "zii": "",
    "zee": "",
    "zoo": "",
    "x": "",
    "xa": "",
    "xu": "",
    "xi": "",
    "xe": "",
    "xo": "",
    "xaa": "",
    "xuu": "",
    "xii": "",
    "xee": "",
    "xoo": "",
    "y": "",
    "ya": "",
    "yu": "",
    "yi": "",
    "ye": "",
    "yo": "",
    "yaa": "",
    "yuu": "",
    "yii": "",
    "yee": "",
    "yoo": "",
    "k": "",
    "ka": "",
    "ku": "",
    "ki": "",
    "ke": "",
    "ko": "",
    "kaa": "",
    "kuu": "",
    "kii": "",
    "kee": "",
    "koo": "",
    "l": "",
    "la": "",
    "lu": "",
    "li": "",
    "le": "",
    "lo": "",
    "laa": "",
    "luu": "",
    "lii": "",
    "lee": "",
    "loo": "",
    "m": "",
    "ma": "",
    "mu": "",
    "mi": "",
    "me": "",
    "mo": "",
    "maa": "",
    "muu": "",
    "mii": "",
    "mee": "",
    "moo": "",
    "n": "",
    "na": "",
    "nu": "",
    "ni": "",
    "ne": "",
    "no": "",
    "naa": "",
    "nuu": "",
    "nii": "",
    "nee": "",
    "noo": "",
    "s": "",
    "sa": "",
    "su": "",
    "si": "",
    "se": "",
    "so": "",
    "saa": "",
    "suu": "",
    "sii": "",
    "see": "",
    "soo": "",
    "f": "",
    "fa": "",
    "fu": "",
    "fi": "",
    "fe": "",
    "fo": "",
    "faa": "",
    "fuu": "",
    "fii": "",
    "fee": "",
    "foo": "",
    "q": "",
    "qa": "",
    "qu": "",
    "qi": "",
    "qe": "",
    "qo": "",
    "qaa": "",
    "quu": "",
    "qii": "",
    "qee": "",
    "qoo": "",
    "r": "",
    "ra": "",
    "ru": "",
    "ri": "",
    "re": "",
    "ro": "",
    "raa": "",
    "ruu": "",
    "rii": "",
    "ree": "",
    "roo": "",
    "t": "",
    "ta": "",
    "tu": "",
    "ti": "",
    "te": "",
    "to": "",
    "taa": "",
    "tuu": "",
    "tii": "",
    "tee": "",
    "too": "",
    "g": "",
    "ga": "",
    "gu": "",
    "gi": "",
    "ge": "",
    "go": "",
    "gaa": "",
    "guu": "",
    "gii": "",
    "gee": "",
    "goo": "",
    "c": "",
    "ca": "",
    "cu": "",
    "ci": "",
    "ce": "",
    "co": "",
    "caa": "",
    "cuu": "",
    "cii": "",
    "cee": "",
    "coo": "",
    "p": "",
    "pa": "",
    "pu": "",
    "pi": "",
    "pe": "",
    "po": "",
    "paa": "",
    "puu": "",
    "pii": "",
    "pee": "",
    "poo": "",
    "v": "",
    "va": "",
    "vu": "",
    "vi": "",
    "ve": "",
    "vo": "",
    "vaa": "",
    "vuu": "",
    "vii": "",
    "vee": "",
    "voo": "",
    "bb": "",
    "bba": "",
    "bbu": "",
    "bbi": "",
    "bbe": "",
    "bbo": "",
    "bbaa": "",
    "bbuu": "",
    "bbii": "",
    "bbee": "",
    "bboo": "",
    "jj": "",
    "jja": "",
    "jju": "",
    "jji": "",
    "jje": "",
    "jjo": "",
    "jjaa": "",
    "jjuu": "",
    "jjii": "",
    "jjee": "",
    "jjoo": "",
    "dd": "",
    "dda": "",
    "ddu": "",
    "ddi": "",
    "dde": "",
    "ddo": "",
    "ddaa": "",
    "dduu": "",
    "ddii": "",
    "ddee": "",
    "ddoo": "",
    "hh": "",
    "hha": "",
    "hhu": "",
    "hhi": "",
    "hhe": "",
    "hho": "",
    "hhaa": "",
    "hhuu": "",
    "hhii": "",
    "hhee": "",
    "hhoo": "",
    "ww": "",
    "wwa": "",
    "wwu": "",
    "wwi": "",
    "wwe": "",
    "wwo": "",
    "wwaa": "",
    "wwuu": "",
    "wwii": "",
    "wwee": "",
    "wwoo": "",
    "zz": "",
    "zza": "",
    "zzu": "",
    "zzi": "",
    "zze": "",
    "zzo": "",
    "zzaa": "",
    "zzuu": "",
    "zzii": "",
    "zzee": "",
    "zzoo": "",
    "xx": "",
    "xxa": "",
    "xxu": "",
    "xxi": "",
    "xxe": "",
    "xxo": "",
    "xxaa": "",
    "xxuu": "",
    "xxii": "",
    "xxee": "",
    "xxoo": "",
    "yy": "",
    "yya": "",
    "yyu": "",
    "yyi": "",
    "yye": "",
    "yyo": "",
    "yyaa": "",
    "yyuu": "",
    "yyii": "",
    "yyee": "",
    "yyoo": "",
    "kk": "",
    "kka": "",
    "kku": "",
    "kki": "",
    "kke": "",
    "kko": "",
    "kkaa": "",
    "kkuu": "",
    "kkii": "",
    "kkee": "",
    "kkoo": "",
    "ll": "",
    "lla": "",
    "llu": "",
    "lli": "",
    "lle": "",
    "llo": "",
    "llaa": "",
    "lluu": "",
    "llii": "",
    "llee": "",
    "lloo": "",
    "mm": "",
    "mma": "",
    "mmu": "",
    "mmi": "",
    "mme": "",
    "mmo": "",
    "mmaa": "",
    "mmuu": "",
    "mmii": "",
    "mmee": "",
    "mmoo": "",
    "nn": "",
    "nna": "",
    "nnu": "",
    "nni": "",
    "nne": "",
    "nno": "",
    "nnaa": "",
    "nnuu": "",
    "nnii": "",
    "nnee": "",
    "nnoo": "",
    "ss": "",
    "ssa": "",
    "ssu": "",
    "ssi": "",
    "sse": "",
    "sso": "",
    "ssaa": "",
    "ssuu": "",
    "ssii": "",
    "ssee": "",
    "ssoo": "",
    "ff": "",
    "ffa": "",
    "ffu": "",
    "ffi": "",
    "ffe": "",
    "ffo": "",
    "ffaa": "",
    "ffuu": "",
    "ffii": "",
    "ffee": "",
    "ffoo": "",
    "qq": "",
    "qqa": "",
    "qqu": "",
    "qqi": "",
    "qqe": "",
    "qqo": "",
    "qqaa": "",
    "qquu": "",
    "qqii": "",
    "qqee": "",
    "qqoo": "",
    "rr": "",
    "rra": "",
    "rru": "",
    "rri": "",
    "rre": "",
    "rro": "",
    "rraa": "",
    "rruu": "",
    "rrii": "",
    "rree": "",
    "rroo": "",
    "tt": "",
    "tta": "",
    "ttu": "",
    "tti": "",
    "tte": "",
    "tto": "",
    "ttaa": "",
    "ttuu": "",
    "ttii": "",
    "ttee": "",
    "ttoo": "",
    "gg": "",
    "gga": "",
    "ggu": "",
    "ggi": "",
    "gge": "",
    "ggo": "",
    "ggaa": "",
    "gguu": "",
    "ggii": "",
    "ggee": "",
    "ggoo": "",
    "cc": "",
    "cca": "",
    "ccu": "",
    "cci": "",
    "cce": "",
    "cco": "",
    "ccaa": "",
    "ccuu": "",
    "ccii": "",
    "ccee": "",
    "ccoo": "",
    "pp": "",
    "ppa": "",
    "ppu": "",
    "ppi": "",
    "ppe": "",
    "ppo": "",
    "ppaa": "",
    "ppuu": "",
    "ppii": "",
    "ppee": "",
    "ppoo": "",
    "vv": "",
    "vva": "",
    "vvu": "",
    "vvi": "",
    "vve": "",
    "vvo": "",
    "vvaa": "",
    "vvuu": "",
    "vvii": "",
    "vvee": "",
    "vvoo": "",
    "ch": "",
    "cha": "",
    "chu": "",
    "chi": "",
    "che": "",
    "cho": "",
    "chaa": "",
    "chuu": "",
    "chii": "",
    "chee": "",
    "choo": "",
    "sh": "",
    "sha": "",
    "shu": "",
    "shi": "",
    "she": "",
    "sho": "",
    "shaa": "",
    "shuu": "",
    "shii": "",
    "shee": "",
    "shoo": "",
    "ny": "",
    "nya": "",
    "nyu": "",
    "nyi": "",
    "nye": "",
    "nyo": "",
    "nyaa": "",
    "nyuu": "",
    "nyii": "",
    "nyee": "",
    "nyoo": "",
    "fh": "",
    "fha": "",
    "fhu": "",
    "fhi": "",
    "fhe": "",
    "fho": "",
    "fhaa": "",
    "fhuu": "",
    "fhii": "",
    "fhee": "",
    "fhoo": "",
    "cch": "",
    "ccha": "",
    "cchu": "",
    "cchi": "",
    "cche": "",
    "ccho": "",
    "cchaa": "",
    "cchuu": "",
    "cchii": "",
    "cchee": "",
    "cchoo": "",
    "ssh": "",
    "ssha": "",
    "sshu": "",
    "sshi": "",
    "sshe": "",
    "ssho": "",
    "sshaa": "",
    "sshuu": "",
    "sshii": "",
    "sshee": "",
    "sshoo": "",
    "nny": "",
    "nnya": "",
    "nnyu": "",
    "nnyi": "",
    "nnye": "",
    "nnyo": "",
    "nnyaa": "",
    "nnyuu": "",
    "nnyii": "",
    "nnyee": "",
    "nnyoo": "",
    "ffh": "",
    "ffha": "",
    "ffhu": "",
    "ffhi": "",
    "ffhe": "",
    "ffho": "",
    "ffhaa": "",
    "ffhuu": "",
    "ffhii": "",
    "ffhee": "",
    "ffhoo": "",
    "by": "",
    "bya": "",
    "byu": "",
    "byi": "",
    "bye": "",
    "byo": "",
    "byaa": "",
    "byuu": "",
    "byii": "",
    "byee": "",
    "byoo": "",
    "my": "",
    "mya": "",
    "myu": "",
    "myi": "",
    "mye": "",
    "myo": "",
    "myaa": "",
    "myuu": "",
    "myii": "",
    "myee": "",
    "myoo": "",
    "bby": "",
    "bbya": "",
    "bbyu": "",
    "bbyi": "",
    "bbye": "",
    "bbyo": "",
    "bbyaa": "",
    "bbyuu": "",
    "bbyii": "",
    "bbyee": "",
    "bbyoo": "",
    "mmy": "",
    "mmya": "",
    "mmyu": "",
    "mmyi": "",
    "mmye": "",
    "mmyo": "",
    "mmyaa": "",
    "mmyuu": "",
    "mmyii": "",
    "mmyee": "",
    "mmyoo": "",
    "cx": "",
    "cxa": "",
    "cxu": "",
    "cxi": "",
    "cxe": "",
    "cxo": "",
    "cxaa": "",
    "cxuu": "",
    "cxii": "",
    "cxee": "",
    "cxoo": "",
    "sx": "",
    "sxa": "",
    "sxu": "",
    "sxi": "",
    "sxe": "",
    "sxo": "",
    "sxaa": "",
    "sxuu": "",
    "sxii": "",
    "sxee": "",
    "sxoo": "",
    "nx": "",
    "nxa": "",
    "nxu": "",
    "nxi": "",
    "nxe": "",
    "nxo": "",
    "nxaa": "",
    "nxuu": "",
    "nxii": "",
    "nxee": "",
    "nxoo": "",
    "fx": "",
    "fxa": "",
    "fxu": "",
    "fxi": "",
    "fxe": "",
    "fxo": "",
    "fxaa": "",
    "fxuu": "",
    "fxii": "",
    "fxee": "",
    "fxoo": "",
    "ccx": "",
    "ccxa": "",
    "ccxu": "",
    "ccxi": "",
    "ccxe": "",
    "ccxo": "",
    "ccxaa": "",
    "ccxuu": "",
    "ccxii": "",
    "ccxee": "",
    "ccxoo": "",
    "ssx": "",
    "ssxa": "",
    "ssxu": "",
    "ssxi": "",
    "ssxe": "",
    "ssxo": "",
    "ssxaa": "",
    "ssxuu": "",
    "ssxii": "",
    "ssxee": "",
    "ssxoo": "",
    "nnx": "",
    "nnxa": "",
    "nnxu": "",
    "nnxi": "",
    "nnxe": "",
    "nnxo": "",
    "nnxaa": "",
    "nnxuu": "",
    "nnxii": "",
    "nnxee": "",
    "nnxoo": "",
    "ffx": "",
    "ffxa": "",
    "ffxu": "",
    "ffxi": "",
    "ffxe": "",
    "ffxo": "",
    "ffxaa": "",
    "ffxuu": "",
    "ffxii": "",
    "ffxee": "",
    "ffxoo": "",
    "ts": "",
    "tsa": "",
    "tsu": "",
    "tsi": "",
    "tse": "",
    "tso": "",
    "tsaa": "",
    "tsuu": "",
    "tsii": "",
    "tsee": "",
    "tsoo": "",
    "tss": "",
    "tssa": "",
    "tssu": "",
    "tssi": "",
    "tsse": "",
    "tsso": "",
    "tssaa": "",
    "tssuu": "",
    "tssii": "",
    "tssee": "",
    "tssoo": "",
    "a": "",
    "u": "",
    "i": "",
    "e": "",
    "o": "",
    "aa": "",
    "uu": "",
    "ii": "",
    "ee": "",
    "oo": "",
    "ax": "",
    "ux": "",
    "ix": "",
    "ex": "",
    "ox": "",
    "aax": "",
    "uux": "",
    "iix": "",
    "eex": "",
    "oox": "",
    "A": "",
    "U": "",
    "I": "",
    "E": "",
    "O": "",
    "AA": "",
    "UU": "",
    "II": "",
    "EE": "",
    "OO": "",
    "Ax": "",
    "Ux": "",
    "Ix": "",
    "Ex": "",
    "Ox": "",
    "AAx": "",
    "UUx": "",
    "IIx": "",
    "EEx": "",
    "OOx": "",
    "·": "",
    ":": "",
    ".": ""
  },
  "SBS_TO_QUBEE": {
    "": "b",
    "": "ba",
    "": "bu",
    "": "bi",
    "": "be",
    "": "bo",
    "": "baa",
    "": "buu",
    "": "bii",
    "": "bee",
    "": "boo",
    "": "j",
    "": "ja",
    "": "ju",
    "": "ji",
    "": "je",
    "": "jo",
    "": "jaa",
    "": "juu",
    "": "jii",
    "": "jee",
    "": "joo",
    "": "d",
    "": "da",
    "": "du",
    "": "di",
    "": "de",
    "": "do",
    "": "daa",
    "": "duu",
    "": "dii",
    "": "dee",
    "": "doo",
    "": "h",
    "": "ha",
    "": "hu",
    "": "hi",
    "": "he",
    "": "ho",
    "": "haa",
    "": "huu",
    "": "hii",
    "": "hee",
    "": "hoo",
    "": "w",
    "": "wa",
    "": "wu",
    "": "wi",
    "": "we",
    "": "wo",
    "": "waa",
    "": "wuu",
    "": "wii",
    "": "wee",
    "": "woo",
    "": "z",
    "": "za",
    "": "zu",
    "": "zi",
    "": "ze",
    "": "zo",
    "": "zaa",
    "": "zuu",
    "": "zii",
    "": "zee",
    "": "zoo",
    "": "x",
    "": "xa",
    "": "xu",
    "": "xi",
    "": "xe",
    "": "xo",
    "": "xaa",
    "": "xuu",
    "": "xii",
    "": "xee",
    "": "xoo",
    "": "y",
    "": "ya",
    "": "yu",
    "": "yi",
    "": "ye",
    "": "yo",
    "": "yaa",
    "": "yuu",
    "": "yii",
    "": "yee",
    "": "yoo",
    "": "k",
    "": "ka",
    "": "ku",
    "": "ki",
    "": "ke",
    "": "ko",
    "": "kaa",
    "": "kuu",
    "": "kii",
    "": "kee",
    "": "koo",
    "": "l",
    "": "la",
    "": "lu",
    "": "li",
    "": "le",
    "": "lo",
    "": "laa",
    "": "luu",
    "": "lii",
    "": "lee",
    "": "loo",
    "": "m",
    "": "ma",
    "": "mu",
    "": "mi",
    "": "me",
    "": "mo",
    "": "maa",
    "": "muu",
    "": "mii",
    "": "mee",
    "": "moo",
    "": "n",
    "": "na",
    "": "nu",
    "": "ni",
    "": "ne",
    "": "no",
    "": "naa",
    "": "nuu",
    "": "nii",
    "": "nee",
    "": "noo",
    "": "s",
    "": "sa",
    "": "su",
    "": "si",
    "": "se",
    "": "so",
    "": "saa",
    "": "suu",
    "": "sii",
    "": "see",
    "": "soo",
    "": "f",
    "": "fa",
    "": "fu",
    "": "fi",
    "": "fe",
    "": "fo",
    "": "faa",
    "": "fuu",
    "": "fii",
    "": "fee",
    "": "foo",
    "": "q",
    "": "qa",
    "": "qu",
    "": "qi",
    "": "qe",
    "": "qo",
    "": "qaa",
    "": "quu",
    "": "qii",
    "": "qee",
    "": "qoo",
    "": "r",
    "": "ra",
    "": "ru",
    "": "ri",
    "": "re",
    "": "ro",
    "": "raa",
    "": "ruu",
    "": "rii",
    "": "ree",
    "": "roo",
    "": "ffi",
    "": "ta",
    "": "tu",
    "": "ti",
    "": "te",
    "": "to",
    "": "taa",
    "": "tuu",
    "": "tii",
    "": "tee",
    "": "too",
    "": "qquu",
    "": "ga",
    "": "gu",
    "": "gi",
    "": "ge",
    "": "go",
    "": "gaa",
    "": "guu",
    "": "gii",
    "": "gee",
    "": "goo",
    "": "c",
    "": "ca",
    "": "cu",
    "": "ci",
    "": "ce",
    "": "co",
    "": "caa",
    "": "cuu",
    "": "cii",
    "": "cee",
    "": "coo",
    "": "ggi",
    "": "pa",
    "": "pu",
    "": "pi",
    "": "pe",
    "": "po",
    "": "paa",
    "": "puu",
    "": "pii",
    "": "pee",
    "": "poo",
    "": "ccuu",
    "": "va",
    "": "vu",
    "": "vi",
    "": "ve",
    "": "vo",
    "": "vaa",
    "": "vuu",
    "": "vii",
    "": "vee",
    "": "voo",
    "": "bb",
    "": "bba",
    "": "bbu",
    "": "bbi",
    "": "bbe",
    "": "bbo",
    "": "bbaa",
    "": "bbuu",
    "": "bbii",
    "": "bbee",
    "": "bboo",
    "": "jj",
    "": "jja",
    "": "jju",
    "": "jji",
    "": "jje",
    "": "jjo",
    "": "jjaa",
    "": "jjuu",
    "": "jjii",
    "": "jjee",
    "": "jjoo",
    "": "dd",
    "": "dda",
    "": "ddu",
    "": "ddi",
    "": "dde",
    "": "ddo",
    "": "ddaa",
    "": "dduu",
    "": "ddii",
    "": "ddee",
    "": "ddoo",
    "": "hh",
    "": "hha",
    "": "hhu",
    "": "hhi",
    "": "hhe",
    "": "hho",
    "": "hhaa",
    "": "hhuu",
    "": "hhii",
    "": "hhee",
    "": "hhoo",
    "": "ww",
    "": "wwa",
    "": "wwu",
    "": "wwi",
    "": "wwe",
    "": "wwo",
    "": "wwaa",
    "": "wwuu",
    "": "wwii",
    "": "wwee",
    "": "wwoo",
    "": "zz",
    "": "zza",
    "": "zzu",
    "": "zzi",
    "": "zze",
    "": "zzo",
    "": "zzaa",
    "": "zzuu",
    "": "zzii",
    "": "zzee",
    "": "zzoo",
    "": "xx",
    "": "xxa",
    "": "xxu",
    "": "xxi",
    "": "xxe",
    "": "xxo",
    "": "xxaa",
    "": "xxuu",
    "": "xxii",
    "": "xxee",
    "": "xxoo",
    "": "yy",
    "": "yya",
    "": "yyu",
    "": "yyi",
    "": "yye",
    "": "yyo",
    "": "yyaa",
    "": "yyuu",
    "": "yyii",
    "": "yyee",
    "": "yyoo",
    "": "kk",
    "": "kka",
    "": "kku",
    "": "kki",
    "": "kke",
    "": "kko",
    "": "kkaa",
    "": "kkuu",
    "": "kkii",
    "": "kkee",
    "": "kkoo",
    "": "ll",
    "": "lla",
    "": "llu",
    "": "lli",
    "": "lle",
    "": "llo",
    "": "llaa",
    "": "lluu",
    "": "llii",
    "": "llee",
    "": "lloo",
    "": "mm",
    "": "mma",
    "": "mmu",
    "": "mmi",
    "": "mme",
    "": "mmo",
    "": "mmaa",
    "": "mmuu",
    "": "mmii",
    "": "mmee",
    "": "mmoo",
    "": "nn",
    "": "nna",
    "": "nnu",
    "": "nni",
    "": "nne",
    "": "nno",
    "": "nnaa",
    "": "nnuu",
    "": "nnii",
    "": "nnee",
    "": "nnoo",
    "": "ss",
    "": "ssa",
    "": "ssu",
    "": "ssi",
    "": "sse",
    "": "sso",
    "": "ssaa",
    "": "ssuu",
    "": "ssii",
    "": "ssee",
    "": "ssoo",
    "": "ff",
    "": "ffa",
    "": "ffu",
    "": "ffe",
    "": "ffo",
    "": "ffaa",
    "": "ffuu",
    "": "ffii",
    "": "ffee",
    "": "ffoo",
    "": "qq",
    "": "qqa",
    "": "qqu",
    "": "tt",
    "": "qqe",
    "": "qqo",
    "": "qqaa",
    "": "qqii",
    "": "qqee",
    "": "qqoo",
    "": "rr",
    "": "rra",
    "": "rru",
    "": "rri",
    "": "rre",
    "": "rro",
    "": "rraa",
    "": "gg",
    "": "rrii",
    "": "rree",
    "": "rroo",
    "": "tta",
    "": "ttu",
    "": "tti",
    "": "tte",
    "": "tto",
    "": "ttaa",
    "": "ttuu",
    "": "ttii",
    "": "ttee",
    "": "ttoo",
    "": "gga",
    "": "ggu",
    "": "gge",
    "": "ggo",
    "": "ggaa",
    "": "gguu",
    "": "ggii",
    "": "ggee",
    "": "ggoo",
    "": "cc",
    "": "cca",
    "": "ccu",
    "": "pp",
    "": "cce",
    "": "cco",
    "": "ccaa",
    "": "ccii",
    "": "ccee",
    "": "ccoo",
    "": "ppa",
    "": "ppu",
    "": "ppi",
    "": "ppe",
    "": "ppo",
    "": "ppaa",
    "": "vv",
    "": "ppii",
    "": "ppee",
    "": "ppoo",
    "": "vva",
    "": "vvu",
    "": "vvi",
    "": "vve",
    "": "vvo",
    "": "vvaa",
    "": "vvuu",
    "": "vvii",
    "": "vvee",
    "": "vvoo",
    "": "ch",
    "": "cha",
    "": "chu",
    "": "chi",
    "": "che",
    "": "cho",
    "": "chaa",
    "": "chuu",
    "": "chii",
    "": "chee",
    "": "choo",
    "": "sh",
    "": "sha",
    "": "shu",
    "": "shi",
    "": "she",
    "": "sho",
    "": "shaa",
    "": "shuu",
    "": "shii",
    "": "shee",
    "": "shoo",
    "": "ny",
    "": "nya",
    "": "nyu",
    "": "nyi",
    "": "nye",
    "": "nyo",
    "": "nyaa",
    "": "nyuu",
    "": "nyii",
    "": "nyee",
    "": "nyoo",
    "": "fh",
    "": "fha",
    "": "fhu",
    "": "fhi",
    "": "fhe",
    "": "fho",
    "": "fhaa",
    "": "fhuu",
    "": "fhii",
    "": "fhee",
    "": "fhoo",
    "": "cch",
    "": "ccha",
    "": "cchu",
    "": "cchi",
    "": "cche",
    "": "ccho",
    "": "cchaa",
    "": "cchuu",
    "": "cchii",
    "": "cchee",
    "": "cchoo",
    "": "ssh",
    "": "ssha",
    "": "sshu",
    "": "sshi",
    "": "sshe",
    "": "ssho",
    "": "sshaa",
    "": "sshuu",
    "": "sshii",
    "": "sshee",
    "": "sshoo",
    "": "nny",
    "": "nnya",
    "": "nnyu",
    "": "nnyi",
    "": "nnye",
    "": "nnyo",
    "": "nnyaa",
    "": "nnyuu",
    "": "nnyii",
    "": "nnyee",
    "": "nnyoo",
    "": "ffh",
    "": "ffha",
    "": "ffhu",
    "": "ffhi",
    "": "ffhe",
    "": "ffho",
    "": "ffhaa",
    "": "ffhuu",
    "": "ffhii",
    "": "ffhee",
    "": "ffhoo",
    "": "by",
    "": "bya",
    "": "byu",
    "": "byi",
    "": "bye",
    "": "byo",
    "": "byaa",
    "": "byuu",
    "": "byii",
    "": "byee",
    "": "byoo",
    "": "my",
    "": "mya",
    "": "myu",
    "": "myi",
    "": "mye",
    "": "myo",
    "": "myaa",
    "": "myuu",
    "": "myii",
    "": "myee",
    "": "myoo",
    "": "bby",
    "": "bbya",
    "": "bbyu",
    "": "bbyi",
    "": "bbye",
    "": "bbyo",
    "": "bbyaa",
    "": "bbyuu",
    "": "bbyii",
    "": "bbyee",
    "": "bbyoo",
    "": "mmy",
    "": "mmya",
    "": "mmyu",
    "": "mmyi",
    "": "mmye",
    "": "mmyo",
    "": "mmyaa",
    "": "mmyuu",
    "": "mmyii",
    "": "mmyee",
    "": "mmyoo",
    "": "cx",
    "": "A",
    "": "U",
    "": "I",
    "": "E",
    "": "O",
    "": "AA",
    "": "UU",
    "": "II",
    "": "EE",
    "": "OO",
    "": "sx",
    "": "Ax",
    "": "Ux",
    "": "Ix",
    "": "Ex",
    "": "Ox",
    "": "AAx",
    "": "UUx",
    "": "IIx",
    "": "EEx",
    "": "OOx",
    "": "nx",
    "": "nxa",
    "": "nxu",
    "": "nxi",
    "": "nxe",
    "": "nxo",
    "": "nxaa",
    "": "nxuu",
    "": "nxii",
    "": "nxee",
    "": "nxoo",
    "": "fx",
    "": "fxa",
    "": "fxu",
    "": "fxi",
    "": "fxe",
    "": "fxo",
    "": "fxaa",
    "": "fxuu",
    "": "fxii",
    "": "fxee",
    "": "fxoo",
    "": "ccx",
    "": "ccxa",
    "": "ccxu",
    "": "ccxi",
    "": "ccxe",
    "": "ccxo",
    "": "ccxaa",
    "": "ccxuu",
    "": "ccxii",
    "": "ccxee",
    "": "ccxoo",
    "": "ssx",
    "": "ssxa",
    "": "ssxu",
    "": "ssxi",
    "": "ssxe",
    "": "ssxo",
    "": "ssxaa",
    "": "ssxuu",
    "": "ssxii",
    "": "ssxee",
    "": "ssxoo",
    "": "nnx",
    "": "nnxa",
    "": "nnxu",
    "": "nnxi",
    "": "nnxe",
    "": "nnxo",
    "": "nnxaa",
    "": "nnxuu",
    "": "nnxii",
    "": "nnxee",
    "": "nnxoo",
    "": "ffx",
    "": "ffxa",
    "": "ffxu",
    "": "ffxi",
    "": "ffxe",
    "": "ffxo",
    "": "ffxaa",
    "": "ffxuu",
    "": "ffxii",
    "": "ffxee",
    "": "ffxoo",
    "": "ts",
    "": "tsa",
    "": "tsu",
    "": "tsi",
    "": "tse",
    "": "tso",
    "": "tsaa",
    "": "tsuu",
    "": "tsii",
    "": "tsee",
    "": "tsoo",
    "": "tss",
    "": "0",
    "": "1",
    "": "2",
    "": "3",
    "": "4",
    "": "5",
    "": "6",
    "": "7",
    "": "8",
    "": "9",
    "": "a",
    "": "u",
    "": "i",
    "": "e",
    "": "o",
    "": "aa",
    "": "uu",
    "": "ii",
    "": "ee",
    "": "oo",
    "": "ax",
    "": "ux",
    "": "ix",
    "": "ex",
    "": "ox",
    "": "aax",
    "": "uux",
    "": "iix",
    "": "eex",
    "": "oox",
    "": ":",
    "": "."
  },
  "SBS_META": {
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE B",
      "ipa": "b"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BA",
      "ipa": "ba"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BU",
      "ipa": "bu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BI",
      "ipa": "bi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BE",
      "ipa": "be"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BO",
      "ipa": "bo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BAA",
      "ipa": "baː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BUU",
      "ipa": "buː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BII",
      "ipa": "biː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BEE",
      "ipa": "beː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BOO",
      "ipa": "boː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE J",
      "ipa": "j"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE JA",
      "ipa": "ja"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE JU",
      "ipa": "ju"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE JI",
      "ipa": "ji"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE JE",
      "ipa": "je"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE JO",
      "ipa": "jo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE JAA",
      "ipa": "jaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE JUU",
      "ipa": "juː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE JII",
      "ipa": "jiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE JEE",
      "ipa": "jeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE JOO",
      "ipa": "joː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE D",
      "ipa": "d"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE DA",
      "ipa": "da"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE DU",
      "ipa": "du"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE DI",
      "ipa": "di"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE DE",
      "ipa": "de"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE DO",
      "ipa": "do"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE DAA",
      "ipa": "daː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE DUU",
      "ipa": "duː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE DII",
      "ipa": "diː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE DEE",
      "ipa": "deː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE DOO",
      "ipa": "doː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE H",
      "ipa": "h"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE HA",
      "ipa": "ha"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE HU",
      "ipa": "hu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE HI",
      "ipa": "hi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE HE",
      "ipa": "he"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE HO",
      "ipa": "ho"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE HAA",
      "ipa": "haː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE HUU",
      "ipa": "huː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE HII",
      "ipa": "hiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE HEE",
      "ipa": "heː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE HOO",
      "ipa": "hoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE W",
      "ipa": "w"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE WA",
      "ipa": "wa"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE WU",
      "ipa": "wu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE WI",
      "ipa": "wi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE WE",
      "ipa": "we"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE WO",
      "ipa": "wo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE WAA",
      "ipa": "waː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE WUU",
      "ipa": "wuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE WII",
      "ipa": "wiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE WEE",
      "ipa": "weː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE WOO",
      "ipa": "woː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE Z",
      "ipa": "z"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ZA",
      "ipa": "za"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ZU",
      "ipa": "zu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ZI",
      "ipa": "zi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ZE",
      "ipa": "ze"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ZO",
      "ipa": "zo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ZAA",
      "ipa": "zaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ZUU",
      "ipa": "zuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ZII",
      "ipa": "ziː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ZEE",
      "ipa": "zeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ZOO",
      "ipa": "zoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE X",
      "ipa": "x"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE XA",
      "ipa": "xa"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE XU",
      "ipa": "xu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE XI",
      "ipa": "xi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE XE",
      "ipa": "xe"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE XO",
      "ipa": "xo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE XAA",
      "ipa": "xaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE XUU",
      "ipa": "xuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE XII",
      "ipa": "xiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE XEE",
      "ipa": "xeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE XOO",
      "ipa": "xoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE Y",
      "ipa": "y"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE YA",
      "ipa": "ya"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE YU",
      "ipa": "yu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE YI",
      "ipa": "yi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE YE",
      "ipa": "ye"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE YO",
      "ipa": "yo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE YAA",
      "ipa": "yaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE YUU",
      "ipa": "yuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE YII",
      "ipa": "yiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE YEE",
      "ipa": "yeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE YOO",
      "ipa": "yoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE K",
      "ipa": "k"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE KA",
      "ipa": "ka"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE KU",
      "ipa": "ku"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE KI",
      "ipa": "ki"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE KE",
      "ipa": "ke"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE KO",
      "ipa": "ko"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE KAA",
      "ipa": "kaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE KUU",
      "ipa": "kuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE KII",
      "ipa": "kiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE KEE",
      "ipa": "keː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE KOO",
      "ipa": "koː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE L",
      "ipa": "l"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE LA",
      "ipa": "la"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE LU",
      "ipa": "lu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE LI",
      "ipa": "li"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE LE",
      "ipa": "le"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE LO",
      "ipa": "lo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE LAA",
      "ipa": "laː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE LUU",
      "ipa": "luː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE LII",
      "ipa": "liː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE LEE",
      "ipa": "leː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE LOO",
      "ipa": "loː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE M",
      "ipa": "m"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MA",
      "ipa": "ma"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MU",
      "ipa": "mu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MI",
      "ipa": "mi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ME",
      "ipa": "me"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MO",
      "ipa": "mo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MAA",
      "ipa": "maː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MUU",
      "ipa": "muː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MII",
      "ipa": "miː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MEE",
      "ipa": "meː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MOO",
      "ipa": "moː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE N",
      "ipa": "n"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NA",
      "ipa": "na"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NU",
      "ipa": "nu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NI",
      "ipa": "ni"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NE",
      "ipa": "ne"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NO",
      "ipa": "no"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NAA",
      "ipa": "naː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NUU",
      "ipa": "nuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NII",
      "ipa": "niː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NEE",
      "ipa": "neː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NOO",
      "ipa": "noː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE S",
      "ipa": "s"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SA",
      "ipa": "sa"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SU",
      "ipa": "su"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SI",
      "ipa": "si"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SE",
      "ipa": "se"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SO",
      "ipa": "so"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SAA",
      "ipa": "saː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SUU",
      "ipa": "suː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SII",
      "ipa": "siː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SEE",
      "ipa": "seː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SOO",
      "ipa": "soː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE F",
      "ipa": "f"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FA",
      "ipa": "fa"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FU",
      "ipa": "fu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FI",
      "ipa": "fi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FE",
      "ipa": "fe"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FO",
      "ipa": "fo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FAA",
      "ipa": "faː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FUU",
      "ipa": "fuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FII",
      "ipa": "fiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FEE",
      "ipa": "feː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FOO",
      "ipa": "foː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE Q",
      "ipa": "q"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE QA",
      "ipa": "qa"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE QU",
      "ipa": "qu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE QI",
      "ipa": "qi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE QE",
      "ipa": "qe"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE QO",
      "ipa": "qo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE QAA",
      "ipa": "qaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE QUU",
      "ipa": "quː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE QII",
      "ipa": "qiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE QEE",
      "ipa": "qeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE QOO",
      "ipa": "qoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE R",
      "ipa": "r"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE RA",
      "ipa": "ra"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE RU",
      "ipa": "ru"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE RI",
      "ipa": "ri"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE RE",
      "ipa": "re"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE RO",
      "ipa": "ro"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE RAA",
      "ipa": "raː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE RUU",
      "ipa": "ruː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE RII",
      "ipa": "riː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE REE",
      "ipa": "reː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ROO",
      "ipa": "roː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFI",
      "ipa": "ffi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TA",
      "ipa": "ta"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TU",
      "ipa": "tu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TI",
      "ipa": "ti"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TE",
      "ipa": "te"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TO",
      "ipa": "to"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TAA",
      "ipa": "taː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TUU",
      "ipa": "tuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TII",
      "ipa": "tiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TEE",
      "ipa": "teː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TOO",
      "ipa": "toː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE QQUU",
      "ipa": "qquː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE GA",
      "ipa": "ga"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE GU",
      "ipa": "gu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE GI",
      "ipa": "gi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE GE",
      "ipa": "ge"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE GO",
      "ipa": "go"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE GAA",
      "ipa": "gaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE GUU",
      "ipa": "guː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE GII",
      "ipa": "giː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE GEE",
      "ipa": "geː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE GOO",
      "ipa": "goː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE C",
      "ipa": "c"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CA",
      "ipa": "ca"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CU",
      "ipa": "cu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CI",
      "ipa": "ci"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CE",
      "ipa": "ce"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CO",
      "ipa": "co"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CAA",
      "ipa": "caː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CUU",
      "ipa": "cuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CII",
      "ipa": "ciː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CEE",
      "ipa": "ceː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE COO",
      "ipa": "coː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE GGI",
      "ipa": "ggi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE PA",
      "ipa": "pa"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE PU",
      "ipa": "pu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE PI",
      "ipa": "pi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE PE",
      "ipa": "pe"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE PO",
      "ipa": "po"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE PAA",
      "ipa": "paː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE PUU",
      "ipa": "puː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE PII",
      "ipa": "piː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE PEE",
      "ipa": "peː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE POO",
      "ipa": "poː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCUU",
      "ipa": "ccuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE VA",
      "ipa": "va"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE VU",
      "ipa": "vu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE VI",
      "ipa": "vi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE VE",
      "ipa": "ve"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE VO",
      "ipa": "vo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE VAA",
      "ipa": "vaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE VUU",
      "ipa": "vuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE VII",
      "ipa": "viː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE VEE",
      "ipa": "veː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE VOO",
      "ipa": "voː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BB",
      "ipa": "bb"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BBA",
      "ipa": "bba"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BBU",
      "ipa": "bbu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BBI",
      "ipa": "bbi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BBE",
      "ipa": "bbe"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BBO",
      "ipa": "bbo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BBAA",
      "ipa": "bbaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BBUU",
      "ipa": "bbuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BBII",
      "ipa": "bbiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BBEE",
      "ipa": "bbeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BBOO",
      "ipa": "bboː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE JJ",
      "ipa": "jj"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE JJA",
      "ipa": "jja"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE JJU",
      "ipa": "jju"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE JJI",
      "ipa": "jji"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE JJE",
      "ipa": "jje"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE JJO",
      "ipa": "jjo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE JJAA",
      "ipa": "jjaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE JJUU",
      "ipa": "jjuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE JJII",
      "ipa": "jjiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE JJEE",
      "ipa": "jjeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE JJOO",
      "ipa": "jjoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE DD",
      "ipa": "dd"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE DDA",
      "ipa": "dda"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE DDU",
      "ipa": "ddu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE DDI",
      "ipa": "ddi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE DDE",
      "ipa": "dde"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE DDO",
      "ipa": "ddo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE DDAA",
      "ipa": "ddaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE DDUU",
      "ipa": "dduː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE DDII",
      "ipa": "ddiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE DDEE",
      "ipa": "ddeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE DDOO",
      "ipa": "ddoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE HH",
      "ipa": "hh"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE HHA",
      "ipa": "hha"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE HHU",
      "ipa": "hhu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE HHI",
      "ipa": "hhi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE HHE",
      "ipa": "hhe"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE HHO",
      "ipa": "hho"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE HHAA",
      "ipa": "hhaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE HHUU",
      "ipa": "hhuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE HHII",
      "ipa": "hhiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE HHEE",
      "ipa": "hheː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE HHOO",
      "ipa": "hhoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE WW",
      "ipa": "ww"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE WWA",
      "ipa": "wwa"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE WWU",
      "ipa": "wwu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE WWI",
      "ipa": "wwi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE WWE",
      "ipa": "wwe"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE WWO",
      "ipa": "wwo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE WWAA",
      "ipa": "wwaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE WWUU",
      "ipa": "wwuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE WWII",
      "ipa": "wwiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE WWEE",
      "ipa": "wweː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE WWOO",
      "ipa": "wwoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ZZ",
      "ipa": "zz"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ZZA",
      "ipa": "zza"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ZZU",
      "ipa": "zzu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ZZI",
      "ipa": "zzi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ZZE",
      "ipa": "zze"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ZZO",
      "ipa": "zzo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ZZAA",
      "ipa": "zzaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ZZUU",
      "ipa": "zzuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ZZII",
      "ipa": "zziː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ZZEE",
      "ipa": "zzeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE ZZOO",
      "ipa": "zzoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE XX",
      "ipa": "xx"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE XXA",
      "ipa": "xxa"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE XXU",
      "ipa": "xxu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE XXI",
      "ipa": "xxi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE XXE",
      "ipa": "xxe"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE XXO",
      "ipa": "xxo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE XXAA",
      "ipa": "xxaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE XXUU",
      "ipa": "xxuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE XXII",
      "ipa": "xxiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE XXEE",
      "ipa": "xxeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE XXOO",
      "ipa": "xxoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE YY",
      "ipa": "yy"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE YYA",
      "ipa": "yya"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE YYU",
      "ipa": "yyu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE YYI",
      "ipa": "yyi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE YYE",
      "ipa": "yye"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE YYO",
      "ipa": "yyo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE YYAA",
      "ipa": "yyaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE YYUU",
      "ipa": "yyuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE YYII",
      "ipa": "yyiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE YYEE",
      "ipa": "yyeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE YYOO",
      "ipa": "yyoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE KK",
      "ipa": "kk"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE KKA",
      "ipa": "kka"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE KKU",
      "ipa": "kku"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE KKI",
      "ipa": "kki"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE KKE",
      "ipa": "kke"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE KKO",
      "ipa": "kko"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE KKAA",
      "ipa": "kkaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE KKUU",
      "ipa": "kkuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE KKII",
      "ipa": "kkiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE KKEE",
      "ipa": "kkeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE KKOO",
      "ipa": "kkoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE LL",
      "ipa": "ll"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE LLA",
      "ipa": "lla"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE LLU",
      "ipa": "llu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE LLI",
      "ipa": "lli"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE LLE",
      "ipa": "lle"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE LLO",
      "ipa": "llo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE LLAA",
      "ipa": "llaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE LLUU",
      "ipa": "lluː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE LLII",
      "ipa": "lliː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE LLEE",
      "ipa": "lleː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE LLOO",
      "ipa": "lloː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MM",
      "ipa": "mm"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MMA",
      "ipa": "mma"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MMU",
      "ipa": "mmu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MMI",
      "ipa": "mmi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MME",
      "ipa": "mme"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MMO",
      "ipa": "mmo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MMAA",
      "ipa": "mmaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MMUU",
      "ipa": "mmuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MMII",
      "ipa": "mmiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MMEE",
      "ipa": "mmeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MMOO",
      "ipa": "mmoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NN",
      "ipa": "nn"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNA",
      "ipa": "nna"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNU",
      "ipa": "nnu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNI",
      "ipa": "nni"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNE",
      "ipa": "nne"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNO",
      "ipa": "nno"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNAA",
      "ipa": "nnaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNUU",
      "ipa": "nnuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNII",
      "ipa": "nniː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNEE",
      "ipa": "nneː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNOO",
      "ipa": "nnoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SS",
      "ipa": "ss"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSA",
      "ipa": "ssa"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSU",
      "ipa": "ssu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSI",
      "ipa": "ssi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSE",
      "ipa": "sse"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSO",
      "ipa": "sso"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSAA",
      "ipa": "ssaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSUU",
      "ipa": "ssuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSII",
      "ipa": "ssiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSEE",
      "ipa": "sseː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSOO",
      "ipa": "ssoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FF",
      "ipa": "ff"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFA",
      "ipa": "ffa"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFU",
      "ipa": "ffu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFE",
      "ipa": "ffe"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFO",
      "ipa": "ffo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFAA",
      "ipa": "ffaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFUU",
      "ipa": "ffuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFII",
      "ipa": "ffiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFEE",
      "ipa": "ffeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFOO",
      "ipa": "ffoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE QQ",
      "ipa": "qq"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE QQA",
      "ipa": "qqa"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE QQU",
      "ipa": "qqu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TT",
      "ipa": "tt"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE QQE",
      "ipa": "qqe"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE QQO",
      "ipa": "qqo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE QQAA",
      "ipa": "qqaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE QQII",
      "ipa": "qqiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE QQEE",
      "ipa": "qqeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE QQOO",
      "ipa": "qqoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE RR",
      "ipa": "rr"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE RRA",
      "ipa": "rra"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE RRU",
      "ipa": "rru"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE RRI",
      "ipa": "rri"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE RRE",
      "ipa": "rre"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE RRO",
      "ipa": "rro"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE RRAA",
      "ipa": "rraː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE GG",
      "ipa": "gg"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE RRII",
      "ipa": "rriː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE RREE",
      "ipa": "rreː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE RROO",
      "ipa": "rroː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TTA",
      "ipa": "tta"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TTU",
      "ipa": "ttu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TTI",
      "ipa": "tti"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TTE",
      "ipa": "tte"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TTO",
      "ipa": "tto"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TTAA",
      "ipa": "ttaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TTUU",
      "ipa": "ttuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TTII",
      "ipa": "ttiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TTEE",
      "ipa": "tteː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TTOO",
      "ipa": "ttoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE GGA",
      "ipa": "gga"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE GGU",
      "ipa": "ggu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE GGE",
      "ipa": "gge"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE GGO",
      "ipa": "ggo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE GGAA",
      "ipa": "ggaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE GGUU",
      "ipa": "gguː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE GGII",
      "ipa": "ggiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE GGEE",
      "ipa": "ggeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE GGOO",
      "ipa": "ggoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CC",
      "ipa": "cc"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCA",
      "ipa": "cca"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCU",
      "ipa": "ccu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE PP",
      "ipa": "pp"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCE",
      "ipa": "cce"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCO",
      "ipa": "cco"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCAA",
      "ipa": "ccaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCII",
      "ipa": "cciː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCEE",
      "ipa": "cceː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCOO",
      "ipa": "ccoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE PPA",
      "ipa": "ppa"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE PPU",
      "ipa": "ppu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE PPI",
      "ipa": "ppi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE PPE",
      "ipa": "ppe"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE PPO",
      "ipa": "ppo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE PPAA",
      "ipa": "ppaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE VV",
      "ipa": "vv"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE PPII",
      "ipa": "ppiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE PPEE",
      "ipa": "ppeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE PPOO",
      "ipa": "ppoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE VVA",
      "ipa": "vva"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE VVU",
      "ipa": "vvu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE VVI",
      "ipa": "vvi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE VVE",
      "ipa": "vve"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE VVO",
      "ipa": "vvo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE VVAA",
      "ipa": "vvaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE VVUU",
      "ipa": "vvuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE VVII",
      "ipa": "vviː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE VVEE",
      "ipa": "vveː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE VVOO",
      "ipa": "vvoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CH",
      "ipa": "ch"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CHA",
      "ipa": "cha"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CHU",
      "ipa": "chu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CHI",
      "ipa": "chi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CHE",
      "ipa": "che"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CHO",
      "ipa": "cho"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CHAA",
      "ipa": "chaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CHUU",
      "ipa": "chuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CHII",
      "ipa": "chiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CHEE",
      "ipa": "cheː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CHOO",
      "ipa": "choː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SH",
      "ipa": "sh"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SHA",
      "ipa": "sha"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SHU",
      "ipa": "shu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SHI",
      "ipa": "shi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SHE",
      "ipa": "she"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SHO",
      "ipa": "sho"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SHAA",
      "ipa": "shaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SHUU",
      "ipa": "shuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SHII",
      "ipa": "shiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SHEE",
      "ipa": "sheː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SHOO",
      "ipa": "shoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NY",
      "ipa": "ny"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NYA",
      "ipa": "nya"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NYU",
      "ipa": "nyu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NYI",
      "ipa": "nyi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NYE",
      "ipa": "nye"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NYO",
      "ipa": "nyo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NYAA",
      "ipa": "nyaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NYUU",
      "ipa": "nyuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NYII",
      "ipa": "nyiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NYEE",
      "ipa": "nyeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NYOO",
      "ipa": "nyoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FH",
      "ipa": "fh"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FHA",
      "ipa": "fha"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FHU",
      "ipa": "fhu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FHI",
      "ipa": "fhi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FHE",
      "ipa": "fhe"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FHO",
      "ipa": "fho"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FHAA",
      "ipa": "fhaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FHUU",
      "ipa": "fhuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FHII",
      "ipa": "fhiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FHEE",
      "ipa": "fheː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FHOO",
      "ipa": "fhoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCH",
      "ipa": "cch"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCHA",
      "ipa": "ccha"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCHU",
      "ipa": "cchu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCHI",
      "ipa": "cchi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCHE",
      "ipa": "cche"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCHO",
      "ipa": "ccho"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCHAA",
      "ipa": "cchaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCHUU",
      "ipa": "cchuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCHII",
      "ipa": "cchiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCHEE",
      "ipa": "ccheː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCHOO",
      "ipa": "cchoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSH",
      "ipa": "ssh"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSHA",
      "ipa": "ssha"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSHU",
      "ipa": "sshu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSHI",
      "ipa": "sshi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSHE",
      "ipa": "sshe"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSHO",
      "ipa": "ssho"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSHAA",
      "ipa": "sshaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSHUU",
      "ipa": "sshuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSHII",
      "ipa": "sshiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSHEE",
      "ipa": "ssheː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSHOO",
      "ipa": "sshoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNY",
      "ipa": "nny"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNYA",
      "ipa": "nnya"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNYU",
      "ipa": "nnyu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNYI",
      "ipa": "nnyi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNYE",
      "ipa": "nnye"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNYO",
      "ipa": "nnyo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNYAA",
      "ipa": "nnyaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNYUU",
      "ipa": "nnyuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNYII",
      "ipa": "nnyiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNYEE",
      "ipa": "nnyeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNYOO",
      "ipa": "nnyoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFH",
      "ipa": "ffh"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFHA",
      "ipa": "ffha"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFHU",
      "ipa": "ffhu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFHI",
      "ipa": "ffhi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFHE",
      "ipa": "ffhe"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFHO",
      "ipa": "ffho"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFHAA",
      "ipa": "ffhaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFHUU",
      "ipa": "ffhuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFHII",
      "ipa": "ffhiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFHEE",
      "ipa": "ffheː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFHOO",
      "ipa": "ffhoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BY",
      "ipa": "by"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BYA",
      "ipa": "bya"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BYU",
      "ipa": "byu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BYI",
      "ipa": "byi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BYE",
      "ipa": "bye"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BYO",
      "ipa": "byo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BYAA",
      "ipa": "byaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BYUU",
      "ipa": "byuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BYII",
      "ipa": "byiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BYEE",
      "ipa": "byeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BYOO",
      "ipa": "byoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MY",
      "ipa": "my"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MYA",
      "ipa": "mya"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MYU",
      "ipa": "myu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MYI",
      "ipa": "myi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MYE",
      "ipa": "mye"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MYO",
      "ipa": "myo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MYAA",
      "ipa": "myaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MYUU",
      "ipa": "myuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MYII",
      "ipa": "myiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MYEE",
      "ipa": "myeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MYOO",
      "ipa": "myoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BBY",
      "ipa": "bby"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BBYA",
      "ipa": "bbya"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BBYU",
      "ipa": "bbyu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BBYI",
      "ipa": "bbyi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BBYE",
      "ipa": "bbye"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BBYO",
      "ipa": "bbyo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BBYAA",
      "ipa": "bbyaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BBYUU",
      "ipa": "bbyuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BBYII",
      "ipa": "bbyiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BBYEE",
      "ipa": "bbyeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE BBYOO",
      "ipa": "bbyoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MMY",
      "ipa": "mmy"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MMYA",
      "ipa": "mmya"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MMYU",
      "ipa": "mmyu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MMYI",
      "ipa": "mmyi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MMYE",
      "ipa": "mmye"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MMYO",
      "ipa": "mmyo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MMYAA",
      "ipa": "mmyaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MMYUU",
      "ipa": "mmyuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MMYII",
      "ipa": "mmyiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MMYEE",
      "ipa": "mmyeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE MMYOO",
      "ipa": "mmyoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CX",
      "ipa": "cx"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE A",
      "ipa": "ʕa"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE U",
      "ipa": "ʕu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE I",
      "ipa": "ʕi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE E",
      "ipa": "ʕe"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE O",
      "ipa": "ʕo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE AA",
      "ipa": "ʕaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE UU",
      "ipa": "ʕuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE II",
      "ipa": "ʕiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE EE",
      "ipa": "ʕeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE OO",
      "ipa": "ʕoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SX",
      "ipa": "sx"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE Ax",
      "ipa": "ʕˤa"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE Ux",
      "ipa": "ʕˤu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE Ix",
      "ipa": "ʕˤi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE Ex",
      "ipa": "ʕˤe"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE Ox",
      "ipa": "ʕˤo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE AAx",
      "ipa": "ʕˤaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE UUx",
      "ipa": "ʕˤuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE IIx",
      "ipa": "ʕˤiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE EEx",
      "ipa": "ʕˤeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE OOx",
      "ipa": "ʕˤoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NX",
      "ipa": "nx"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NXA",
      "ipa": "nxa"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NXU",
      "ipa": "nxu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NXI",
      "ipa": "nxi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NXE",
      "ipa": "nxe"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NXO",
      "ipa": "nxo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NXAA",
      "ipa": "nxaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NXUU",
      "ipa": "nxuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NXII",
      "ipa": "nxiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NXEE",
      "ipa": "nxeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NXOO",
      "ipa": "nxoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FX",
      "ipa": "fx"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FXA",
      "ipa": "fxa"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FXU",
      "ipa": "fxu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FXI",
      "ipa": "fxi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FXE",
      "ipa": "fxe"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FXO",
      "ipa": "fxo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FXAA",
      "ipa": "fxaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FXUU",
      "ipa": "fxuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FXII",
      "ipa": "fxiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FXEE",
      "ipa": "fxeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FXOO",
      "ipa": "fxoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCX",
      "ipa": "ccx"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCXA",
      "ipa": "ccxa"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCXU",
      "ipa": "ccxu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCXI",
      "ipa": "ccxi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCXE",
      "ipa": "ccxe"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCXO",
      "ipa": "ccxo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCXAA",
      "ipa": "ccxaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCXUU",
      "ipa": "ccxuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCXII",
      "ipa": "ccxiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCXEE",
      "ipa": "ccxeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE CCXOO",
      "ipa": "ccxoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSX",
      "ipa": "ssx"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSXA",
      "ipa": "ssxa"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSXU",
      "ipa": "ssxu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSXI",
      "ipa": "ssxi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSXE",
      "ipa": "ssxe"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSXO",
      "ipa": "ssxo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSXAA",
      "ipa": "ssxaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSXUU",
      "ipa": "ssxuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSXII",
      "ipa": "ssxiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSXEE",
      "ipa": "ssxeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE SSXOO",
      "ipa": "ssxoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNX",
      "ipa": "nnx"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNXA",
      "ipa": "nnxa"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNXU",
      "ipa": "nnxu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNXI",
      "ipa": "nnxi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNXE",
      "ipa": "nnxe"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNXO",
      "ipa": "nnxo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNXAA",
      "ipa": "nnxaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNXUU",
      "ipa": "nnxuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNXII",
      "ipa": "nnxiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNXEE",
      "ipa": "nnxeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE NNXOO",
      "ipa": "nnxoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFX",
      "ipa": "ffx"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFXA",
      "ipa": "ffxa"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFXU",
      "ipa": "ffxu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFXI",
      "ipa": "ffxi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFXE",
      "ipa": "ffxe"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFXO",
      "ipa": "ffxo"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFXAA",
      "ipa": "ffxaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFXUU",
      "ipa": "ffxuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFXII",
      "ipa": "ffxiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFXEE",
      "ipa": "ffxeː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE FFXOO",
      "ipa": "ffxoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TS",
      "ipa": "ts"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TSA",
      "ipa": "tsa"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TSU",
      "ipa": "tsu"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TSI",
      "ipa": "tsi"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TSE",
      "ipa": "tse"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TSO",
      "ipa": "tso"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TSAA",
      "ipa": "tsaː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TSUU",
      "ipa": "tsuː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TSII",
      "ipa": "tsiː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TSEE",
      "ipa": "tseː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TSOO",
      "ipa": "tsoː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE TSS",
      "ipa": "tss"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO DIGIT ZERO",
      "ipa": "0"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO DIGIT ONE",
      "ipa": "1"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO DIGIT TWO",
      "ipa": "2"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO DIGIT THREE",
      "ipa": "3"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO DIGIT FOUR",
      "ipa": "4"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO DIGIT FIVE",
      "ipa": "5"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO DIGIT SIX",
      "ipa": "6"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO DIGIT SEVEN",
      "ipa": "7"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO DIGIT EIGHT",
      "ipa": "8"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO DIGIT NINE",
      "ipa": "9"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE A",
      "ipa": "a"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE U",
      "ipa": "u"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE I",
      "ipa": "i"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE E",
      "ipa": "e"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE O",
      "ipa": "o"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE AA",
      "ipa": "aː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE UU",
      "ipa": "uː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE II",
      "ipa": "iː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE EE",
      "ipa": "eː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE OO",
      "ipa": "oː"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE AX",
      "ipa": "aˤ"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE UX",
      "ipa": "uˤ"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE IX",
      "ipa": "iˤ"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE EX",
      "ipa": "eˤ"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE OX",
      "ipa": "oˤ"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE AAX",
      "ipa": "aːˤ"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE UUX",
      "ipa": "uːˤ"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE IIX",
      "ipa": "iːˤ"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE EEX",
      "ipa": "eːˤ"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO SYLLABLE OOX",
      "ipa": "oːˤ"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO WORD SEPARATOR",
      "ipa": "·"
    },
    "": {
      "name": "SHEEK BAKRII SAPHALOO FULL STOP",
      "ipa": "."
    }
  }
};

/* ---- Remap PUA codepoints to the font's actual codepoints ---- */
/* The mapping data uses PUA U+E000-E323, but the embedded font
   places glyphs at U+1C800-1CB2B.  Fix at load time. */
(function remapToFont() {
  function remap(cp) {
    if (cp >= 0xE001 && cp <= 0xE317) return cp + 0xE800;
    if (cp >= 0xE318 && cp <= 0xE323) return cp + 0xE808;
    return cp;
  }
  // Rebuild QUBEE_TO_SBS with corrected characters
  const oldQ = MAPS.QUBEE_TO_SBS;
  const newQ = {};
  for (const key in oldQ) {
    const oldCh = oldQ[key];
    const newCh = String.fromCodePoint(remap(oldCh.codePointAt(0)));
    newQ[key] = newCh;
  }
  MAPS.QUBEE_TO_SBS = newQ;
  // Rebuild SBS_TO_QUBEE and SBS_META with corrected keys
  const newS = {}, newM = {};
  for (const oldCh in MAPS.SBS_TO_QUBEE) {
    const newCh = String.fromCodePoint(remap(oldCh.codePointAt(0)));
    newS[newCh] = MAPS.SBS_TO_QUBEE[oldCh];
  }
  for (const oldCh in MAPS.SBS_META) {
    const newCh = String.fromCodePoint(remap(oldCh.codePointAt(0)));
    newM[newCh] = MAPS.SBS_META[oldCh];
  }
  MAPS.SBS_TO_QUBEE = newS;
  MAPS.SBS_META = newM;
})();

/* ---- Status bar helper ---- */
function setStatus(type, msg) {
  const bar = document.getElementById('statusBar');
  if (!bar) return;
  bar.className = 'status-bar ' + type;
  bar.textContent = msg;
}

/* ===========================================================
   Core transliteration functions
   =========================================================== */

/**
 * normaliseLatin – lowercase, collapse whitespace,
 * normalise middle-dot (U+00B7) to internal separator.
 */
function normaliseLatin(str) {
  return str
    .replace(/\u00B7/g, '\u00B7')   // keep middle-dot as-is
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * latinToSbs – longest-match tokeniser.
 * Tries tokens of length 4, 3, 2, 1 in that order.
 * Unmatched characters are copied verbatim.
 */
function latinToSbs(src) {
  if (!MAPS) return src;
  const txt = normaliseLatin(src);
  let out = '';
  let i = 0;
  const MAX = 4;                       // longest token (e.g. "bbaa")
  while (i < txt.length) {
    let matched = false;
    for (let len = Math.min(MAX, txt.length - i); len > 0; len--) {
      const chunk = txt.substr(i, len);
      if (chunk in MAPS.QUBEE_TO_SBS) {
        out += MAPS.QUBEE_TO_SBS[chunk];
        i += len;
        matched = true;
        break;
      }
    }
    if (!matched) {
      out += txt[i];
      i++;
    }
  }
  return out;
}

/**
 * sbsToLatin – one-character reverse lookup.
 */
function sbsToLatin(src) {
  if (!MAPS) return src;
  let out = '';
  for (const ch of src) {
    out += MAPS.SBS_TO_QUBEE[ch] ?? ch;
  }
  return out;
}

/* ===========================================================
   Validation
   =========================================================== */

/**
 * validateSbs – returns an array of {char, pos, cp, valid, meta}.
 */
function validateSbs(txt) {
  if (!MAPS) return [];
  const rows = [];
  let pos = 0;
  for (const ch of txt) {
    const cp = ch.codePointAt(0);
    const hex = cp.toString(16).toUpperCase().padStart(4, '0');
    const meta = MAPS.SBS_META[ch];
    rows.push({
      char: ch,
      pos: pos++,
      cp: `U+${hex}`,
      valid: !!meta,
      name: meta ? meta.name : 'UNKNOWN CHARACTER',
      ipa: meta ? meta.ipa : ''
    });
  }
  return rows;
}

/**
 * showValidationReport – renders the validation results into #infoBox.
 */
function showValidationReport(txt) {
  const box = document.getElementById('infoBox');
  if (!txt || !txt.trim()) {
    box.innerHTML = '<em>Nothing to validate.</em>';
    return;
  }
  const rows = validateSbs(txt);
  let html = '';
  let validCount = 0;
  let invalidCount = 0;

  rows.forEach(r => {
    if (r.valid) {
      validCount++;
      html += `<div class="info-line valid"><span class="code">${r.cp}</span> – ${r.name}${r.ipa ? ' <em>(' + r.ipa + ')</em>' : ''}</div>`;
    } else {
      invalidCount++;
      html += `<div class="info-line invalid"><span class="code">${r.cp}</span> – <strong>${r.name}</strong> <em>(not in official SBS repertoire)</em></div>`;
    }
  });

  const summary = `<div class="info-line" style="font-weight:bold;border-top:2px solid #ccc;padding-top:6px;margin-top:4px;">` +
    `${validCount} valid / ${invalidCount} invalid / ${rows.length} total characters</div>`;

  box.innerHTML = summary + html;
}

/* ===========================================================
   UI wiring
   =========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const srcTa    = document.getElementById('src');
  const dstTa    = document.getElementById('dst');
  const goBtn    = document.getElementById('goBtn');
  const valBtn   = document.getElementById('valBtn');
  const clearBtn = document.getElementById('clearBtn');

  /**
   * transliterate – auto-detects direction from the first character.
   * SBS characters live in the Private Use Area (U+E000–U+E31F).
   */
  function transliterate() {
    if (!MAPS) {
      setStatus('error', 'Mapping data not loaded yet – please wait.');
      return;
    }
    const src = srcTa.value;
    if (!src.trim()) {
      dstTa.value = '';
      setStatus('error', 'Source text is empty.');
      return;
    }
    const cp = src.trim().codePointAt(0) || 0;
    const isSbs = (cp >= 0xE000 && cp <= 0xF8FF) || (cp >= 0x1C800 && cp <= 0x1CB2B);
    const out = isSbs ? sbsToLatin(src) : latinToSbs(src);
    dstTa.value = out;
    const dir = isSbs ? 'SBS → Latin' : 'Latin → SBS';
    setStatus('ok', `Transliterated (${dir}) – ${src.length} source chars → ${out.length} result chars.`);
  }

  function validate() {
    showValidationReport(dstTa.value);
  }

  function clearAll() {
    srcTa.value = '';
    dstTa.value = '';
    document.getElementById('infoBox').innerHTML = '';
    setStatus('', '');
  }

  goBtn.addEventListener('click', transliterate);
  valBtn.addEventListener('click', validate);
  clearBtn.addEventListener('click', clearAll);

  /* Ctrl+Enter shortcut */
  srcTa.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      transliterate();
    }
  });
});
