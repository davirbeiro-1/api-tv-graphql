import { faker } from "@faker-js/faker"

const tvShowInput = {
    actorsIds: [
        "1"
    ],
    description: faker.datatype.string(6),
    numberOfSeasons: faker.datatype.float().toString(),
    numberOfEpisodes: faker.datatype.float().toString(),
    genre: "action",
    endsAt: faker.date.recent().toString(),
    startsAt: faker.date.recent().toString(),
    name: faker.name.firstName(),
    plataformToWatch: "netflix"
}

const actorInput = {
    age: faker.date.birthdate().toString(),
    name: faker.name.firstName()
}

const episodeInput = {
    description: faker.datatype.string(7),
    tvShowId: faker.datatype.float(),  
    duration: faker.datatype.float().toString(),
    releaseDate: faker.date.past().toString(),
    isReleased: faker.datatype.boolean(),
    name: faker.datatype.string()
}

const userInput = {
    name: faker.name.firstName(),
    password: faker.internet.password(),
    email: faker.internet.email()
}

export const variableValues = {
    tvShowInput, actorInput, episodeInput, userInput
}