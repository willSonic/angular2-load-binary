/**
 * Copyright 2016, Wilsonic..
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. 
 *
 */

import {
  Component
} from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';

/*
 * Components
 */
import {ChatNavBar} from './components/ChatNavBar';
import {ChatThreads} from './components/ChatThreads';
import {ChatWindow} from './components/ChatWindow';

/*
 * Injectables
 */
import { servicesInjectables } from './services/services';
import {utilInjectables} from './util/util';

/*
 * Services
 */
import {
  ArtistService
} from './services/services';

import {BinaryLoadExampleData} from './BinaryLoadExampleData';

/*
 * Webpack
 */
require('../css/styles.scss');

@Component({
  selector: 'harness',
  directives: [PlayListComponent],
  template: `
          <div id="content">
            <div class="container">
              <harness></harness>
            </div>
          </div>
          `
})
class  Harness {
  constructor( public artistService: ArtistService) {
    BinaryLoadExampleData.init(ArtistService);
  }
}

bootstrap(Harness, [ servicesInjectables, utilInjectables ]);
