import { format } from "date-fns";

export const formatTime = (date) => {
  return date ? format(new Date(date), "MMMM do, yyyy") : "";
};