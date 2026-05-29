import { z } from 'zod'

const moroccanPhone = z
  .string()
  .min(1, 'Le numéro de téléphone est requis')
  .regex(
    /^(\+212|0)([ \-]?)([5-7]\d{8})$/,
    'Numéro de téléphone marocain invalide (ex: 0612345678)'
  )

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Le nom complet doit contenir au moins 3 caractères')
    .max(100),
  phone: moroccanPhone,
  city: z.string().min(1, 'La ville est requise'),
  address: z
    .string()
    .min(10, "L'adresse complète doit contenir au moins 10 caractères")
    .max(500),
  notes: z.string().max(500).optional(),
})

export type CheckoutSchema = z.infer<typeof checkoutSchema>
