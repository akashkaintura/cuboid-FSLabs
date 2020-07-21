export const byId = ({ ids }) => (builder) => {
  if (ids) {
    builder.findByIds(ids);
  }
};
