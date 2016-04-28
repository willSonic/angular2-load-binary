import { uuid } from './util/uuid';

export class Artist {
   id: string;

  constructor( public artistName: string,
               public trackTitle: string,
               public artistSrc: string,
               public audioURL: string) {
    this.id = uuid();
  }
}



