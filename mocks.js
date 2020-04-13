const faker = require("faker");

const models = require("./models");
const TurndownService = require("turndown");

const owner = "5e921d1193658a1c983e87a1";

module.exports = () => {
  models.Post.remove()
    .then(() => {
      Array.from({ length: 20 }).forEach(() => {
        const turndownService = new TurndownService();

        models.Post.create({
          title: faker.lorem.words(5),
          body: turndownService.turndown(faker.lorem.words(100)),
          owner,
        })
          .then(console.log)
          .catch(console.log);
      });
    })
    .catch(console.log);
};
