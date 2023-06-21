import memoizee from 'memoizee';
import error from './error';
import apiError from './apiError';
import profile from './profile';
import { Time } from '@sapphire/time-utilities';

export default {
	error,
	apiError,
	profile: memoizee(profile, { maxAge: Time.Hour + Time.Minute })
};
