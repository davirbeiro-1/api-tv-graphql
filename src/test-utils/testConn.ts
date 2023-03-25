import { Sequelize } from "sequelize-typescript";
import { Actor } from "../dto/model/actor.model";
import { Episode } from "../dto/model/episode.model";
import { TvShowActor } from "../dto/model/tv-show-actor.model";
import { TvShow } from "../dto/model/tv-show.model";
import { User } from "../dto/model/user-model";

export async function testConnect() {
    const testConnection = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false
    });
    testConnection.addModels([User, TvShow, Episode, Actor, TvShowActor])
    await testConnection.sync()
    return testConnection
}