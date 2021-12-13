export interface Ent {
  name: string;
  link?: string;
  description?: string | null;
};

export interface Like {
  title: string;
  ents: Ent[];
}
