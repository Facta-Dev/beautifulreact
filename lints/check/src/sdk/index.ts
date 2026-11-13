export const sdk = {
  leads: {
    get: (id: string): Promise<{ id: string }> => Promise.resolve({ id }),
  },
};
