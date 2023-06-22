import memoizee from 'memoizee';
import ranks from './ranks';

export default {
	ranks: memoizee(ranks)
};
