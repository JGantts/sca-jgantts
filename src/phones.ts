import type { 
  PhoneType,
  Phone,
  Language,
  Phoneme,
  LanguageData,
} from "./commonTypes"

let phoneTypesPrivate: PhoneType[] = [
  {
    id: "QGDYAEYMDEZDMMPOBXRTCUDHYYPYFBPF",
    desc: "vowel",
    type: "Vowel",
    features: [
      {
        id: "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC",
        desc: "height",
        type: {
          values: [
            {
              id: "BFEXVLSDEZENWZKHHCJLAOGSLFOTKHSJ",
              desc: "open",
            },
            {
              id: "ITXNMDIJIXIOXVFYPAETYXLLPLGINNXG",
              desc: "near-open",
            },
            {
              id: "YWQMANONVLHZAZFHSYQHHDFXCFWAJFWV",
              desc: "open-mid",
            },
            {
              id: "CUCHRTPAZJQDGBZJRHCELPPYIXLCTTKB",
              desc: "mid",
            },
            {
              id: "LEOXQKQBEINZXHVKNQABHIJVYRBSEOJJ",
              desc: "close-mid",
            },
            {
              id: "KONWQVVVUWWOUHVMDAADQWRIWMQKZTMP",
              desc: "near-close",
            },
            {
              id: "UGDNUKMWNLUNIGAUZJKMUALBDPWTKBJI",
              desc: "close",
            }
          ]
        },
      },
      {
        id: "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ",
        desc: "backness",
        type: {
            values: [
              {
                id: "NWAIGDSPCAAFGOGYLFPGWWVKBREZPWBD",
                desc: "front",
              },
              {
                id: "YEWERSFOMXLUOLOBMATLTTQKUATLZTZI",
                desc: "central",
              },
              {
                id: "TNTXXUTXNIJQEJCVBNRAJSDBJCHXVCJN",
                desc: "back",
              },
          ]
        }
      },
      {
        id: "CTKXTKTLAUXLERTJKSEVLBTSFVYUXSUP",
        desc: "roundness",
        type: {
          values: [
            {
              id: "NRPMAAJKFSTQCLHHXLWSWKNVSQATESYT", //unrounded
              desc: "unrounded",
            },
            {
              id: "YVGQZGLHLVPYJOEQZAYZZFNPGBBNHIVG", //rounded
              desc: "rounded",
            },
          ]
        }
      },
      /*{
        id: "CPZUOQHMIJEUFICZUNGDNWESBMBNUIID",
        desc: "stress",
        type: {
          values: [
            {
              id: "NWLMMJEUFUSGDROAYXKEMWWFVCXOBONZ", //unstressed
              desc: "unstressed",
            },
            {
              id: "NBNPQDJOBJZDQBLVOZQPTIOCCFXTZJKP", //stressed
              desc: "stressed",
            },
          ]
        }
      },*/
    ],
  },
  {
    id: "JMHNZPRXUPBIYCCPAEHZGLHIZGVNYPXR",
    desc: "consonant",
    type: "Consonant",
    features: [
      {
        id: "YUUNFSLQUZZVJGKXNYSNCKZHIPURKVVT",
        desc: "place",
        type: {
          values: [
            {
              id: "ZXYFPKHUIGDWXVUPMVVFXMROSBKFKHZR", //bilabilal
              desc: "bilabilal",
            },
            {
              id: "APINNIFZCAKTUWTDYVZUSNFBMDAYYPSG", //labio­dental
              desc: "labiodental",
            },
            {
              id: "WPYQRFRZZATALISKLYVWSBZGBOLULSML", //linguo­labial
              desc: "linguolabial",
            },
            {
              id: "BXNFTBKXZVSWGWMXLFXNZSSVXNKNJSGB",
              desc: "dental",
            },
            {
              id: "ZBKMZTESQRTSRXPZMNHQCDUVYEWNBUQL",
              desc: "alveolar",
            },
            {
              id: "QQPEJMVYETQWAMDRFLFVYJETUUQQMUVH",
              desc: "postalveolar",
            },
            {
              id: "DLBLEDTMBQMFFTNJJVMJNZDBDGBJDEHK",
              desc: "retroflex",
            },
            {
              id: "ZCXOAFYEWIOKFMMCORBSEQUFJFNYQRSH",
              desc: "palatal",
            },
            {
              id: "YHHQNKELEXGKPVQXGBVWYXFHVLKFRPMY",
              desc: "velar",
            },
            {
              id: "OFHIVUCPJCWBQSHZVLTEWIPGXDUOMNAZ",
              desc: "uvular",
            },
            {
              id: "WBZVYCLCEJOKZMQOKGWQFBHAFJDTYRSW",
              desc: "pharyngeal/epiglottal",
            },
            {
              id: "KPQROYYZCDMACXZEXGZYBOCBHSAJJRHI",
              desc: "glottal",
            },
          ]
        }
      },
      {
        id: "KPAZCPLBROAZKNOSUGMXSRMUGQPUVVPA",
        desc: "manner",
        type: {
          values: [
            {
              id: "PQPWUKRVGOBQMKWLFTJZCFTJGPASBHSA", //nasal
              desc: "nasal"
            },
            {
              id: "VNGWOVCSMCUZGMYDOQHCQPJTMZPQCIRI", //plosive
              desc: "plosive"
            },
            {
              id: "PFUKOICTDXSMPOTJXMIYGTUCZMEXAZRL", //silibant affricate
              desc: "silibant affricate"
            },
            {
              id: "NSDHPOWAXKBKRYYFPAXCWZKLFPNQJFPE", //non-silibant affricate
              desc: "non-silibant affricate"
            },
            {
              id: "GXIKPDFDIMJJOUEEFTWHNAAZZTZYVZIE", //silibant fricative
              desc: "silibant fricative"
            },
            {
              id: "RUPOAGMZWDHRHKSSVJFIYYMYSTIHWWTF", //non-silibant fricative
              desc: "non-silibant fricative"
            },
            {
              id: "GMKLRZGQUBPDOIBLTJPXPVVWESTJOZZE", //approximant
              desc: "approximant"
            },
            {
              id: "CQDZRXJZOQOKNUIHALDMHHIIVAGWLBRX", //tap
              desc: "tap"
            },
            {
              id: "VAZDUHUYJIBAFATHZTVIOOVJINSRKDSP", //trill
              desc: "trill"
            },
            {
              id: "IMHJWSHYQPDOKDDBLHEVCPIUWYBALEAQ", //Lateral affricative
              desc: "lateral affricative"
            },
            {
              id: "FXMGJZEKIXQMIRCVLPZVBELXNSBHVBXY", //Lateral fricative
              desc: "lateral fricative"
            },
            {
              id: "VVYLUMZXQPWSIFYVREPMJAQPXKPYHFCR", //Lateral approximant
              desc: "lateral approximant"
            },
            {
              id: "EMMLESLTRVOYOKLACZJFVYRJTYEWZRFY", //Lateral tap
              desc: "lateral tap"
            },
          ]
        }
      },
      {
        id: "CHRJYONQPXKFWAQDENLLHHWYKHJQZFVD",
        desc: "voicedness",
        type: {
          values: [
            {
              id: "IFKUDEPWTBULJGCZIYGWDYITMLUEQMVD", //unvoiced
              desc: "unvoiced",
            },
            {
              id: "OFOMPHTROPHZFTWTXDDDUDRKKQDPYWPU", //voiced
              desc: "voiced",
            },
          ]
        }
      },
    ],
  }
]

