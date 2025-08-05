const seedrandom = require("seedrandom");
const { fakerEN, fakerFR, fakerDE, fakerJA } = require("@faker-js/faker");

// Region -> Faker mapping
const regionMap = {
  "en-US": fakerEN,
  "fr-FR": fakerFR,
  "de-DE": fakerDE,
  "ja-JP": fakerJA
};

function generateBooks({ seed, region, page = 1, likes = 0, reviews = 0, limit = 20 }) {
  const faker = regionMap[region] || fakerEN;
  const books = [];

  for (let i = 0; i < limit; i++) {
    const index = (page - 1) * limit + i;
    const combinedSeed = `${seed}-${region}-${index}`;
    const rng = seedrandom(combinedSeed);
    faker.seed(rng.int32());

    const title = faker.lorem.words(Math.floor(rng() * 4 + 2));
    const authors = [faker.person.fullName()];
    if (rng() > 0.8) authors.push(faker.person.fullName()); // Sometimes 2 authors

    const publisher = faker.company.name();
    const isbn = faker.string.alphanumeric({ length: 13, casing: 'upper' });

    const avgLikes = likes;
    const avgReviews = reviews;

    const bookLikes = Math.floor(rng() * avgLikes * 2); // Approximated random
    const hasReview = rng() < (avgReviews >= 1 ? 1 : avgReviews);
    const reviewText = hasReview ? faker.lorem.paragraph() : null;
    const reviewAuthor = hasReview ? faker.person.fullName() : null;

    books.push({
      index: index + 1,
      isbn,
      title,
      authors,
      publisher,
      likes: bookLikes,
      review: reviewText,
      reviewAuthor
    });
  }

  return books;
}

module.exports = generateBooks;
