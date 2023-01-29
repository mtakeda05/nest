import { v4 as uuidv4 } from 'uuid';

export function generateUniqueId() {
  return uuidv4().substring(0, 8);
}

export function isTest() {
  return process.env.NODE_ENV === 'test';
}