# Short Explanation

To design and create the TV Show Series API, a microservice that is served on Docker, I decided to use the following stack: Node.js, TypeScript, TypeGraphQL, Sequelize-Typescript with MySQL as the relational database, and SQLite as the testing database. Working with Apollo Server and GraphQL is a good way to deal with a major problem in REST APIs: the over-fetching and under-fetching of data. To improve my experience dealing with GraphQL schemas, I followed the code-first approach. This accelerated the code implementation because all GraphQL schemas were auto-generated with the help of decorators provided by TypeGraphQL.


# How to run

    Install Node
    Install Docker
    Install Docker Compose
    Open terminal
    To up the necessary containers, run 'docker-compose up -d' on the root folder
    Use the project :)


# Schema Types

(This schema was generated by lib graphql-markdown )


<details>
  <summary><strong>Table of Contents</strong></summary>

  * [Query](#query)
  * [Mutation](#mutation)
  * [Objects](#objects)
    * [Actor](#actor)
    * [Episode](#episode)
    * [TvShow](#tvshow)
    * [User](#user)
    * [UserTvShow](#usertvshow)

</details>

## Query
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>getActorsByTvShowId</strong></td>
<td valign="top">[<a href="#actor">Actor</a>!]!</td>
<td>Return all actors based on a Existing Tv Show Id</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">tvShowId</td>
<td valign="top"><a href="#float">Float</a>!</td>
<td>Tv show identifier</td>
</tr>
<tr>
</tr>
<tr>
<td colspan="2" valign="top"><strong>getTvShows</strong></td>
<td valign="top">[<a href="#tvshow">TvShow</a>!]!</td>
<td>Return all Tv Shows
</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>getTvShowsByActorId</strong></td>
<td valign="top">[<a href="#tvshow">TvShow</a>!]!</td>
<td>Return all Tv Shows based on an existing Actor Id</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">actorId</td>
<td valign="top"><a href="#float">Float</a>!</td>
<td>Actor identifier</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>getTvByGenre</strong></td>
<td valign="top">[<a href="#tvshow">TvShow</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top">[<a href="#string">String</a>!]!</td>
<td>Array of strings that represents the TvShow attributes</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">genre</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>Enum value that can be: 'comedy', 'drama', action', documentary','thriller','animation', 'other'</td>
</tr>
</tbody>
</table>

## Mutation
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>createActor</strong></td>
<td valign="top"><a href="#actor">Actor</a>!</td>
<td>Create an actor in database and return it</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">birthday</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>Actor birthday</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">name</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>Full name of an actor</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createEpisode</strong></td>
<td valign="top"><a href="#episode">Episode</a>!</td>
<td>Create an episode an return it</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">description</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>Short description of an episode</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">tvShowId</td>
<td valign="top"><a href="#float">Float</a>!</td>
<td>Id of a tv that episode belongs it</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">duration</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>Duration of an episode</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">releaseDate</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>Date when the episode was launched</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">isReleased</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>Value that determine wheter an episode was launched</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">name</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>Name of an episode</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createTvShow</strong></td>
<td valign="top"><a href="#tvshow">TvShow</a>!</td>
<td>Create a Tv show and return it</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">actorsIds</td>
<td valign="top">[<a href="#string">String</a>!]!</td>
<td>Array of actors that appears in the Tv show</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">description</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>Short description of a tv show</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">numberOfSeasons</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>Number of seasons</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">numberOfEpisodes</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>Number of an episodes</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">genre</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>Enum value that can be: 'comedy', 'drama', action', documentary','thriller','animation', 'other'</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">endsAt</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>Date that marks the beginning of the tv show</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">startsAt</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>Date that marks the end of the tv show</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">name</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>Name of a tv show</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>registerUser</strong></td>
<td valign="top"><a href="#user">User</a>!</td>
<td>Create an user and return it</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">name</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>Name of an user</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">password</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>Password of an user</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">email</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>Email of an user</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addFavorite</strong></td>
<td valign="top"><a href="#usertvshow">UserTvShow</a>!</td>
<td>Add a Tv show as favorite to an User</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">tvShowId</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>Identifier of a Tv Show</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">userId</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>Identifier of an user</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>removeFavorite</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>Remove an user favorite tv show</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">tvShowId</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>Identifier of a Tv Show</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">userId</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>Identifier of an user</td>
</tr>
</tbody>
</table>

## Fields that can be returned

### Actor

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>age</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### Episode

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isReleased</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>releaseDate</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>duration</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### TvShow

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>startsAt</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>endsAt</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>numberOfEpisodes</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>numberOfSeasons</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### User

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>password</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### UserTvShow

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>userId</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>tvShowId</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
</tbody>
</table>
