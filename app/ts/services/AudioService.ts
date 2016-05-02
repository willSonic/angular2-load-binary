import {Injectable, bind} from 'angular2/core';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import {BinaryData, AudioData, Artist} from '../models';


let initialAudioDataList: AudioData[] = [];

interface IAudioDatasOperation extends Function {
  (audioList: AudioData[]): AudioData[];
}

/**
 * UserService manages our current user
 */
@Injectable()
export class AudioService {

  // a stream that publishes new arist only once
  newAudioData: Subject<AudioData> = new Subject<AudioData>();

  // `artists` is a observable that contains the mo
  audioList: Observable<AudioData[]>;

  // `updates` receives _operations_ to be applied to our `artist`
  // it's a way we can perform changes on *all* artists (that are currently
  // stored in `artists`)
  updates: Subject<any> = new Subject<any>();

  // `current Artist` contains the current arist
  currentBinaryDataList: Observable<BinaryData[]>;


  // action streams
  create: Subject<AudioData> = new Subject<AudioData>();

  markAudioAsLoaded: Subject<any> = new Subject<any>();

  constructor() {

      // watch the updates and accumulate operations on the messages
      this.audioList = this.updates.scan(
                  (audioList: AudioData[],  operation: IAudioDatasOperation) => {
                     return operation(audioList);
                   }, initialAudioDataList)
        // make sure we can share the most recent list of artists across anyone
        // who's interested in subscribing and cache the last known list of
        // artists
          .publishReplay(1)
          .refCount();

      this.create
          .map( function(audioData: AudioData): IAudioDatasOperation {
            return (audioList: AudioData[]) => { return audioList.concat(audioData);  };
          }).subscribe(this.updates);

      this.newAudioData.subscribe(this.create);

      this.markAudioAsLoaded
        .map( (binaryData: BinaryData) => {
          return (audioList: AudioData[]) => {
            return audioList.map( (audioData: AudioData) => {
              // note that we're manipulating `artist` directly here. Mutability
              // can be confusing and there are lots of reasons why you might want
              // to, say, copy the Artist object or some other 'immutable' here
              if (audioData.binaryData.id === binaryData.id) {
                  audioData.binaryLoaded = true;
              }
              return audioData;
            });
          };
        })
        .subscribe(this.updates);

    }

    // an imperative function call to this action stream
    addAudioData(audioData: AudioData): void {
       this.newAudioData.next(audioData);
    }

  public setCurrentAudioData(newAudioData: AudioData): void {
     //this.currentAudioData.next(newAudioData);
  }

}

export var audioServiceInjectables: Array<any> = [
  bind(AudioService).toClass(AudioService)
];
