// Adapted From
// https://github.com/vercel/examples/blob/main/solutions/static-tweets-tailwind

export const getTwitterMedia = async (id) => {
  try {
    const response = await fetch(
      `https://api.twitter.com/1.1/statuses/show.json?id=${id}&tweet_mode=extended`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    const videoData = data.extended_entities.media[0].video_info;
    return videoData;
  } catch (error) {
    console.log(id, error);
  }
};
