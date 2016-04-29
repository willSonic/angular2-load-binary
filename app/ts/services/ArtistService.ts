import {Injectable, bind} from 'angular2/core';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import {Artist} from '../models';


/**
 * UserService manages our current user
 */
@Injectable()
export class ArtistService {

  // `artists` is a observable that contains the mo
  artists: Observable<Artist[]>;


  // `current Artist` contains the current arist
  currentArtist: Subject<Artist> = new BehaviorSubject< Artist>(null);

  public setCurrentArtist(newArtist: Artist): void {
     this.currentArtist.next(newArtist);
  }


  // an imperative function call to this action stream
  addMessage(message: Artist): void {
    this.newMessages.next(message);
  }
   
}

export var artistServiceInjectables: Array<any> = [
  bind(ArtistService).toClass(ArtistService)
];
