import { nanoid } from "nanoid";

export async function getPosts(db, from = new Date(), by, limit) {
  return db
    .collection("posts")
    .find({
      // Pagination: Fetch posts from before the input date or fetch from newest
      ...(from && {
        createdAt: {
          $lte: from,
        },
      }),
      ...(by && { creatorId: by }),
    })
    .sort({ createdAt: -1 })
    .limit(limit || 10)
    .toArray();
}

export async function insertPost(
  db,
  {
    location,
    startdate,
    temperature,
    weather,
    AirTemp,
    content,
    lat,
    lon,
    algae,
    creatorId,
  }
) {
  return db
    .collection("posts")
    .insertOne({
      location,
      startdate,
      temperature,
      weather,
      AirTemp,
      content,
      lat,
      lon,
      algae,
      creatorId,
      createdAt: new Date(),
      _id: nanoid(12),
    })
    .then(({ ops }) => ops[0]);
}
