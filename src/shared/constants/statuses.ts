export const PROPERTY_STATUSES = ["for-sale", "to-let", "new-build", "sold"] as const;
export type PropertyStatus = (typeof PROPERTY_STATUSES)[number];

export const PROPERTY_STATUS_LABELS: Record<PropertyStatus, string> = {
  "for-sale": "For sale",
  "to-let": "To let",
  "new-build": "New build",
  sold: "Sold",
};

export const REQUEST_STATUSES = ["new", "in-progress", "closed"] as const;
export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  new: "New",
  "in-progress": "In progress",
  closed: "Closed",
};
