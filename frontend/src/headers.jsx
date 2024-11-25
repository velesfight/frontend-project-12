const getAuthHeaders = (authToken) => ({
  headers: { Authorization: `Bearer ${authToken}` },
});
export default getAuthHeaders;
