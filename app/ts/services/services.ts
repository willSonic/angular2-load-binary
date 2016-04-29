
import {artistServiceInjectables} from './ArtistService';
import {audioServiceInjectables} from './AudioService';
import {binaryLoadServiceInjectables} from './BinaryLoadService';

export * from './ArtistService';
export * from './AudioService';
export * from './BinaryLoadService';

export var servicesInjectables: Array<any> = [
  artistServiceInjectables,
  audioServiceInjectables,
  binaryLoadServiceInjectables
];
