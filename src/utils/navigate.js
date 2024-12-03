export const handleMigrateProduct = (navigate, id, productData) => {
  navigate(`/audiophile/${id}`, {
    state: productData,
  });
};
