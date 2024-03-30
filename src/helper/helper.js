export function extactDate(createdAt) {
  const date = new Date(createdAt);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export function getColorTicketStatus(statusValue) {
  const colorMapping = {
    open: "blue",
    inProgress: "yellow",
    resolved: "green",
    onHold: "gray",
  };
  return colorMapping[statusValue] || "blue-gray";
}

export function getColorUserStatus(statusValue) {
  const colorMapping = {
    approved: "green",
    suspended: "yellow",
    rejected: "red",
  };
  return colorMapping[statusValue] || "blue-gray";
}
