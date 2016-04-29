import { uuid } from './util/uuid';



export class Artist {
    id: string;

    constructor(public artistName:string,
                public trackTitle: string,
                public albumImgSrc: string,
                public trackURL:string){
                       this.id = uuid();
                }


}


export class BinaryData {
    id:string;
    trackName:String;
    binaryBuffer:AudioData;
    constructor(obj?: any){
        this.id              = obj && obj.id              || uuid();
        this.trackName       = obj && obj.trackName       || null;
        this.binaryBuffer    = obj && obj.binaryBuffer    || null;
    }
}

export class AudioData {
    id: string;
    playedAt  : Date;
    author:Artist;
    binaryLoaded:boolean;
    binaryData:BinaryData;

    constructor(obj?: any) {
        this.id              = obj && obj.id            ||  uuid();
        this.playedAt        = obj && obj.artistName    ||  Date;
        this.author          = obj && obj.author        ||  null;
        this.binaryLoaded    = obj && obj.binaryLoaded  ||  false;
        this.binaryData      = obj && obj.binaryData    ||  null;
    }
}



