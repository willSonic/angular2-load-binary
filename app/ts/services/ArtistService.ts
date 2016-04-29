import {Injectable, bind} from 'angular2/core';
import {Subject, BehaviorSubject} from 'rxjs';
import {Artist} from '../models';


/**
 * UserService manages our current user
 */
@Injectable()
export class ArtistService {
  // `current Artist` contains the current arist
  currentArtist: Subject<Artist> = new BehaviorSubject< Artist>(null);

  public setCurrentArtist(newArtist: Artist): void {
    this.currentArtist.next(newArtist);
  }
}

export var artistServiceInjectables: Array<any> = [
  bind(ArtistService).toClass(ArtistService)
];
