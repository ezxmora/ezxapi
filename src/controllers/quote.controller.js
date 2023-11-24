import database from "../lib/database.js";
const quote = database.quote;

export const createQuote = async (req, res, _) => {
  const { authorId, content } = req.body;

  const responseQuote = await quote.create({ quote: content, authorId });

  return res.json({
    quote: responseQuote,
    message: "The quote has been successfully created",
  });
};

export const removeQuote = async (req, res, _) => {
  const { id } = req.body;

  await quote.destroy({ where: { id } });

  return res.json({ message: `The quote "${id}" has been deleted` });
};

export const updateQuote = async (req, res, _) => {
  const { id, newContent } = req.body;

  await quote.update({ quote: newContent }, { where: { id } });

  return res.json({ id, quote: newContent });
};

export const getQuotes = async (req, res, next) => {
  try {
    if (req.params?.id) {
      const selectedQuote = await quote.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      return res.json(selectedQuote);
    } else {
      const index = Number(req.query.index) || 0;
      const limit = 10;

      const { count, rows } = await quote.findAndCountAll({
        include: [
          { association: "author", required: true, attributes: ["name"] },
        ],
        offset: index,
        limit,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      return res.json({
        quotes: rows,
        prev: index === 0 ? null : `/v1/quote?index=${index - limit}`,
        next:
          index >= count || rows.length < limit
            ? null
            : `/v1/quote?index=${index + limit}`,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllQuotesByAuthor = async (req, res, next) => {
  const { author } = req.params;
  const index = Number(req.query.index) || 0;
  const limit = 10;

  const { count, rows } = await quote.findAndCountAll({
    include: [{ association: "author", required: true, attributes: ["name"] }],
    offset: index,
    limit,
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  return res.json({
    quotes: rows,
    prev:
      index === 0 ? null : `/v1/quote/author/${author}?index=${index - limit}`,
    next:
      index >= count || rows.length < limit
        ? null
        : `/v1/quote/author/${author}?index=${index + limit}`,
  });
};
