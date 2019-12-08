import DateTimeFormat = Intl.DateTimeFormat;

export interface Song {
  id: number;
  name: string;
  link: string;
  image: string;
  description: string;
  createDate: DateTimeFormat;
  singerId: number;
}
