"use strict";

const express = require(`express`);
const request = require(`supertest`);

const articleController = require(`./article-controller`);
const DataService = require(`./../data-service/article-data-service`);
const { HttpCode } = require(`../constants`);

const mockData = [
  {
    id: `390K92`,
    category: [`Кино`, `Музыка`, `IT`, `Железо`, `За жизнь`],
    createdDate: `2022-07-22 11:20:00`,
    announce: `Если товар не понравится — верну всё до последней копейки. Даю недельную гарантию. Таких предложений больше нет! При покупке с меня бесплатная доставка в черте города. Бонусом отдам все аксессуары.`,
    fullText: `Таких предложений больше нет! Бонусом отдам все аксессуары. Пользовались бережно и только по большим праздникам. Если товар не понравится — верну всё до последней копейки. Товар в отличном состоянии. При покупке с меня бесплатная доставка в черте города.`,
    title: `Как начать программировать`,
    comments: [
      {
        id: `U3Z6YJ`,
        text: `Почему в таком ужасном состоянии? Вы что?! В магазине дешевле. Неплохо, но дорого.`,
      },
      {
        id: `3tvGl0`,
        text: `А где блок питания? Совсем немного... Продаю в связи с переездом. Отрываю от сердца.`,
      },
    ],
  },
  {
    id: `nLxvAp`,
    category: [`Железо`, `Разное`],
    createdDate: `2022-08-15 03:51:00`,
    announce: `При покупке с меня бесплатная доставка в черте города. Даю недельную гарантию. Товар в отличном состоянии. Бонусом отдам все аксессуары. Продаю с болью в сердце...`,
    fullText: `Бонусом отдам все аксессуары. Если товар не понравится — верну всё до последней копейки.`,
    title: `Как достигнуть успеха не вставая с кресла`,
    comments: [
      { id: `pSywJh`, text: `Оплата наличными или перевод на карту?` },
      { id: `rYyhzS`, text: `Почему в таком ужасном состоянии?` },
    ],
  },
  {
    id: `FqYepY`,
    category: [`Разное`],
    createdDate: `2022-09-01 03:11:00`,
    announce: `Даю недельную гарантию. Таких предложений больше нет! Если найдёте дешевле — сброшу цену. При покупке с меня бесплатная доставка в черте города. Если товар не понравится — верну всё до последней копейки.`,
    fullText: `Таких предложений больше нет! Продаю с болью в сердце... Пользовались бережно и только по большим праздникам. Даю недельную гарантию. Если найдёте дешевле — сброшу цену. Товар в отличном состоянии.`,
    title: `Как достигнуть успеха не вставая с кресла`,
    comments: [
      {
        id: `AT5T2V`,
        text: `Неплохо, но дорого. Продаю в связи с переездом. Отрываю от сердца. А где блок питания?`,
      },
      {
        id: `n43UTs`,
        text: `С чем связана продажа? Почему так дешёво? Совсем немного...`,
      },
      {
        id: `JMFq7c`,
        text: `Неплохо, но дорого. Продаю в связи с переездом. Отрываю от сердца.`,
      },
    ],
  },
  {
    id: `mi83-g`,
    category: [`Музыка`, `Разное`, `За жизнь`, `IT`],
    createdDate: `2022-08-19 17:24:00`,
    announce: `Это настоящая находка для коллекционера! Таких предложений больше нет! При покупке с меня бесплатная доставка в черте города. Пользовались бережно и только по большим праздникам. Продаю с болью в сердце...`,
    fullText: `Бонусом отдам все аксессуары. Продаю с болью в сердце... Товар в отличном состоянии. Таких предложений больше нет! Даю недельную гарантию. При покупке с меня бесплатная доставка в черте города.`,
    title: `Как начать программировать`,
    comments: [
      {
        id: `Y4vA04`,
        text: `Вы что?! В магазине дешевле. А сколько игр в комплекте? А где блок питания?`,
      },
      {
        id: `WL0eOB`,
        text: `Продаю в связи с переездом. Отрываю от сердца. Почему в таком ужасном состоянии?`,
      },
    ],
  },
  {
    id: `2eYr7W`,
    category: [
      `За жизнь`,
      `Без рамки`,
      `Деревья`,
      `Кино`,
      `IT`,
      `Разное`,
      `Железо`,
    ],
    createdDate: `2022-07-26 03:00:00`,
    announce: `Пользовались бережно и только по большим праздникам. Таких предложений больше нет! Это настоящая находка для коллекционера! Если товар не понравится — верну всё до последней копейки. Товар в отличном состоянии.`,
    fullText: `Таких предложений больше нет! Если найдёте дешевле — сброшу цену. Пользовались бережно и только по большим праздникам. Даю недельную гарантию.`,
    title: `Самый лучший музыкальный альбом этого года`,
    comments: [
      {
        id: `lVSAey`,
        text: `Почему в таком ужасном состоянии? А где блок питания?`,
      },
      {
        id: `sAsIuf`,
        text: `С чем связана продажа? Почему так дешёво? Неплохо, но дорого. А сколько игр в комплекте?`,
      },
    ],
  },
  {
    id: `hnMACV`,
    category: [`Разное`, `Музыка`, `За жизнь`],
    createdDate: `2022-08-19 05:46:00`,
    announce: `Пользовались бережно и только по большим праздникам. Таких предложений больше нет! Это настоящая находка для коллекционера! Товар в отличном состоянии. Даю недельную гарантию.`,
    fullText: `Если найдёте дешевле — сброшу цену. Товар в отличном состоянии. Таких предложений больше нет! Даю недельную гарантию.`,
    title: `Как начать программировать`,
    comments: [
      { id: `YwI1Uk`, text: `А сколько игр в комплекте?` },
      {
        id: `mboULa`,
        text: `Вы что?! В магазине дешевле. Продаю в связи с переездом. Отрываю от сердца. Почему в таком ужасном состоянии?`,
      },
      {
        id: `_wc4Ca`,
        text: `С чем связана продажа? Почему так дешёво? Оплата наличными или перевод на карту? Совсем немного...`,
      },
      { id: `kEORZ8`, text: `Совсем немного...` },
    ],
  },
  {
    id: `w3iQ6q`,
    category: [`Программирование`, `Кино`, `Без рамки`],
    createdDate: `2022-06-15 08:25:00`,
    announce: `Таких предложений больше нет! Даю недельную гарантию. При покупке с меня бесплатная доставка в черте города. Продаю с болью в сердце... Это настоящая находка для коллекционера!`,
    fullText: `При покупке с меня бесплатная доставка в черте города. Бонусом отдам все аксессуары. Это настоящая находка для коллекционера! Если товар не понравится — верну всё до последней копейки. Продаю с болью в сердце... Если найдёте дешевле — сброшу цену. Даю недельную гарантию. Пользовались бережно и только по большим праздникам.`,
    title: `Обзор новейшего смартфона`,
    comments: [
      {
        id: `2phaw-`,
        text: `С чем связана продажа? Почему так дешёво? Неплохо, но дорого.`,
      },
      { id: `iV5xAY`, text: `Совсем немного...` },
      {
        id: `DD-dud`,
        text: `Оплата наличными или перевод на карту? Вы что?! В магазине дешевле. Почему в таком ужасном состоянии?`,
      },
      {
        id: `77L00D`,
        text: `Неплохо, но дорого. Продаю в связи с переездом. Отрываю от сердца.`,
      },
    ],
  },
  {
    id: `i5_9Pv`,
    category: [`IT`, `Железо`, `Кино`],
    createdDate: `2022-08-30 13:36:00`,
    announce: `Таких предложений больше нет! При покупке с меня бесплатная доставка в черте города. Товар в отличном состоянии. Даю недельную гарантию. Если товар не понравится — верну всё до последней копейки.`,
    fullText: `Если найдёте дешевле — сброшу цену.`,
    title: `Как перестать беспокоиться и начать жить`,
    comments: [
      {
        id: `7aGwtA`,
        text: `Оплата наличными или перевод на карту? А сколько игр в комплекте? Совсем немного...`,
      },
      { id: `sgaVdw`, text: `Неплохо, но дорого.` },
      { id: `soTI9X`, text: `Почему в таком ужасном состоянии?` },
      {
        id: `sqYbqU`,
        text: `Оплата наличными или перевод на карту? Почему в таком ужасном состоянии? А где блок питания?`,
      },
    ],
  },
  {
    id: `SA9EVB`,
    category: [
      `Разное`,
      `Программирование`,
      `IT`,
      `Деревья`,
      `Железо`,
      `Музыка`,
      `Кино`,
    ],
    createdDate: `2022-07-01 06:31:00`,
    announce: `Даю недельную гарантию. Если найдёте дешевле — сброшу цену. При покупке с меня бесплатная доставка в черте города. Продаю с болью в сердце... Если товар не понравится — верну всё до последней копейки.`,
    fullText: `При покупке с меня бесплатная доставка в черте города. Товар в отличном состоянии. Если товар не понравится — верну всё до последней копейки. Таких предложений больше нет!`,
    title: `Лучшие рок-музыканты 20-века`,
    comments: [
      {
        id: `Hq5fNb`,
        text: `Почему в таком ужасном состоянии? С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца.`,
      },
      {
        id: `ikjudf`,
        text: `А где блок питания? Продаю в связи с переездом. Отрываю от сердца.`,
      },
      {
        id: `Jd6IR6`,
        text: `Оплата наличными или перевод на карту? А где блок питания? Почему в таком ужасном состоянии?`,
      },
      {
        id: `Qx5R0b`,
        text: `С чем связана продажа? Почему так дешёво? Почему в таком ужасном состоянии?`,
      },
    ],
  },
  {
    id: `T9oQ9_`,
    category: [
      `Без рамки`,
      `Разное`,
      `Программирование`,
      `Музыка`,
      `За жизнь`,
      `Кино`,
      `IT`,
      `Деревья`,
    ],
    createdDate: `2022-08-07 16:13:00`,
    announce: `Если товар не понравится — верну всё до последней копейки. Даю недельную гарантию. Если найдёте дешевле — сброшу цену. Бонусом отдам все аксессуары. Это настоящая находка для коллекционера!`,
    fullText: `Продаю с болью в сердце...`,
    title: `Обзор новейшего смартфона`,
    comments: [
      {
        id: `yx0QnX`,
        text: `А сколько игр в комплекте? Совсем немного... Оплата наличными или перевод на карту?`,
      },
      { id: `TU6H5B`, text: `Совсем немного...` },
    ],
  },
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));

  app.use(express.json());

  articleController(app, new DataService(cloneData));

  return app;
};

