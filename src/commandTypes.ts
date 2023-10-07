import { AddLexeme, RemoveLexeme } from "./commandImplementations"
import type { Syllables_Cluster, UUID_WordPhrase, WordPhrase } from "./commonTypes"

export interface Command {
  do: () => void
  undo: () => void
  kind: string
}

export interface LexemeCommand extends Command {
  kind: "add"|"remove"|"modify"
}

export class AddRemoveLexemeCommand implements LexemeCommand {
  kind: "add"|"remove" = "add"
  lexeme: WordPhrase

  constructor(newLexeme: WordPhrase) {
    this.lexeme = newLexeme
  }
  
  do = () => {
    switch (this.kind){
      case "add":
        this.addLexeme()
        break
      case "remove":
        this.removeLexeme()
        break
    }
  }

  undo = () => { 
    switch (this.kind){
      case "add":
        this.removeLexeme()
        break
      case "remove":
        this.addLexeme()
        break
    }
  }

  addLexeme() {
    AddLexeme(this.lexeme)
  }

  removeLexeme() {
    RemoveLexeme(this.lexeme)
  }
}

export class AddLexemeCommand extends AddRemoveLexemeCommand {
  kind = "add" as const
}

export class RemoveLexemeCommand extends AddRemoveLexemeCommand {
  kind = "remove" as const
}
