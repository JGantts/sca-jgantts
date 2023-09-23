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
        type: "number"
      },
      {
        id: "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ",
        desc: "backness",
        type: "number"
      },
      {
        id: "CTKXTKTLAUXLERTJKSEVLBTSFVYUXSUP",
        desc: "roundness",
        type: {
          values: [
            {
              id: "NRPMAAJKFSTQCLHHXLWSWKNVSQATESYT", //unrounded
            },
            {
              id: "YVGQZGLHLVPYJOEQZAYZZFNPGBBNHIVG", //rounded
            },
          ]
        }
      },
      {
        id: "CPZUOQHMIJEUFICZUNGDNWESBMBNUIID",
        desc: "stress",
        type: {
          values: [
            {
              id: "NWLMMJEUFUSGDROAYXKEMWWFVCXOBONZ", //unstressed
            },
            {
              id: "NBNPQDJOBJZDQBLVOZQPTIOCCFXTZJKP", //stressed
            },
          ]
        }
      },
    ],
  },
  {
    id: "JMHNZPRXUPBIYCCPAEHZGLHIZGVNYPXR",
    desc: "labial",
    type: "Consonant",
    features: [
      {
        id: "YUUNFSLQUZZVJGKXNYSNCKZHIPURKVVT",
        desc: "place",
        type: {
          values: [
            {
              id: "ZXYFPKHUIGDWXVUPMVVFXMROSBKFKHZR", //bilabilal
            },
            {
              id: "APINNIFZCAKTUWTDYVZUSNFBMDAYYPSG", //labio­dental
            },
            {
              id: "WPYQRFRZZATALISKLYVWSBZGBOLULSML", //linguo­labial
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
              id: "XBYINZTSDFIUTUDDKJYRMTLJJBPARGPZ", //nasal
            },
            {
              id: "NUKVUATOQIFBIQZRZGCFNWBXDMJIPVQZ", //plosive
            },
            {
              id: "FZORKQYULRXZPHBOXZCYXWHVSTZQLVFW", //affricate
            },
            {
              id: "MQNWXFBLUDMYTUYPRJCOQNNVRZHFVUOD", //fricative
            },
            {
              id: "PIUXNGOGMZETMSGHSINESOVYQBEXIPRL", //tap
            },
            {
              id: "XJRRLEDRTNJFLQVGCYWNEDYKKWLBIEBU", //trill
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
            },
            {
              id: "OFOMPHTROPHZFTWTXDDDUDRKKQDPYWPU", //voiced
            },
          ]
        }
      },
    ],
  },
  {
    id: "YKTSWOSRWLGXAFVYISYWAUPVRTDMGPQS",
    desc: "coronal",
    type: "Consonant",
    features: [
      {
        id: "QIJPODHGGTSWXGIDQTPPSVQJXUSZMOLL",
        desc: "place",
        type: "number"
      },
      {
        id: "LARXUPVPTZXUGKITQRXCGXTCCDCKDEAT",
        desc: "manner",
        type: {
          values: [
            {
              id: "PQPWUKRVGOBQMKWLFTJZCFTJGPASBHSA", //nasal
            },
            {
              id: "VNGWOVCSMCUZGMYDOQHCQPJTMZPQCIRI", //plosive
            },
            {
              id: "PFUKOICTDXSMPOTJXMIYGTUCZMEXAZRL", //silibant affricate
            },
            {
              id: "NSDHPOWAXKBKRYYFPAXCWZKLFPNQJFPE", //non-silibant affricate
            },
            {
              id: "GXIKPDFDIMJJOUEEFTWHNAAZZTZYVZIE", //silibant fricative
            },
            {
              id: "RUPOAGMZWDHRHKSSVJFIYYMYSTIHWWTF", //non-silibant fricative
            },
            {
              id: "GMKLRZGQUBPDOIBLTJPXPVVWESTJOZZE", //approximant
            },
            {
              id: "CQDZRXJZOQOKNUIHALDMHHIIVAGWLBRX", //tap
            },
            {
              id: "VAZDUHUYJIBAFATHZTVIOOVJINSRKDSP", //trill
            },
            {
              id: "IMHJWSHYQPDOKDDBLHEVCPIUWYBALEAQ", //Lateral affricative
            },
            {
              id: "FXMGJZEKIXQMIRCVLPZVBELXNSBHVBXY", //Lateral fricative
            },
            {
              id: "VVYLUMZXQPWSIFYVREPMJAQPXKPYHFCR", //Lateral approximant
            },
            {
              id: "EMMLESLTRVOYOKLACZJFVYRJTYEWZRFY", //Lateral tap
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
            },
            {
              id: "OFOMPHTROPHZFTWTXDDDUDRKKQDPYWPU", //voiced
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
          {kind: "FeatureRange", categoryID: "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC", low: 0.8571, high: 1.0 }, //height
          {kind: "FeatureRange", categoryID: "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ", low: 0, high: 0.3 }, //backness
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
          {kind: "FeatureRange", categoryID: "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC", low: 0.8571, high: 1.0 }, //height
          {kind: "FeatureRange", categoryID: "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ", low: 0, high: 0.3 }, //backness
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
          {kind: "FeatureRange", categoryID: "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC", low: 0.8571, high: 1.0 }, //height
          {kind: "FeatureRange", categoryID: "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ", low: 0.3, high: 0.6 }, //backness
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
          {kind: "FeatureRange", categoryID: "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC", low: 0.8571, high: 1.0 }, //height
          {kind: "FeatureRange", categoryID: "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ", low: 0.3, high: 0.6 }, //backness
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
          {kind: "FeatureRange", categoryID: "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC", low: 0.8571, high: 1.0 }, //height
          {kind: "FeatureRange", categoryID: "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ", low: 0.6, high: 1.0 }, //backness
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
          {kind: "FeatureRange", categoryID: "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC", low: 0.8571, high: 1.0 }, //height
          {kind: "FeatureRange", categoryID: "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ", low: 0.6, high: 1.0 }, //backness
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
          {kind: "FeatureRange", categoryID: "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC", low: 0.0, high: 0.1429 }, //height
          {kind: "FeatureRange", categoryID: "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ", low: 0, high: 0.3 }, //backness
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
        typeID: "YKTSWOSRWLGXAFVYISYWAUPVRTDMGPQS",
        id: "RDZCIIEKMLCMPBUBYHESOKUFKRYOYHLS",
        IPA: "d",
        desc: null,
        syllabic: "Nonsyllabic",
        featureStops: [
          {kind: "FeatureRange", categoryID: "QIJPODHGGTSWXGIDQTPPSVQJXUSZMOLL", low: 0.0, high: 0.75 },
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
}
