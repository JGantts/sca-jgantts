function greeter(person: string) {
  return `Hello, ${person}.`;
}
 
let user = "Monty";

document.body.textContent = greeter(user);



type UUID_PhoneFeatureKind = string
type UUID_Vowel = string
type UUID_Consonant = string
type UUID_Syllabic = UUID_Vowel|UUID_Consonant

type UUID_WordPhrase = string
type UUID_Rule = string
type UUID_RuleGroup = string
type UUID_TreeLimb = string

type phoneFeature_Kind = string

type phoneID = string

type langDate = number

type Description = string

type IPA = string



type PhoneFeatureKind = {
  id: UUID_PhoneFeatureKind
  desc: Description
  stops: { [id: number] : Description; }
}

type PhoneFeatureValue = number

type Vowel = {
  id: UUID_Vowel
  IPA: IPA
  features: { [id: UUID_PhoneFeatureKind] : PhoneFeatureValue; }
}

type Consonant = {
  id: UUID_Consonant
  IPA: IPA
  features: { [id: UUID_PhoneFeatureKind] : PhoneFeatureValue; }
}

type UUID_Cluster = UUID_Consonant[]

type Syllabic = Vowel|Consonant

type Syllable = {
	onset: UUID_Cluster|null
  rhyme: {
    nucleus: UUID_Syllabic|null
    coda: UUID_Cluster|null
  }
}

type WordPhrase_Data = {
  sounds: Syllable[]
}

type WordPhrase = {
  id: UUID_WordPhrase
  entryForm: Syllable[]
  entryTreeLimb: UUID_TreeLimb
  entryDate: langDate
}

type Rule = {
  id: UUID_Rule
  desc: string
  
}

type RuleGroup = {
  id: UUID_RuleGroup
  treeLimbs: {
    limb: UUID_TreeLimb
    dates: {
      start: langDate|null
      end: langDate|null
    }|null
  }[]

  rules: Rule[]
}

type TreeLimb = {
  id: UUID_TreeLimb
  branch: {
    deathDate: langDate
    children: UUID_TreeLimb[]
  }
}

let phones: {
  vowelFeatures: PhoneFeatureKind[],
  vowelPhones: Vowel[]
} = {
  vowelFeatures: [
    {
      id: "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC",
      desc: "height",
      stops: {
        0.0: "open",
        0.1428: "near-open",
        0.2857: "open-mid",
        0.4286: "mid",
        0.5714: "close-mid",
        0.8571: "cear-close",
        1.0: "close",
      },
    },
    {
      id: "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ",
      desc: "backness",
      stops: {
        0: "front",
        0.5: "central",
        1.0: "back",
      },
    },
    {
      id: "CTKXTKTLAUXLERTJKSEVLBTSFVYUXSUP",
      desc: "roundness",
      stops: {
        0: "unrounded",
        1: "rounded",
      },
    },
    {
      id: "CPZUOQHMIJEUFICZUNGDNWESBMBNUIID",
      desc: "stress",
      stops: {
        0: "unstressed",
        1: "stressed",
      },
    }
  ],
  vowelPhones: [
    {
      id: "DDQDFQREJUTNLIPBMGAOCGLYUYMGOVJG",
      IPA: "i",
      features: {
        "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC": 1.0,
        "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ": 0.0,
        "CPZUOQHMIJEUFICZUNGDNWESBMBNUIID": 0.0,
      }
    },
    {
      id: "YCLZGBAVXKMQNDRKIPDZWQDDEBVNFYGX",
      IPA: "a",
      features: {
        "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC": 0.0,
        "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ": 0.0,
        "CPZUOQHMIJEUFICZUNGDNWESBMBNUIID": 0.0,
      }
    },
    {
      id: "VQWKWCBRGBOAFHSRCRIBGWPDMQPBYIAW",
      IPA: "u",
      features: {
        "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC": 1.0,
        "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ": 1.0,
        "CPZUOQHMIJEUFICZUNGDNWESBMBNUIID": 0.0,
      }
    }
  ],
}

let lexicon: {
  words: WordPhrase[],
  rules: RuleGroup[],
  treeTrunks: UUID_TreeLimb[],
  treeLimbs: TreeLimb[],
} = {
  words: [
    {
      id: "RPYCHUYKXBSWPTMGCDPWDVGDUYRMVAHN",
      entryForm: [
        {
          onset: null,
          rhyme: {
            nucleus: "DDQDFQREJUTNLIPBMGAOCGLYUYMGOVJG",
            coda: null,
          }
        },
      ],
      entryDate: 0,
      entryTreeLimb: "QKFUWFZLSQOUHHYTDSMIGWJWJEXLTFYJ",
    },
    {
      id: "GPWQVRUSHHEFXRPYLIHVXFOXKOXXNXZG",
      entryForm: [
        {
          onset: null,
          rhyme: {
            nucleus: "DDQDFQREJUTNLIPBMGAOCGLYUYMGOVJG",
            coda: null,
          }
        },
      ],
      entryDate: 0,
      entryTreeLimb: "QKFUWFZLSQOUHHYTDSMIGWJWJEXLTFYJ",
    },
  ],
  rules:  [
    {
      id: "ZSUQBWJJCCAHSLUFFSRRANKVNNFHXQOP",
      treeLimbs: [
  
      ],
  
    rules: [
      
    ],
    }
  ],
  treeTrunks: [
    "QKFUWFZLSQOUHHYTDSMIGWJWJEXLTFYJ",
  ],
  treeLimbs: [
    {
      id: "QKFUWFZLSQOUHHYTDSMIGWJWJEXLTFYJ",
      branch: {
        deathDate: 100,
        children: [
          "LGOQCVJMEHTWMTYYYFKSKSONGNOHZJFP",
        ],
      },
    },
    {
      id: "LGOQCVJMEHTWMTYYYFKSKSONGNOHZJFP",
      branch: {
        deathDate: 200,
        children: [
          "PTTLVWNYQDIEUHUDSSBJGUXOUJFEXJRB",
          "AUKREWWMFVSHBMHFRNZPXTPVISEGVBFT",
        ],
      },
    },
    {
      id: "PTTLVWNYQDIEUHUDSSBJGUXOUJFEXJRB",
      branch: {
        deathDate: 300,
        children: [
          "VGPMUBSWKOVGVTPGAPBAXKCVLTUVZWMN"
        ],
      },
    },
    {
      id: "VGPMUBSWKOVGVTPGAPBAXKCVLTUVZWMN",
      branch: {
        deathDate: 400,
        children: [],
      },
    },
    {
      id: "AUKREWWMFVSHBMHFRNZPXTPVISEGVBFT",
      branch: {
        deathDate: 300,
        children: [
          "OIHYZATBJHLDYRSYRHGZGGFVVMLYMVIT",
        ],
      },
    },
    {
      id: "OIHYZATBJHLDYRSYRHGZGGFVVMLYMVIT",
      branch: {
        deathDate: 400,
        children: [],
      },
    },
  ],
}


