import type {WordPhrase, RuleGroup, UUID_TreeLimb, TreeLimb} from "./commonTypes"

let lexicon: {
  words: WordPhrase[],
  rules: RuleGroup[],
  treeTrunks: UUID_TreeLimb[],
  treeLimbs: TreeLimb[],
} = {
  words: [
    {
      id: "RPYCHUYKXBSWPTMGCDPWDVGDUYRMVAHN",
      entryForm: { sounds: [
        {
          onset: [],
          rhyme: {
            nucleus: {
              type: "QGDYAEYMDEZDMMPOBXRTCUDHYYPYFBPF",
              features: {
                "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC": 1.0, //height
                "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ": 0.0, //backness
                "CTKXTKTLAUXLERTJKSEVLBTSFVYUXSUP": "NRPMAAJKFSTQCLHHXLWSWKNVSQATESYT",
                "CPZUOQHMIJEUFICZUNGDNWESBMBNUIID": "NWLMMJEUFUSGDROAYXKEMWWFVCXOBONZ",
              }
            },
            coda: [],
          }
        },
      ]},
      entryDate: 0,
      entryTreeLimb: "QKFUWFZLSQOUHHYTDSMIGWJWJEXLTFYJ",
    },
    {
      id: "GPWQVRUSHHEFXRPYLIHVXFOXKOXXNXZG",
      entryForm: { sounds: [
        {
          onset: [],
          rhyme: {
            nucleus: {
              type: "QGDYAEYMDEZDMMPOBXRTCUDHYYPYFBPF",
              features: {
                "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC": 1.0, //height
                "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ": 1.0, //backness
                "CTKXTKTLAUXLERTJKSEVLBTSFVYUXSUP": "YVGQZGLHLVPYJOEQZAYZZFNPGBBNHIVG",
                "CPZUOQHMIJEUFICZUNGDNWESBMBNUIID": "NWLMMJEUFUSGDROAYXKEMWWFVCXOBONZ",
              }
            },
            coda: [],
          }
        },
      ]},
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

export {
  lexicon
}
