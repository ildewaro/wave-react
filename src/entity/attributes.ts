import Coordinates from "./coordinates";

export default interface Attribute {
  external_id: string;
  magnitude: number;
  place: string;
  time: number;
  tsunami: boolean;
  mag_type: string;
  coordinates: Coordinates;
  links: URL;
}