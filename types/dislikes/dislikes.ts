export interface Ent {
  name: string;
  link?: string;
  description?: string | null;
};

export interface Dislike {
  title: string;
  ents: Ent[];
};
