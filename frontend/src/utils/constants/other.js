const defaultRange = {
  startDate: new Date(new Date().getFullYear(), new Date().getFullMonth(), 1),
  endDate: new Date().toISOString().slice(0, 10),
};

module.exports = { defaultRange }