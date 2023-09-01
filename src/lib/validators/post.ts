import { z } from 'zod'


export const PostValidator = z.object({
  title: z.string().min(3, 'Title must be longer than 3 characters').max(128, 'Title must be at least 128 characters'),
  subredditId: z.string(),
  content: z.any()
})

export type PostCreationRequest = z.infer<typeof PostValidator>