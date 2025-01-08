
import { integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";


export const CarListing = pgTable('carListings', {
    id: serial('id').primaryKey(),
    listingTitle: varchar('listingTitle'),
    tagline: varchar('tagline'),
    originalPrice: varchar('originalPrice'),
    sellingPrice: varchar('sellingPrice').notNull(),
    category: varchar('category').notNull(),
    condition: varchar('condition').notNull(),
    make: varchar('make').notNull(),
    model: varchar('model').notNull(),
    year: varchar('year').notNull(),
    driveType: varchar('driveType').notNull(),
    transmission: varchar('transmission').notNull(),
    fuelType: varchar('fuelType').notNull(),
    mileage: varchar('mileage').notNull(),
    engineSize: varchar('engineSize'),
    cylinder: varchar('cylinder'),
    color: varchar('color').notNull(),
    door: varchar('door').notNull(),
    offerType: varchar('offerType'),
    vin: varchar('vin'),
    listingDescription: varchar('listingDescription').notNull(),
    features: json('features'),
    createdBy: varchar('createdBy').notNull(),
    userName: varchar('userName').notNull().default('Hari vardhan'),
    userImageUrl: varchar('userImageUrl').default('https://lh3.googleusercontent.com/a/ACg8ocKf1Q-YkXtPK6ULgo0uFzZJwViBwkkHms-R3635j8VZVj5cPL_P=s288-c-no'),

    postedOn: varchar('postedOn')

    // features:json('features'),
    // createdBy:varchar('createdBy').notNull(),
    // userName:varchar('userName').notNull().default('Tubeguruji'),
    // userImageUrl:varchar('userImageUrl').default('https://www.tubeguruji.com/_next/image?url=%2Flogo2.jpg&w=128&q=75'),
    // postedOn:varchar('postedOn')


})

export const CarImages = pgTable('carImages', {
    id: serial('id').primaryKey(),
    imageUrl: varchar('imageUrl').notNull(),
    carListingId: integer('carListingId').notNull().references(() => CarListing.id)

})