describe(`API returns a list of all articles`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 10 articles`, () =>
    expect(response.body.length).toBe(10));

  test(`First article's id equals "390K92"`, () =>
    expect(response.body[0].id).toBe(`390K92`));
});

describe(`API returns an article with given id`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/390K92`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Article's title is "Как начать программировать"`, () =>
    expect(response.body.title).toBe(`Как начать программировать`));
});

describe(`API creates an article if data is valid`, () => {
  const newArticle = {
    category: [`Кино`, `Музыка`, `IT`, `Железо`, `За жизнь`],
    createdDate: new Date(),
    announce: `Если товар не понравится — верну всё до последней копейки. Даю недельную гарантию. Таких предложений больше нет! При покупке с меня бесплатная доставка в черте города. Бонусом отдам все аксессуары.`,
    fullText: `Таких предложений больше нет! Пользовались бережно и только по большим праздникам. Если товар не понравится — верну всё до последней копейки. Товар в отличном состоянии. При покупке с меня бесплатная доставка в черте города.`,
    title: `Как начать программировать`,
  };

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).post(`/articles`).send(newArticle);
  });

  test(`Status code 201`, () =>
    expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Articles count is changed`, () =>
    request(app)
      .get(`/articles`)
      .expect((res) => expect(res.body.length).toBe(11)));
});

describe(`API refuses to create an article if data is invalid`, () => {
  const newArticle = {
    category: [`Кино`, `Музыка`, `IT`, `Железо`, `За жизнь`],
    createdDate: new Date(),
    announce: `Если товар не понравится — верну всё до последней копейки. Даю недельную гарантию. Таких предложений больше нет! При покупке с меня бесплатная доставка в черте города. Бонусом отдам все аксессуары.`,
    fullText: `Таких предложений больше нет! Пользовались бережно и только по большим праздникам. Если товар не понравится — верну всё до последней копейки. Товар в отличном состоянии. При покупке с меня бесплатная доставка в черте города.`,
    title: `Как начать программировать`,
  };

  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = { ...newArticle };
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API changes existent article`, () => {
  const newArticle = {
    category: [`Кино`, `Музыка`, `IT`, `Железо`, `За жизнь`],
    createdDate: new Date(),
    announce: `Если товар не понравится — верну всё до последней копейки. Даю недельную гарантию. Таких предложений больше нет! При покупке с меня бесплатная доставка в черте города. Бонусом отдам все аксессуары.`,
    fullText: `Таких предложений больше нет! Пользовались бережно и только по большим праздникам. Если товар не понравится — верну всё до последней копейки. Товар в отличном состоянии. При покупке с меня бесплатная доставка в черте города.`,
    title: `Почему в таком ужасном состоянии?`,
  };

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).put(`/articles/390K92`).send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed article`, () =>
    expect(response.body.id).toBe(`390K92`));

  test(`Article is really changed`, () =>
    request(app)
      .get(`/articles/390K92`)
      .expect((res) =>
        expect(res.body.title).toBe(`Почему в таком ужасном состоянии?`)
      ));
});

test(`API returns status code 404 when trying to change non-existent article`, () => {
  const app = createAPI();

  const validArticle = {
    category: [`Кино`, `Музыка`, `IT`, `Железо`, `За жизнь`],
    createdDate: new Date(),
    announce: `Если товар не понравится — верну всё до последней копейки. Даю недельную гарантию. Таких предложений больше нет! При покупке с меня бесплатная доставка в черте города. Бонусом отдам все аксессуары.`,
    fullText: `Таких предложений больше нет! Пользовались бережно и только по большим праздникам. Если товар не понравится — верну всё до последней копейки. Товар в отличном состоянии. При покупке с меня бесплатная доставка в черте города.`,
    title: `Почему в таком ужасном состоянии?`,
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(validArticle)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {
  const app = createAPI();

  const invalidArticle = {
    category: [`Кино`, `Музыка`, `IT`, `Железо`, `За жизнь`],
    createdDate: new Date(),
    announce: `Если товар не понравится — верну всё до последней копейки. Даю недельную гарантию. Таких предложений больше нет! При покупке с меня бесплатная доставка в черте города. Бонусом отдам все аксессуары.`,
    fullText: `Таких предложений больше нет! Пользовались бережно и только по большим праздникам. Если товар не понравится — верну всё до последней копейки. Товар в отличном состоянии. При покупке с меня бесплатная доставка в черте города.`,
    invalid: `invalid field`,
  };

  return request(app)
    .put(`/articles/390K92`)
    .send(invalidArticle)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/articles/390K92`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted article`, () =>
    expect(response.body.id).toBe(`390K92`));

  test(`article count is 10 now`, () =>
    request(app)
      .get(`/articles`)
      .expect((res) => expect(res.body.length).toBe(10)));
});

describe(`API correctly deletes a comment`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/articles/nLxvAp/comments/pSywJh`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted comment`, () =>
    expect(response.body.id).toBe(`pSywJh`));

  test(`article count is 1 now`, () =>
    request(app)
      .get(`/articles/nLxvAp/comments`)
      .expect((res) => expect(res.body.length).toBe(1)));
});

test(`API refuses to delete non-existent article`, () => {
  const app = createAPI();

  return request(app).delete(`/articles/NOEXST`).expect(HttpCode.NOT_FOUND);
});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {
  const app = createAPI();

  return request(app)
    .post(`/articles/NOEXST/comments`)
    .send({
      text: `Неважно`,
    })
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to delete non-existent comment`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/nLxvAp/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});

