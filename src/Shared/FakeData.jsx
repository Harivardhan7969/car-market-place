import { faker } from "@faker-js/faker"

function createRandomCarlist() {

    return {
        name: faker.vehicle.vehicle(),
        fuelType: faker.vehicle.fuel(),
        model: faker.vehicle.model(),
        type: faker.vehicle.type(),
        price: faker.finance.amount({ min: 50000, max: 200000 }),
        miles: 1000,
        color: faker.vehicle.color(),
        description: faker.lorem.paragraph(),
        image: 'https://assets.architecturaldigest.in/photos/60004a09d68a278e29c86a11/16:9/w_2560%2Cc_limit/feature6-1366x768.jpg',
        gearType: 'Automatic'


    }
}

const carList = faker.helpers.multiple(createRandomCarlist, {
    count: 7
})

export default {
    carList
};