let languages: Language[] = [
  {
    id: "ODEOJAEMMEFZSIOWFABSUOBHUIGSOKEH",
    desc: "Proto",
    /*stops: {
      "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC": {
        0.1428: {
          id: "BFEXVLSDEZENWZKHHCJLAOGSLFOTKHSJ",
          desc: "open",
        },
        0.2857: {
          id: "ITXNMDIJIXIOXVFYPAETYXLLPLGINNXG",
          desc: "near-open",
        },
        0.4286: {
          id: "YWQMANONVLHZAZFHSYQHHDFXCFWAJFWV",
          desc: "open-mid",
        },
        0.5714: {
          id: "CUCHRTPAZJQDGBZJRHCELPPYIXLCTTKB",
          desc: "mid",
        },
        0.7143: {
          id: "LEOXQKQBEINZXHVKNQABHIJVYRBSEOJJ",
          desc: "close-mid",
        },
        0.8571: {
          id: "KONWQVVVUWWOUHVMDAADQWRIWMQKZTMP",
          desc: "cear-close",
        },
        1.0: {
          id: "UGDNUKMWNLUNIGAUZJKMUALBDPWTKBJI",
          desc: "close",
        }
      },
      "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ": {

      },
      "CTKXTKTLAUXLERTJKSEVLBTSFVYUXSUP": {
        "NRPMAAJKFSTQCLHHXLWSWKNVSQATESYT": {
          id: "NRPMAAJKFSTQCLHHXLWSWKNVSQATESYT",
          desc: "unrounded",
        },
        "YVGQZGLHLVPYJOEQZAYZZFNPGBBNHIVG": {
          id: "YVGQZGLHLVPYJOEQZAYZZFNPGBBNHIVG",
          desc: "rounded",
        },
      },
    },*/
    grid: [
      {
        typeID: "QGDYAEYMDEZDMMPOBXRTCUDHYYPYFBPF",
        id: "DDQDFQREJUTNLIPBMGAOCGLYUYMGOVJG",
        IPA: "i",
        desc: null,
        syllabic: "Syllabic",
        featureStops: [
          {kind: "FeatureStop", categoryID: "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC", id: "UGDNUKMWNLUNIGAUZJKMUALBDPWTKBJI"}, //height: close
          {kind: "FeatureStop", categoryID: "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ", id: "NWAIGDSPCAAFGOGYLFPGWWVKBREZPWBD"}, //backness: front
          {kind: "FeatureStop", categoryID: "CTKXTKTLAUXLERTJKSEVLBTSFVYUXSUP", id: "NRPMAAJKFSTQCLHHXLWSWKNVSQATESYT"},
        ]
      },
      {
        typeID: "QGDYAEYMDEZDMMPOBXRTCUDHYYPYFBPF",
        id: "USKYXZGEZNUVYDZVIKAMTVRHSZVKRXNZ",
        IPA: "y",
        desc: null,
        syllabic: "Syllabic",
        featureStops: [
          {kind: "FeatureStop", categoryID: "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC", id: "UGDNUKMWNLUNIGAUZJKMUALBDPWTKBJI"}, //height: close
          {kind: "FeatureStop", categoryID: "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ", id: "NWAIGDSPCAAFGOGYLFPGWWVKBREZPWBD"}, //backness: front
          {kind: "FeatureStop", categoryID: "CTKXTKTLAUXLERTJKSEVLBTSFVYUXSUP", id: "YVGQZGLHLVPYJOEQZAYZZFNPGBBNHIVG"},
        ]
      },
      {
        typeID: "QGDYAEYMDEZDMMPOBXRTCUDHYYPYFBPF",
        id: "UCROONCOOOISUEIRBLCCKDHIGXWJGIDB",
        IPA: "ɨ",
        desc: null,
        syllabic: "Syllabic",
        featureStops: [
          {kind: "FeatureStop", categoryID: "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC", id: "UGDNUKMWNLUNIGAUZJKMUALBDPWTKBJI"}, //height: close
          {kind: "FeatureStop", categoryID: "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ", id: "YEWERSFOMXLUOLOBMATLTTQKUATLZTZI"}, //backness: central
          {kind: "FeatureStop", categoryID: "CTKXTKTLAUXLERTJKSEVLBTSFVYUXSUP", id: "NRPMAAJKFSTQCLHHXLWSWKNVSQATESYT"},
        ]
      },
      {
        typeID: "QGDYAEYMDEZDMMPOBXRTCUDHYYPYFBPF",
        id: "LFZFWOZLVRJNWZBMJPLDFFMNEVTYIDUU",
        IPA: "ʉ",
        desc: null,
        syllabic: "Syllabic",
        featureStops: [
          {kind: "FeatureStop", categoryID: "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC", id: "UGDNUKMWNLUNIGAUZJKMUALBDPWTKBJI"}, //height: close
          {kind: "FeatureStop", categoryID: "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ", id: "YEWERSFOMXLUOLOBMATLTTQKUATLZTZI"}, //backness: central
          {kind: "FeatureStop", categoryID: "CTKXTKTLAUXLERTJKSEVLBTSFVYUXSUP", id: "YVGQZGLHLVPYJOEQZAYZZFNPGBBNHIVG"},
        ]
      },
      {
        typeID: "QGDYAEYMDEZDMMPOBXRTCUDHYYPYFBPF",
        id: "AZXDMONRTVBBRCLDXEFVYDAIEJAOQTYQ",
        IPA: '\u{026f}', //ɯ
        desc: null,
        syllabic: "Syllabic",
        featureStops: [
          {kind: "FeatureStop", categoryID: "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC", id: "UGDNUKMWNLUNIGAUZJKMUALBDPWTKBJI"}, //height: close
          {kind: "FeatureStop", categoryID: "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ", id: "TNTXXUTXNIJQEJCVBNRAJSDBJCHXVCJN"}, //backness: back
          {kind: "FeatureStop", categoryID: "CTKXTKTLAUXLERTJKSEVLBTSFVYUXSUP", id: "NRPMAAJKFSTQCLHHXLWSWKNVSQATESYT"},
        ]
      },
      {
        typeID: "QGDYAEYMDEZDMMPOBXRTCUDHYYPYFBPF",
        id: "VQWKWCBRGBOAFHSRCRIBGWPDMQPBYIAW",
        IPA: "u",
        desc: null,
        syllabic: "Syllabic",
        featureStops: [
          {kind: "FeatureStop", categoryID: "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC", id: "UGDNUKMWNLUNIGAUZJKMUALBDPWTKBJI"}, //height: close
          {kind: "FeatureStop", categoryID: "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ", id: "TNTXXUTXNIJQEJCVBNRAJSDBJCHXVCJN"}, //backness: back
          {kind: "FeatureStop", categoryID: "CTKXTKTLAUXLERTJKSEVLBTSFVYUXSUP", id: "YVGQZGLHLVPYJOEQZAYZZFNPGBBNHIVG"},
        ]
      },

      {
        typeID: "QGDYAEYMDEZDMMPOBXRTCUDHYYPYFBPF",
        id: "YCLZGBAVXKMQNDRKIPDZWQDDEBVNFYGX",
        IPA: "a",
        desc: null,
        syllabic: "Syllabic",
        featureStops: [
          {kind: "FeatureStop", categoryID: "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC", id: "BFEXVLSDEZENWZKHHCJLAOGSLFOTKHSJ"}, //height: open
          {kind: "FeatureStop", categoryID: "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ", id: "NWAIGDSPCAAFGOGYLFPGWWVKBREZPWBD"}, //backness: front
          {kind: "FeatureStop", categoryID: "CTKXTKTLAUXLERTJKSEVLBTSFVYUXSUP", id: "NRPMAAJKFSTQCLHHXLWSWKNVSQATESYT"}
        ]
      },

      {
        typeID: "JMHNZPRXUPBIYCCPAEHZGLHIZGVNYPXR",
        id: "WTMSEOODZHEDZXFYWLKONUTWKCPSVQGJ",
        IPA: '\u{006D}\u{0325}',  //m̥
        desc: null,
        syllabic: "Nonsyllabic",
        featureStops: [
          {kind: "FeatureStop", categoryID: "YUUNFSLQUZZVJGKXNYSNCKZHIPURKVVT", id: "ZXYFPKHUIGDWXVUPMVVFXMROSBKFKHZR"},
          {kind: "FeatureStop", categoryID: "KPAZCPLBROAZKNOSUGMXSRMUGQPUVVPA", id: "XBYINZTSDFIUTUDDKJYRMTLJJBPARGPZ"},
          {kind: "FeatureStop", categoryID: "CHRJYONQPXKFWAQDENLLHHWYKHJQZFVD", id: "IFKUDEPWTBULJGCZIYGWDYITMLUEQMVD"},
        ]
      },
      {
        typeID: "JMHNZPRXUPBIYCCPAEHZGLHIZGVNYPXR",
        id: "WTMSEOODZHEDZXFYWLKONUTWKCPSVQGJ",
        IPA: "m",
        desc: null,
        syllabic: "Nonsyllabic",
        featureStops: [
          {kind: "FeatureStop", categoryID: "YUUNFSLQUZZVJGKXNYSNCKZHIPURKVVT", id: "ZXYFPKHUIGDWXVUPMVVFXMROSBKFKHZR"},
          {kind: "FeatureStop", categoryID: "KPAZCPLBROAZKNOSUGMXSRMUGQPUVVPA", id: "XBYINZTSDFIUTUDDKJYRMTLJJBPARGPZ"},
          {kind: "FeatureStop", categoryID: "CHRJYONQPXKFWAQDENLLHHWYKHJQZFVD", id: "OFOMPHTROPHZFTWTXDDDUDRKKQDPYWPU"},
        ]
      },
      {
        typeID: "JMHNZPRXUPBIYCCPAEHZGLHIZGVNYPXR",
        id: "WTMSEOODZHEDZXFYWLKONUTWKCPSVQGJ",
        IPA: "m̩",
        desc: null,
        syllabic: "Syllabic",
        featureStops: [
          {kind: "FeatureStop", categoryID: "YUUNFSLQUZZVJGKXNYSNCKZHIPURKVVT", id: "ZXYFPKHUIGDWXVUPMVVFXMROSBKFKHZR"},
          {kind: "FeatureStop", categoryID: "KPAZCPLBROAZKNOSUGMXSRMUGQPUVVPA", id: "XBYINZTSDFIUTUDDKJYRMTLJJBPARGPZ"},
          {kind: "FeatureStop", categoryID: "CHRJYONQPXKFWAQDENLLHHWYKHJQZFVD", id: "IFKUDEPWTBULJGCZIYGWDYITMLUEQMVD"},
        ]
      },
      {
        typeID: "JMHNZPRXUPBIYCCPAEHZGLHIZGVNYPXR",
        id: "RDZCIIEKMLCMPBUBYHESOKUFKRYOYHLS",
        IPA: "d",
        desc: null,
        syllabic: "Nonsyllabic",
        featureStops: [
          {kind: "FeatureStop", categoryID: "YUUNFSLQUZZVJGKXNYSNCKZHIPURKVVT", id: "ZBKMZTESQRTSRXPZMNHQCDUVYEWNBUQL"},
          {kind: "FeatureStop", categoryID: "LARXUPVPTZXUGKITQRXCGXTCCDCKDEAT", id: "VNGWOVCSMCUZGMYDOQHCQPJTMZPQCIRI"},
          {kind: "FeatureStop", categoryID: "CHRJYONQPXKFWAQDENLLHHWYKHJQZFVD", id: "OFOMPHTROPHZFTWTXDDDUDRKKQDPYWPU"},
        ]
      }
    ]
  },
]

function assemblePhones() {
  phonemes = []
  for (let language of languages) {
    for (let phoneme of language.grid) {
      phonemes.push(phoneme)
    }
  }
  for (let phoneType of phoneTypesPrivate) {
    phoneTypes[phoneType.id] = phoneType
  }
}

let phonemes: Phoneme[] = []
let phoneTypes: { [id: string] : PhoneType } = {}

let languageData: LanguageData = {
  id: languages[0].id,
  lang: languages[0],
  phoneTypes: phoneTypes,
}

export {
  assemblePhones,
  languageData,
  phonemes,
  phoneTypes,
  phoneTypesPrivate,
  languages
}
