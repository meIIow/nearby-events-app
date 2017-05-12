export class SearchPacket {
  centerCoordinates: string;
  lat: string;
  lng: string;
  maxDistance: number;
  startTime: number;
  endTime: number;
  terms: string;
  name: string;
  coordsSet: boolean;
  maxDistSet: boolean;
  centerDate: Date;
}
