import { useState, useEffect } from 'react';
import { fetchWorkouts } from '../services/workoutService';

function useFetchWorkouts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWorkouts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWorkouts();
        setData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch workouts');
      } finally {
        setLoading(false);
      }
    };

    getWorkouts();
  }, []);

  return { data, loading, error };
}

export default useFetchWorkouts;
