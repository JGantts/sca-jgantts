import type { 
  PhoneType,
  Phone,
  Language,
  Phoneme,
} from "./commonTypes"

let phoneTypes: PhoneType[] = [
  {
    id: "QGDYAEYMDEZDMMPOBXRTCUDHYYPYFBPF",
    desc: "vowel",
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
        id: "DDQDFQREJUTNLIPBMGAOCGLYUYMGOVJG",
        IPA: "i",
        desc: null,
        featureStops: [
          {kind: "FeatureRange", categoryID: "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC", low: 0.8571, high: 1.0 }, //height
          {kind: "FeatureRange", categoryID: "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ", low: 0, high: 0.3 }, //backness
          {kind: "FeatureStop", categoryID: "CTKXTKTLAUXLERTJKSEVLBTSFVYUXSUP", id: "NRPMAAJKFSTQCLHHXLWSWKNVSQATESYT"},
        ]
      },
      {
        id: "YCLZGBAVXKMQNDRKIPDZWQDDEBVNFYGX",
        IPA: "a",
        desc: null,
        featureStops: [
          {kind: "FeatureRange", categoryID: "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC", low: 0.0, high: 0.1429 }, //height
          {kind: "FeatureRange", categoryID: "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ", low: 0, high: 0.3 }, //backness
          {kind: "FeatureStop", categoryID: "CTKXTKTLAUXLERTJKSEVLBTSFVYUXSUP", id: "NRPMAAJKFSTQCLHHXLWSWKNVSQATESYT"}
        ]
      },
      {
        id: "VQWKWCBRGBOAFHSRCRIBGWPDMQPBYIAW",
        IPA: "u",
        desc: null,
        featureStops: [
          {kind: "FeatureRange", categoryID: "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC", low: 0.8571, high: 1.0 }, //height
          {kind: "FeatureRange", categoryID: "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ", low: 0.6, high: 1.0 }, //backness
          {kind: "FeatureStop", categoryID: "CTKXTKTLAUXLERTJKSEVLBTSFVYUXSUP", id: "YVGQZGLHLVPYJOEQZAYZZFNPGBBNHIVG"},
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
}

let phonemes: Phoneme[]

export {
  assemblePhones,
  languages,
  phonemes,
  phoneTypes,
}
