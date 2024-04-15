import Feature from "./feature";
import { Pagination } from "./pagination";

export default interface FeatureResponse {
    data: Array<Feature>;
    pagination: Pagination;
}