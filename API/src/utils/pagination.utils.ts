export const pagination = (totalData: number, perPage: number, currentPage: number) => {
      const totalPages = Math.ceil(totalData / perPage);

    const nextPage =
      currentPage < totalPages
        ? currentPage + 1
        : null;

    const prevPage =
      currentPage > 1
        ? currentPage - 1
        : null;

        return {
            totalData,
                      totalPages,
                      currentPage,
                      perPage,
                      nextPage,
                      prevPage,
                      hasNextPage: totalPages > currentPage,
                      hasprevPage: currentPage > 1
        }
}