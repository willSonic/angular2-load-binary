
/*
 * Angular
 */
import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
 /*
  * Services
  */
import {ArtistService} from 'services/ArtistService';
import {BinaryLoadService} from 'services/BinaryLoadService';


import {Artist} from '../models';


@Component({
  selector: 'playList',
  directives: [CORE_DIRECTIVES],
  template: `
              <div *ngIf="results">
                 <div class="row">
                    <div class="col-sm-6 col-md-4" *ngFor="#t of results">
                      <div class="thumbnail">
                        <div class="content">
                          <img src="{{ t.album.images[0].url }}" class="img-responsive">
                          <div class="caption">
                            <h3>
                              <a [routerLink]="['/Artists', {id: t.artists[0].id}]">
                                {{ t.artists[0].name }}
                              </a>
                            </h3>
                            <br>
                            <p>
                              <a [routerLink]="['/Tracks', {id: t.id}]">
                                {{ t.name }}
                              </a>
                            </p>
                          </div>
                          <div class="attribution">
                            <h4>
                              <a [routerLink]="['/Albums', {id: t.album.id}]">
                                {{ t.album.name }}
                              </a>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            `
})
export class PlayListComponent implements OnInit {
  currentArtist:Artist;
  results: Object;

  constructor(public artistService: ArtistService,
              public binaryLoadService:BinaryLoadService) {
  }

  ngOnInit(): void {
    this.artistService
      .getAlbum(this.id)
      .subscribe((res: any) => this.renderResults(res));
  }
  
  renderResults(res: any): void {
    this.results = null;
    if (res && res.tracks && res.tracks.items) {
      this.results = res.tracks.items;
    }
  }
}
