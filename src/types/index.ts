import * as z from "zod";


export const CategorySchema = z.enum([
    "creatures",
    "equipment",
    "materials",
    "monsters",
    "treasure",
]);
export type Category = z.infer<typeof CategorySchema>;

export const PropertiesSchema = z.object({
    "attack": z.union([z.number(), z.null()]),
    "defense": z.union([z.number(), z.null()]),
});
export type Properties = z.infer<typeof PropertiesSchema>;

export const EntrySchema = z.object({
    "category": CategorySchema,
    "common_locations": z.union([z.array(z.string()), z.null()]),
    "description": z.string(),
    "dlc": z.boolean(),
    "drops": z.union([z.array(z.string()), z.null()]).optional(),
    "edible": z.boolean().optional(),
    "id": z.number(),
    "image": z.string(),
    "name": z.string(),
    "cooking_effect": z.string().optional(),
    "hearts_recovered": z.number().optional(),
    "properties": PropertiesSchema.optional(),
});
export type Entry = z.infer<typeof EntrySchema>;

export const AxiosSchema = z.object({
    "data": z.array(EntrySchema),
    "message": z.string(),
    "status": z.number(),
});
export type AxiosResponse = z.infer<typeof AxiosSchema>;
