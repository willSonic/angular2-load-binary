import {Injectable, bind} from 'angular2/core';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import {Artist, AudioData, BinaryData} from '../models';
import {AudioService} from './AudioService';
import {BinaryLoadService} from './BinaryLoadService';



let initialArtistList: Artist[] = [];


interface IArtistsOperation extends Function {
  (artistList: Artist[]): Artist[];
}

@Injectable()
export class ArtistService {
  draftAudioData= new AudioData();
  // a stream that publishes new messages only once
  newArtists: Subject<Artist> = new Subject<Artist>();


  // `artist` is a observable that contains the most up to date list of threads
  artistList: Observable<Artist[]>;


  // `currentUser` contains the current user



  updates: Subject<any> = new Subject<any>();

  /**
   * UserService manages our current user
   */
  // action streams
  create: Subject<Artist> = new Subject<Artist>();


  currentArtistAudioData: Subject<AudioData> =  new BehaviorSubject<AudioData>(new AudioData());

  constructor(public audioService:AudioService) {
    this.artistList = this.updates
      // watch the updates and accumulate operations on the messages
      .scan((artistList: Artist[],
             operation: IArtistsOperation) => {
                 
               return operation(artistList);
             },
            initialArtistList)
      // make sure we can share the most recent list of messages across anyone
      // who's interested in subscribing and cache the last known list of
      // messages
      .publishReplay(1)
      .refCount();

      this.create
      .map( function(artist: Artist): IArtistsOperation {
        return (artistList: Artist[]) => {
          return artistList.concat(artist);
        };
      })
      .subscribe(this.updates);

    this.newArtists
      .subscribe(this.create);


    this.currentArtistAudioData.subscribe(this.audioService.markAudioAsLoaded)

  }

  // an imperative function call to this action stream
  addArtist(artist: Artist): void {
    this.newArtists.next(artist);
  }

  setCurrentArtist(artistRequest): void{
   console.log('artistRequest', artistRequest);
    let ad: AudioData = this.draftAudioData;
    ad.author = artistRequest;
    ad.binaryLoaded = false;
    ad.binaryLoaded = null;
    this.audioService.addAudioData(ad);
  }

}

export var artistServiceInjectables: Array<any> = [
  bind(ArtistService).toClass(ArtistService)
];
