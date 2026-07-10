import { z } from "zod";

export const createCategoryDTO = z.object({
  name: z.string().trim().min(1, "name is required"),
  description: z.string().trim().optional(),
});
