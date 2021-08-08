const now = new Date();

const afterDate = () =>
  new Date(now.getFullYear(), now.getMonth(), now.getDate());

const beforeDate = () =>
  new Date(afterDate().setDate(afterDate().getDate() + 8));

const preserveTill = () =>
  new Date(afterDate().setDate(afterDate().getDate() - 5));

export { afterDate, beforeDate, preserveTill }