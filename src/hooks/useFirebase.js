import { useEffect, useState } from 'react';
import moment from 'moment';
import { firebaseService } from '../services/firebase';

const useFirebase = () => {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState({
    message: 'Hooray!!!!\n\n All letters are picked up.',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebaseService
      .getData()
      .then(({ maildata, pending: pd }) => {
        setData(maildata);
        if (pd) {
          setPending({
            message: 'You have letters to pick up.....',
            datemsg: moment(pd.date).fromNow(),
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => {
      firebaseService.unSubscribe();
    };
  }, []);

  return [data, loading, pending];
};

export default useFirebase;
