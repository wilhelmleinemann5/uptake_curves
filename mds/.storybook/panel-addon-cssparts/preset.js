function managerEntries(entry = []) {
  return [...entry, require.resolve('./register')]; //👈 Addon implementation
}

export default { managerEntries };
