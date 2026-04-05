// lib/db.ts
// Vercel KV-based database utility
// Drop-in replacement — same function names, same signatures
// Only use in API routes (server-side) — NEVER in client components

import { kv } from '@vercel/kv';

/**
 * Read all records from a key
 * Returns empty array if key doesn't exist
 */
export async function readData<T>(filename: string): Promise<T[]> {
  try {
    const data = await kv.get<T[]>(filename);
    return data ?? [];
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
}

/**
 * Write entire array to a key (overwrites)
 */
export async function writeData<T>(filename: string, data: T[]): Promise<void> {
  try {
    await kv.set(filename, data);
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw new Error(`Failed to write to ${filename}`);
  }
}

/**
 * Append a single item to a key
 */
export async function appendData<T>(filename: string, item: T): Promise<void> {
  const data = await readData<T>(filename);
  data.push(item);
  await writeData(filename, data);
}

/**
 * Find a single record by ID
 */
export async function findById<T extends { id: string }>(
  filename: string,
  id: string
): Promise<T | undefined> {
  const data = await readData<T>(filename);
  return data.find((item) => item.id === id);
}

/**
 * Update a record by ID with partial data
 * Returns updated record or null if not found
 */
export async function updateById<T extends { id: string }>(
  filename: string,
  id: string,
  updates: Partial<T>
): Promise<T | null> {
  const data = await readData<T>(filename);
  const index = data.findIndex((item) => item.id === id);

  if (index === -1) return null;

  data[index] = { ...data[index], ...updates };
  await writeData(filename, data);
  return data[index];
}

/**
 * Delete a record by ID
 * Returns true if deleted, false if not found
 */
export async function deleteById<T extends { id: string }>(
  filename: string,
  id: string
): Promise<boolean> {
  const data = await readData<T>(filename);
  const filtered = data.filter((item) => item.id !== id);

  if (filtered.length === data.length) return false;

  await writeData(filename, filtered);
  return true;
}

/**
 * Filter records by a predicate function
 */
export async function filterData<T>(
  filename: string,
  predicate: (item: T) => boolean
): Promise<T[]> {
  const data = await readData<T>(filename);
  return data.filter(predicate);
}

/**
 * Count records, optionally with a filter
 */
export async function countData<T>(
  filename: string,
  predicate?: (item: T) => boolean
): Promise<number> {
  const data = await readData<T>(filename);
  if (!predicate) return data.length;
  return data.filter(predicate).length;
}

/**
 * Check if a record exists by a field value
 */
export async function existsByField<T>(
  filename: string,
  field: keyof T,
  value: unknown
): Promise<boolean> {
  const data = await readData<T>(filename);
  return data.some((item) => item[field] === value);
}