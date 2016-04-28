import {Injectable, provide} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/Rx';


@Injectable()
export class BinaryLoadService {
  static BASE_URL: string = 'https://upload.wikimedia.org/wikipedia/en/d/db/Rapper%27s_Delight_sample.ogg';

  constructor(public http: Http) {
  }

  query(URL:String): Observable<any[]> {


    return Observable.create(observer=>{
      let req = new XMLHttpRequest();
      req.open('get',URL);
      req.responseType = "arraybuffer";
      req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
          observer.next(req.response);
          observer.complete();
        }
      };
      req.send();
    });

    
  }
  
}

export var BINARYLOAD_PROVIDERS: Array<any> = [
  provide(BinaryLoadService, {useClass: BinaryLoadService})
];
