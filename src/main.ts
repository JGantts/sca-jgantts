function greeter(person: string) {
  return `Hello, ${person}.`;
}
 
let user = "Benny";

document.body.textContent = greeter(user);

type word_ID = string
type rule_ID = string
type ruleGroup_ID = string
type treeLimb_ID = string

type langDate = number

type nucleu = {

}

type Syllable = {

}

interface Sound {

}

interface Consonant extends Sound {

}

interface Vowel extends Sound {

}

type WordPhrase_Data = {
  sounds: Sound[]
}

type WordPhrase = {
  id: word_ID
  entryForm: string
  entryTreeLimb: treeLimb_ID
  entryDate: langDate

  related: word_ID[]

  data: WordPhrase_Data
}

type Rule = {
  id: rule_ID
  desc: string
  
}

type RuleGroup = {
  id: ruleGroup_ID
  treeLimbs: {
    limb: treeLimb_ID
    dates: {
      start: langDate|null
      end: langDate|null
    }|null
  }[]

  rules: Rule[]
}

type TreeLimb = {
  id: treeLimb_ID
  deathDate: langDate
  children: treeLimb_ID[]
}



let treeTrunks: treeLimb_ID[] = [
  "QKFUWFZLSQOUHHYTDSMIGWJWJEXLTFYJ",
]

let treeNodes: TreeLimb[] = [
  {
    id: "QKFUWFZLSQOUHHYTDSMIGWJWJEXLTFYJ",
    deathDate: 100,
    children: [
      "LGOQCVJMEHTWMTYYYFKSKSONGNOHZJFP",
    ],
  },
  {
    id: "LGOQCVJMEHTWMTYYYFKSKSONGNOHZJFP",
    deathDate: 200,
    children: [
      "PTTLVWNYQDIEUHUDSSBJGUXOUJFEXJRB",
      "AUKREWWMFVSHBMHFRNZPXTPVISEGVBFT",
    ],
  },
  {
    id: "PTTLVWNYQDIEUHUDSSBJGUXOUJFEXJRB",
    deathDate: 300,
    children: [
      "VGPMUBSWKOVGVTPGAPBAXKCVLTUVZWMN"
    ],
  },
  {
    id: "VGPMUBSWKOVGVTPGAPBAXKCVLTUVZWMN",
    deathDate: 400,
    children: [],
  },
  {
    id: "AUKREWWMFVSHBMHFRNZPXTPVISEGVBFT",
    deathDate: 300,
    children: [
      "OIHYZATBJHLDYRSYRHGZGGFVVMLYMVIT",
    ],
  },
  {
    id: "OIHYZATBJHLDYRSYRHGZGGFVVMLYMVIT",
    deathDate: 400,
    children: [],
  },
]

let rules: RuleGroup[] = [
  {
    id: "ZSUQBWJJCCAHSLUFFSRRANKVNNFHXQOP",
    treeLimbs: [

    ],

  rules: [
    
  ],
  }
]

let words: Lexeme[] = [

]