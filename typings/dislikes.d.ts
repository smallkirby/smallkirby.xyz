export type Ent = {
  name: string;
  link?: string;
  description?: string | null;
}

export type Dislike = {
  title: string;
  ents: Ent[];
}