describe(`API creates a comment if data is valid`, () => {
  const newComment = {
    text: `Как начать программировать`,
  };

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles/nLxvAp/comments`)
      .send(newComment);
  });

  test(`Status code 201`, () =>
    expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Comments count is changed`, () =>
    request(app)
      .get(`/articles/nLxvAp/comments`)
      .expect((res) => expect(res.body.length).toBe(2)));
});

describe(`API refuses to create a comment if data is invalid`, () => {
  const newComment = {
    category: `dssdsd`,
  };

  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newComment)) {
      const badComment = { ...newComment };
      delete badComment[key];
      await request(app)
        .post(`/articles/nLxvAp/comments`)
        .send(badComment)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

test(`API returns status code 404 when trying to change comment for non-existent article`, () => {
  const app = createAPI();

  const validComment = {
    text: `sdsdf`,
  };

  return request(app)
    .put(`/articles/NOEXST/comments/pSywJh`)
    .send(validComment)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 404 when trying to change non-existent comment for article`, () => {
  const app = createAPI();

  const validComment = {
    text: `sdsdf`,
  };

  return request(app)
    .put(`/articles/nLxvAp/comments/NOEXIST`)
    .send(validComment)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change a comment with invalid data`, () => {
  const app = createAPI();

  const invalidArticle = {
    invalid: `invalid field`,
  };

  return request(app)
    .put(`/articles/nLxvAp/comments/pSywJh`)
    .send(invalidArticle)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API changes existent comment`, () => {
  const newArticle = {
    text: `text435345`,
  };

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/nLxvAp/comments/rYyhzS`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed comment`, () =>
    expect(response.body.id).toBe(`rYyhzS`));

  test(`Comment is really changed`, () =>
    request(app)
      .get(`/articles/nLxvAp/comments/rYyhzS`)
      .expect((res) => expect(res.body.text).toBe(`text435345`)));
});
