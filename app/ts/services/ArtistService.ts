import {Injectable, bind} from 'angular2/core';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import {Artist} from '../models';


/**
 * UserService manages our current user
 */
@Injectable()
export class ArtistService {
  // `currentUser` contains the current user
  currentArtist: Subject<Artist> = new BehaviorSubject<Artist>(null);

  public setCurrentArist(newArtist: Artist): void {
    this.currentArtist.next(newArtist);
  }
}

export var artistServiceInjectables: Array<any> = [
  bind(ArtistService).toClass(ArtistService)
];
