import type {WordPhrase, RuleGroup, UUID_TreeLimb, TreeLimb} from "./commonTypes"

let lexicon: {
  words: WordPhrase[],
  rules: RuleGroup[],
  treeTrunks: UUID_TreeLimb[],
  treeLimbs: TreeLimb[],
} = {
  words: [
    {
      id: "KSKHEQNSTGJBNELVCHCIXBMFAMREOBVK",
        entryForm: { 
          value: { kind: 'Syllables', sounds: [
          {
            onset: [
              {
                type: "JMHNZPRXUPBIYCCPAEHZGLHIZGVNYPXR",
                features: {
                  "YUUNFSLQUZZVJGKXNYSNCKZHIPURKVVT": "ZXYFPKHUIGDWXVUPMVVFXMROSBKFKHZR", //bilabilal
                  "KPAZCPLBROAZKNOSUGMXSRMUGQPUVVPA": "XBYINZTSDFIUTUDDKJYRMTLJJBPARGPZ", //nasal
                  "CHRJYONQPXKFWAQDENLLHHWYKHJQZFVD": "OFOMPHTROPHZFTWTXDDDUDRKKQDPYWPU", //voiced
                }
              }
            ],
            rhyme: {
              nucleus: {
                type: "QGDYAEYMDEZDMMPOBXRTCUDHYYPYFBPF",
                features: {
                  "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC": 1.0, //height
                  "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ": 1.0, //backness
                  "CTKXTKTLAUXLERTJKSEVLBTSFVYUXSUP": "YVGQZGLHLVPYJOEQZAYZZFNPGBBNHIVG", //rounded
                  "CPZUOQHMIJEUFICZUNGDNWESBMBNUIID": "NBNPQDJOBJZDQBLVOZQPTIOCCFXTZJKP", //stressed
                }
              },
              coda: [
                {
                  type: "JMHNZPRXUPBIYCCPAEHZGLHIZGVNYPXR",
                  features: {
                  "YUUNFSLQUZZVJGKXNYSNCKZHIPURKVVT": "ZXYFPKHUIGDWXVUPMVVFXMROSBKFKHZR", //bilabilal
                  "KPAZCPLBROAZKNOSUGMXSRMUGQPUVVPA": "XBYINZTSDFIUTUDDKJYRMTLJJBPARGPZ", //nasal
                  "CHRJYONQPXKFWAQDENLLHHWYKHJQZFVD": "OFOMPHTROPHZFTWTXDDDUDRKKQDPYWPU", //voiced
                  }
                }
              ],
            }
          },
        ]}
      },
      entryDate: 0,
      entryTreeLimb: "QKFUWFZLSQOUHHYTDSMIGWJWJEXLTFYJ",
    },
    {
      id: "PZGRSQQIWVYDRZWVTICODLDPHZDVPZZJ",
        entryForm: {
          value: { kind: 'Syllables', sounds: [
          {
            onset: [
              {
                type: "YKTSWOSRWLGXAFVYISYWAUPVRTDMGPQS",
                features: {
                "QIJPODHGGTSWXGIDQTPPSVQJXUSZMOLL": 0.375, //alveolar
                "LARXUPVPTZXUGKITQRXCGXTCCDCKDEAT": "VNGWOVCSMCUZGMYDOQHCQPJTMZPQCIRI", //plosive
                "CHRJYONQPXKFWAQDENLLHHWYKHJQZFVD": "OFOMPHTROPHZFTWTXDDDUDRKKQDPYWPU", //voiced
                }
              }
            ],
            rhyme: {
              nucleus: {
                type: "QGDYAEYMDEZDMMPOBXRTCUDHYYPYFBPF",
                features: {
                  "QCOTLERJNNSYNKCMMSILQBETHSFYNLLC": 0.0, //height
                  "JGJYSLLKLOVLDIKKLQXPDTBRUXNAMGOJ": 0.0, //backness
                  "CTKXTKTLAUXLERTJKSEVLBTSFVYUXSUP": "NRPMAAJKFSTQCLHHXLWSWKNVSQATESYT", //unrounded
                  "CPZUOQHMIJEUFICZUNGDNWESBMBNUIID": "NBNPQDJOBJZDQBLVOZQPTIOCCFXTZJKP", //stressed
                }
              },
              coda: [
                {
                  type: "YKTSWOSRWLGXAFVYISYWAUPVRTDMGPQS",
                  features: {
                  "QIJPODHGGTSWXGIDQTPPSVQJXUSZMOLL": 0.375, //alveolar
                  "LARXUPVPTZXUGKITQRXCGXTCCDCKDEAT": "VNGWOVCSMCUZGMYDOQHCQPJTMZPQCIRI", //plosive
                  "CHRJYONQPXKFWAQDENLLHHWYKHJQZFVD": "OFOMPHTROPHZFTWTXDDDUDRKKQDPYWPU", //voiced
                  }
                }
              ],
            }
          },
        ]}
      },
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
