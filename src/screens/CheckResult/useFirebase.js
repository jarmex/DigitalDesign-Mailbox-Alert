import { useEffect, useState } from 'react';
import moment from 'moment';
import { firebaseService } from '../../services/firebase';

export const useFirebase = () => {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(
    'Hooray!!!!\n\n All letters are picked up.',
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebaseService
      .getData()
      .then(({ maildata, pending: pd }) => {
        setData(maildata);
        if (pd) {
          setPending(
            `You have letters to pick up.....\n\n${moment(pd.date).fromNow()}`,
          );
        }
        setLoading(false);
      })
      .catch((error) => setLoading(false));
    return () => {
      firebaseService.unSubscribe();
    };
  }, []);

  return [data, loading, pending];
};
