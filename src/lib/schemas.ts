import z from "zod"

export const imageAssetSchema = () =>
  z.object(
    {
      uri: z.string().min(1, "Image URI must not be empty"),
      width: z.number().positive(),
      height: z.number().positive(),
      fileSize: z
        .number()
        .max(5 * 1024 * 1024, "Image must be smaller than 5 MB")
        .optional(),
      mimeType: z
        .string()
        .refine(
          (v) => ["image/jpeg", "image/png", "image/webp"].includes(v),
          "Only JPEG, PNG, or WebP images are allowed"
        )
        .optional(),
    },
    { message: "Required" }
  )

export type ImageAsset = z.infer<ReturnType<typeof imageAssetSchema>>
