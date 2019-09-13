export interface INote {
  id: string
  title: string
  star: boolean
  coverClass: string
  coverImage: string
  content: string
}

export interface INoteList {
  id: string
  title: string
  star: boolean
  cover: string
}

export interface INewNote {
  title: string
  isCustom: boolean
  cover: string
  coverImage: string // base 64
}
