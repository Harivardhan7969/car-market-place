
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: "./Configs/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://car-market_owner:GLKog9r8lOCw@ep-autumn-cake-a50ewq4h.us-east-2.aws.neon.tech/car-market-place?sslmode=require',
    },
});