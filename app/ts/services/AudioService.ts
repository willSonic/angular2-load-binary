import {Injectable, bind} from 'angular2/core';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import {Artist, AudioData} from '../models';


let initialAudioData: AudioData[] = [];

interface IAudioDataOperation extends Function {
  (audioData: AudioData[]): AudioData[];
}

/**
 * UserService manages our current user
 */
@Injectable()
export class AudioService {

  // a stream that publishes new arist only once
  newArtists: Subject<AudioData> = new Subject<AudioData>();

  // `artists` is a observable that contains the mo
  artists: Observable<AudioData[]>;

  // `updates` receives _operations_ to be applied to our `artist`
  // it's a way we can perform changes on *all* artists (that are currently
  // stored in `artists`)
  updates: Subject<any> = new Subject<any>();

  // `current Artist` contains the current arist
  currentArtist: Subject<Artist> = new BehaviorSubject< Artist>(new Artist());


  // action streams
  create: Subject<Artist> = new Subject<Artist>();

  markAudioAsLoaded: Subject<any> = new Subject<any>();

  constructor() {

      // watch the updates and accumulate operations on the messages
      this.artists = this.updates.scan(
                  (artists: Artist[],  operation: IArtistOperation) => {
                     return operation(artists);
                   }, initialArtists)
        // make sure we can share the most recent list of artists across anyone
        // who's interested in subscribing and cache the last known list of
        // artists
          .publishReplay(1)
          .refCount();

      this.create
          .map( function(artist: Artist): IArtistOperation {
            return (artists: Artist[]) => { return artists.concat(Artist);  };
          }).subscribe(this.updates);

      this.newArtists.subscribe(this.create);

      this.markAudioAsLoaded
        .map( (audioData: AudioData) => {
          return (artists: Artist[]) => {
            return artists.map( (artist: Artist) => {
              // note that we're manipulating `artist` directly here. Mutability
              // can be confusing and there are lots of reasons why you might want
              // to, say, copy the Artist object or some other 'immutable' here
              if (artist.audioData.id === audioData.id) {
                  artist.binaryLoaded = true;
              }
              return artist;
            });
          };
        })
        .subscribe(this.updates);

    }

    // an imperative function call to this action stream
    addArtist(artist: Artist): void {
       this.newArtists.next(artist);
    }

  public setCurrentArtist(newArtist: Artist): void {
     this.currentArtist.next(newArtist);
  }

}

export var audioServiceInjectables: Array<any> = [
  bind(AudioService).toClass(AudioService)
];
