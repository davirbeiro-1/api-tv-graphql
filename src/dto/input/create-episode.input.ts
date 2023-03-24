import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateEpisodeInput {
    @Field()
    name: string;

    @Field()
    isReleased: boolean;

    @Field()
    releaseDate: string;

    @Field()
    duration: string;

    @Field()
    tvShowId: number;

    @Field()
    description: string;
}