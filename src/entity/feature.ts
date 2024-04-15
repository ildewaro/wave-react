import Attribute from "./attributes"
import WComment from "./wcomment";

export default  interface Feature {
  id: number
  type: string
  attributes: Attribute;
  comments: WComment
}