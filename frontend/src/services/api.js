const API_URL =
  "http://127.0.0.1:8000";

export const uploadResume =
  async (formData) => {

    const response =
      await fetch(
        `${API_URL}/upload-resume`,
        {
          method: "POST",
          body: formData,
        }
      );

    return response.json();
};

export const getAnalytics =
  async () => {

    const response =
      await fetch(
        `${API_URL}/analytics`
      );

    return response.json();
};