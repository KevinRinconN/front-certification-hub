import { Topic } from "../topic/topic.interface";

export interface Course {
  id?: string;
  name: string;
  topics?: Topic[];
}
