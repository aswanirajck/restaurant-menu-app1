export const fetchData = async () => {
    try {
      const response = await fetch(
        'https://run.mocky.io/v3/db0018c8-5982-4d89-a54f-f51fe14d3c89'
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
