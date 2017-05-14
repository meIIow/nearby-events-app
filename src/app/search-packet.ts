export class SearchPacket {
  centerCoordinates: string;
  lat: string;
  lng: string;
  maxDistance: number;
  startTime: Date;
  endTime: Date;
  terms: string;
  name: string;
  coordsSet: boolean;
  maxDistSet: boolean;
  centerDate: Date;
}
