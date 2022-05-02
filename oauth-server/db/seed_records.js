module.exports = async (seeds, { find, create, update }) => {
  for (const seed of seeds) {
    const [dbRecord] = await find(seed);

    if (!dbRecord) {
      await create(seed);
    } else {
      await update(dbRecord.id, seed);
    }
  }
};
