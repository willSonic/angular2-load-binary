import {Injectable, bind} from 'angular2/core';
import {Http} from 'angular2/http';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import {BinaryData, AudioData} from '../models';
import {AudioService} from './AudioService';

import 'rxjs/Rx';

interface IBinaryDatasOperation extends Function {
  (currentAudioBinaryDataList: BinaryData[]): BinaryData[];
}

@Injectable()
export class BinaryLoadService {
  static BASE_URL: string = 'https://upload.wikimedia.org/wikipedia/en/d/db/Rapper%27s_Delight_sample.ogg';

  binaryDataRequests: Observable<AudioData>;

  // `currentThread` contains the currently selected thread
  currentBinaryData: Subject<BinaryData> =
    new BehaviorSubject<BinaryData>(new BinaryData());



  currentAudioBinaryDataList: Observable<BinaryData[]>;


  updates: Subject<any> = new Subject<any>();

  create: Subject<BinaryData> = new Subject<BinaryData>();

  constructor(public http: Http, audioService:AudioService) {


    this.create
        .map( function(binaryData:BinaryData):IBinaryDatasOperation{
        return (currentAudioBinaryDataList: BinaryData[]) => {
          return currentAudioBinaryDataList.concat(binaryData);
        };
      })
      .subscribe(this.updates);
  }

  query(URL:string): Observable<any[]> {


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

   newBinaryDataLoadRequest(AudioData):void{

  }
  
}

export var binaryLoadServiceInjectables: Array<any> = [
  bind(BinaryLoadService).toClass(BinaryLoadService)
];